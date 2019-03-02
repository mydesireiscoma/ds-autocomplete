class DSAutocomplete {
  /**
   * Search result item
   * @typedef {(Object|String)} DSASearchResultsItem
   */
  /**
   * Generate search results item template
   * @callback DSASearchResultsItemTemplateGenerator
   * @param {DSASearchResultsItem} item - Item data
   * @param {DSAConfig} config - Plugin config
   * @return {HTMLElement} Search result item template
   */
  /**
   * Generate search results template
   * @callback DSASearchResultsTemplateGenerator
   * @param {DSAConfig} config - Plugin config
   * @return {HTMLElement} Search results template
   */
  /**
   * Search results callback
   * @callback DSASearchResultsCallback
   * @param {String} query - Search query
   * @return {DSASearchResultsSource}
   */
  /**
   * Search results
   * @typedef {(Array<DSASearchResultsItem>|Object|Promise|DSASearchResultsCallback)} DSASearchResultsSource
   */
  /**
   * Autocomplete config
   * @typedef {Object} DSAConfig
   * @property {String} itemValuePropertyName - The name of the property, the value of which will be used as label
   * @property {Number} minCharactersForSearch - Minimal required amount of characters in input, required for search
   * @peropty {(DSASearchResultsSource)} items - Search source or search results itself
   */
  /**
   * Autocomplete constructor
   * @param {HTMLInputElement} element HTML input element
   * @param {DSAConfig} options Plugin config
   * @param {DSAKeyboardConfig} keyboardOptions Plugin keyboard options
   */
  constructor (element, options, keyboardOptions) {
    /**
     * Autocomplete config
     * @public
     * @typedef {Object} DSAConfig
     * @property {(DSASearchResultsSource)} items - Search source or search results itself
     * @property {Boolean} showResultsOnFocus - If true, search results (if exists) will be shown on focus
     * @property {String} itemValuePropertyName - The name of the property, the value of which will be used as label
     * @property {Number} minCharactersForSearch - Minimal required amount of characters in input, required for search
     * @property {DSASearchResultsItemTemplateGenerator} itemTemplate - Item custom template generator
     * @property {DSASearchResultsTemplateGenerator} resultsTemplate - Custom search results template generator
     * @property {String} itemClass - Class to be added for each search result item
     * @property {String} resultsClass - Class to be added to the search results container
     * @property {String} itemFocusedClass - Class to be added to the search result item when focused
     * @property {String} inputFocusedClass - Class to be added to the search input when focused
     * @property {String} resultsHiddenClass - Class to be added to the search results container when hidden
     */
    this.defaultConfig = {
      items: [],
      showResultsOnFocus: false,
      itemValuePropertyName: 'name',
      minCharactersForSearch: 3,
      itemTemplate: this.buildSearchItemTemplate,
      resultsTemplate: this.buildSearchResultsTemplate,
      itemClass: 'autocomplete__result',
      resultsClass: 'autocomplete__results',
      itemFocusedClass: 'autocomplete__result_focused',
      inputFocusedClass: 'autocomplete__input_focused',
      resultsHiddenClass: 'autocomplete__results_hidden'
    }

    /**
     * Actual plugin config
     * @public
     * @type {DSAConfig}
     */
    this.config = Object.assign(this.defaultConfig, options)

    /**
     * Plugin elements
     * @private
     * @typedef {Object} DSAElements
     * @property {HTMLInputElement} input - HTML input
     * @property {HTMLElement} results - HTML element for search results
     */
    this.elements = {
      input: element,
      results: this.getSearchResultsContainer()
    }

    /**
     * Plugin state values
     * @private
     * @typedef {Object} DSAState
     * @property {String} query - Search query
     * @property {Array} results - Search results
     * @property {Boolean} focused - Indicates, if autocomplete input is focused
     * @property {Number} debounce - ID value of the timer that is set
     * @property {Number} focusedResult - Currently focused element index
     * @property {(Object|String)} selectedElement - Currently selected item
     * @property {Number} highlightedElement - Index of currently highlighted element
     */
    this.state = {
      query: '',
      results: [],
      focused: false,
      debounce: 0,
      focusedResult: null,
      selectedElement: null,
      highlightedElement: null
    }

    /**
     * Plugin keyboard settings
     * @public
     * @typedef {Object} DSAKeyboardConfig
     * @property {Number[]} cancel - Keys used for hide search results without selecting currently highlighted item
     * @property {Number[]} select - Keys used for selection currently highlighted item
     * @property {Number[]} ignored - Keys, which are should not fire search results refetching
     * @property {Number[]} up - Keys used to navigate to the up on the search results
     * @property {Number[]} down - Keys used to navigate to the down on the search results
     * @property {Number[]} prevent - Keys should be prevented on search results selection
     */
    this.keyboard = {
      cancel: [27],
      select: [9, 13],
      ignored: [37, 39, 38, 40, 13, 27, 16, 9],
      up: [38],
      down: [40],
      prevent: [9, 13]
    }

    this.init()
  }

  /**
   * Initiate plugin
   * @public
   */
  init () {
    if (!this.getSearchResultsContainer()) {
      this.attachSearchResultsContainer(this.config.resultsTemplate(this.config))
    }

    this.addEventListeners()
  }

  /**
   * Set search input focused state
   * Attaches classes to the search input and hides results depending on the
   * value passed in
   * @param {Boolean} value True for focused state and false for blur
   */
  setFocused (value) {
    this.elements.input.classList.toggle(this.config.inputFocusedClass, value)

    if (!value) {
      this.hideResults()
    }

    this.state.focused = value
  }

  /**
   * Attach search results container to the component
   */
  attachSearchResultsContainer (el) {
    document.body.append(el)
    this.elements.results = el
    this.elements.results.style.position = 'absolute'
  }

  /**
   * Returns search results container element
   * @return {HTMLElement}
   */
  getSearchResultsContainer () {
    return document.querySelector('.' + this.config.resultsClass)
  }

  /**
   * Attach event listeners
   */
  addEventListeners () {
    this.elements.input.addEventListener('blur', (e) => this.handleBlur(e))
    this.elements.input.addEventListener('focus', () => this.handleFocus())
    this.elements.input.addEventListener('keyup', (e) => this.handleKeyUpOnInput(e))
    this.elements.input.addEventListener('keydown', (e) => this.handleKeyDownOnInput(e))

    if (!window.autocompleteEventListenersAdded) {
      window.addEventListener('click', (e) => this.handleClickOnDocument(e))
      window.autocompleteEventListenersAdded = true
    }

    window.addEventListener('resize', () => this.handleResize())
    window.addEventListener('scroll', () => this.handleResize())
    window.addEventListener('orientationchange', () => this.handleResize())
  }

  /**
   * Handle screen size changes
   */
  handleResize () {
    if (this.isInputFocused() && this.isResultsVisible()) {
      this.updateResultsPosition()
    }
  }

  /**
   * Handle case, when search input lost focus
   * @param  {FocusEvent} e - Focus event
   */
  handleBlur (e) {
    // noinspection JSUnresolvedVariable
    if (!e.relatedTarget || !e.relatedTarget.classList.contains(this.config.resultsClass)) {
      this.setFocused(false)
    }
  }

  /**
   * Handle case, when the search input got focus
   */
  handleFocus () {
    if (this.state.results && this.state.results.length && this.config.showResultsOnFocus) {
      this.showResults(true)
    }
  }

  /**
   * Handle key up on the search input
   * @param  {KeyboardEvent} e - Keyboard event
   */
  handleKeyUpOnInput (e) {
    const activeKey = this.getKeyCodeFromEvent(e)

    if (!e.ctrlKey && !this.isIgnoredKey(activeKey) && !(e.shiftKey && this.isIgnoredKey(activeKey))) {
      this.setFocused(true)

      this.state.query = this.elements.input.value

      this.updateResults()
    }
  }

  /**
   * Check if passed keycode should be ignored (key is in the ignored array or reserved by the plugin)
   * @param {Number} keyCode - Key code
   * @return {Boolean} - True if key is ignored, false otehrwise
   */
  isIgnoredKey (keyCode) {
    return this.keyboard.ignored.indexOf(keyCode) >= 0 ||
      this.keyboard.cancel.indexOf(keyCode) >= 0 ||
      this.keyboard.down.indexOf(keyCode) >= 0 ||
      this.keyboard.up.indexOf(keyCode) >= 0
  }

  /**
   * Check, if event is about navigation key pressed.
   * @param  {Number} keyCode - Keyboard event
   * @return {Boolean} - True if is navigation key, false otherwise
   */
  isNavigationKey (keyCode) {
    return this.keyboard.up.indexOf(keyCode) >= 0 || this.keyboard.down.indexOf(keyCode) >= 0
  }

  /**
   * Check, if results container is visible or not
   * @return {boolean} - True if results container is visible, false otherwise
   */
  isResultsVisible () {
    return this.elements.results.classList.contains(this.config.resultsHiddenClass)
  }

  /**
   * Handle keydown on the search input
   * @param  {KeyboardEvent} e - Keyboard event
   */
  handleKeyDownOnInput (e) {
    const key = this.getKeyCodeFromEvent(e)

    if (
      this.keyboard.select.indexOf(key) >= 0 &&
      this.state.selectedElement >= 0 &&
      !this.isResultsVisible() &&
      this.state.results[this.state.focusedResult]
    ) {
      if (this.keyboard.prevent.indexOf(key) >= 0) {
        e.preventDefault()
      }

      this.elements.input.value = this.state.results[this.state.focusedResult][this.config.itemValuePropertyName]
    } else if (this.isNavigationKey(key)) {
      e.preventDefault()

      if (!this.state.results.length) {
        return
      }

      if (this.state.focusedResult === null) {
        this.state.focusedResult = 0
      } else {
        if (this.keyboard.up.indexOf(key) >= 0) {
          this.state.focusedResult -= 1
        } else if (this.keyboard.down.indexOf(key) >= 0) {
          this.state.focusedResult += 1
        }

        if (this.state.focusedResult >= this.state.results.length) {
          this.state.focusedResult = 0
        } else if (this.state.focusedResult < 0) {
          this.state.focusedResult = this.state.results.length - 1
        }
      }

      this.showResults()
    }

    if (this.isCancelKey(key) || this.keyboard.select.indexOf(key) >= 0) {
      this.hideResults()
    }
  }

  /**
   * Check if is "cancel" action key
   * @param {Number} keyCode - Key code
   * @return {Boolean} - True if is "cancel" key, false otherwise
   */
  isCancelKey (keyCode) {
    return this.keyboard.cancel.indexOf(keyCode) >= 0
  }

  /**
   * Check, if input is focused or not
   * @return {boolean} - True, if input focused, false otherwise
   */
  isInputFocused () {
    return this.elements.input.classList.contains(this.config.inputFocusedClass)
  }

  /**
   * Handle click on the document
   * @param {Event} e - Mouse event
   */
  handleClickOnDocument (e) {
    // noinspection JSUnresolvedVariable
    if (e.target.className.indexOf('autocomplete') < 0) {
      this.hideResults()
      this.setFocused(false)
    }
  }

  /**
   * Update search results
   */
  updateResults () {
    if (this.state.query.length >= this.config.minCharactersForSearch) {
      this.searchResults(this.state.query, this.config.items)
    } else {
      this.hideResults()
    }
  }

  /**
   * Hide search results container
   */
  hideResults () {
    this.elements.results.classList.add('autocomplete__results_hidden')
  }

  /**
   * Show search results container
   * @param {Boolean} [force=false] Forced value
   */
  showResults (force = false) {
    if (force) {
      this.elements.input.classList.add(this.config.inputFocusedClass)
    }

    if (this.isInputFocused()) {
      this.elements.results.innerHTML = ''
      this.elements.results.appendChild(this.getResultsElements())
      this.elements.results.classList.remove(this.config.resultsHiddenClass)
      this.updateResultsPosition()
    }
  }

  /**
   * Generates search results item html element
   * @param {DSASearchResultsItem} itemData - Search results item data
   * @param {DSAConfig} config - DS Autocomplete config
   * @return {HTMLElement} - Search results item html element
   */
  buildSearchItemTemplate (itemData, config) {
    const itemElement = document.createElement('div')

    itemElement.className = config.itemClass
    itemElement.innerText = itemData[config.itemValuePropertyName]

    return itemElement
  }

  /**
   * Generates search results container element
   * @return {HTMLElement} - Search results container
   */
  buildSearchResultsTemplate (config) {
    const searchResultsElement = document.createElement('div')

    searchResultsElement.className = config.resultsClass

    return searchResultsElement
  }

  /**
   * Builds and returns a DocumentFragment with search results elements
   * @return {DocumentFragment} - Search results document fragment
   */
  getResultsElements () {
    const documentFragment = document.createDocumentFragment()

    this.state.results.forEach((item, index) => {
      const searchResultsElement = this.config.itemTemplate(item, this.config)

      if (index === this.state.focusedResult) {
        searchResultsElement.classList.add(this.config.itemFocusedClass)
      }

      documentFragment.appendChild(searchResultsElement)

      searchResultsElement.addEventListener('click', () => {
        this.state.focusedResult = index
        this.elements.input.value = this.state.results[this.state.focusedResult][this.config.itemValuePropertyName]
        this.hideResults()
      })
    })

    return documentFragment
  }

  /**
   * Updates search results container position
   */
  updateResultsPosition () {
    const autocompleteBounds = this.elements.input.getBoundingClientRect()

    this.elements.results.style.top = autocompleteBounds.bottom + document.documentElement.scrollTop + 'px'
    this.elements.results.style.left = autocompleteBounds.left + 'px'
    this.elements.results.style.width = autocompleteBounds.width + 'px'
    this.elements.results.setAttribute('tabindex', '-1')
    this.elements.input.style.backgroundColor = 'red'
  }

  /**
   * Builtin search function.
   * May be overrided by custom user function
   * @param  {String} query Search query
   * @param  {Array} items Search source
   * @return {Array} Search results
   */
  builtInSearchFunction (query, items) {
    return items.filter(item => {
      return (
        item[this.config.itemValuePropertyName]
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== 0
      )
    })
  }

  /**
   * Show loading message
   */
  showLoading () {
    if (!this.state.focused) {
      return
    }

    this.elements.results.innerHTML = ''

    const fragment = document.createDocumentFragment()
    const message = document.createElement('div')
    message.className = 'autocomplete__loader'
    message.innerText = 'Loading...'
    fragment.appendChild(message)

    this.updateResultsPosition()
    this.elements.results.appendChild(fragment)
    this.elements.results.classList.remove(this.config.resultsHiddenClass)
  }

  /**
   * Search results for given query
   * Shows loading message while searching results
   * Shows results (or no results message) when done
   * @param  {String} query Search query
   * @param  {(Function|Object|Array|Promise)} items Search source
   */
  searchResults (query, items) {
    this.state.focusedResult = null

    clearTimeout(this.state.debounce)

    this.state.debounce = setTimeout(() => {
      const jailedDebounceValue = this.state.debounce
      const result = this.getSearchResultsFromSource(query, items)

      this.showLoading()

      result.then((data) => {
        this.state.results = data
      }).catch(() => {
        this.state.results = []
      }).finally(() => {
        if (jailedDebounceValue === this.state.debounce) {
          this.showResults()
        } else {
          this.showLoading()
        }
      })
    }, 250)
  }

  /**
   * Get search results from given source.
   * Returns Promise, what should be resolved with array of results on success
   * @param  {String} query - Search query
   * @param  {(DSASearchResultsSource|DSASearchResultsCallback)} src - Search source
   * @return {Promise} - Search results promise
   */
  getSearchResultsFromSource (query, src) {
    let result = src

    if (typeof result === 'function') {
      result = result(query)
    }

    if (result instanceof Promise) {
      return result
    } else if (result instanceof Object) {
      result = Object.values(result)
    }

    return new Promise((resolve, reject) => {
      if (result instanceof Array) {
        resolve(result)
      } else {
        reject(new TypeError('Search results is not an array'))
      }
    })
  }

  /**
   * Get event key code
   * @param {(KeyboardEvent|MouseEvent)} e
   * @return {Number}
   */
  getKeyCodeFromEvent (e) {
    let code

    if (typeof e.which !== 'undefined') {
      code = e.which
    } else {
      // noinspection JSDeprecatedSymbols
      code = e.keyCode
    }

    return code
  }
}

// noinspection JSUnusedGlobalSymbols
export default DSAutocomplete
