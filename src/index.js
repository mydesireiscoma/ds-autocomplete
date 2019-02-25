/**
 * DeadSimple autocomplete javascript plugin
 * @todo handle arrays what contains non-object values (i.e. string, int, etc)
 * @todo what actually should be selected? look for the item/key values
 *       and check if they are correct and used correctly
 * @todo provide callbacks for each step on the lifecycle
 * @todo allow user to override some critical parts by providing custom
 *       functions (i.e. search results, filter results, select item)
 * @todo allow user to control search results position and mb other behaviour
 * @todo allow user to control what actually should be displayed in input
 * @todo tests
 */
class DSAutocomplete {
  /**
   * Autocomplete constructor
   * @param {Object} options Plugin config
   */
  constructor (options) {
    /**
     * Plugin elements
     * @type {Object}
     */
    this.elements = {
      input: options.element,
      results: this.getSearchResultsContainer()
    }

    /**
     * Plugin state values
     * @todo Refactoring required. Remove a service variables
     * @type {[type]}
     */
    this.state = Object.assign({
      /**
       * Minimal characters required for the results fetching
       * @type {Number}
       */
      minCharactersForSearch: 3,
      highlightedElement: null,
      selectedElement: null,
      itemValue: 'name',
      keyValue: 'name',
      results: [],
      items: [],
      query: null,
      focused: false,
      focusedResult: null,
      debounce: null
    }, options)

    /**
     * Plugin keyboard settings
     * @todo User should be able to override these settings somehow
     * @type {Object}
     */
    this.keyboard = {
      keys: {
        /**
         * Keys for "cancel" (i.e. hide results) event
         * @type {Array}
         */
        cancel: [27],
        /**
         * Keys for "select" event (i.e. select currently highlighted result)
         * @type {Array}
         */
        select: [9, 13],
        /**
         * Ignored keys, what should't cause results refetching
         * @type {Array}
         */
        ignored: [37, 39, 38, 40, 13, 27, 16, 9],
        /**
         * Keys for navigate on the results to the up
         * @todo should be an array
         * @type {Number}
         */
        up: 38,
        /**
         * Keys for navigate on the results to the down
         * @todo should be an array
         * @type {[type]}
         */
        down: 40
      }
    }

    this.init()
  }

  /**
   * Initiate plugin
   * @return {undefined}
   */
  init () {
    if (!this.getSearchResultsContainer()) {
      this.createSearchResultsContainer()
      this.attachSearchResultsContainer()
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
    if (value) {
      this.elements.input.classList.add('autocomplete__input_focused')
    } else {
      this.elements.input.classList.remove('autocomplete__input_focused')
      this.hideResults()
    }

    this.state.focused = value
  }

  /**
   * Attach search results container to the component
   * @return {[type]} [description]
   */
  attachSearchResultsContainer () {
    this.elements.results = this.getSearchResultsContainer()
  }

  /**
   * Create search results container
   * @return {undefined}
   */
  createSearchResultsContainer () {
    const documentFragment = document.createDocumentFragment()
    const searchResultsElement = document.createElement('div')

    searchResultsElement.className = 'autocomplete__results'
    documentFragment.appendChild(searchResultsElement)

    document.body.appendChild(documentFragment)
  }

  /**
   * Returns search results container element
   * @return {HTMLElement} [description]
   */
  getSearchResultsContainer () {
    return document.querySelector('.autocomplete__results')
  }

  /**
   * Attach event listeners
   * @todo Handle middle mouse key
   */
  addEventListeners () {
    this.elements.input.addEventListener('blur', e => this.handleBlur(e))
    this.elements.input.addEventListener('focus', e => this.handleFocus(e))
    this.elements.input.addEventListener('keyup', e => this.handleKeyUpOnInput(e))
    this.elements.input.addEventListener('keydown', e => this.handleKeyDownOnInput(e))

    if (!window.autocompleteEventListenersAdded) {
      window.addEventListener('click', e => this.handleClickOnDocument(e))
      window.autocompleteEventListenersAdded = true
    }

    window.addEventListener('resize', e => this.handleResize)
    window.addEventListener('orientationchange', e => this.handleResize)
  }

  /**
   * Handle screen size changes
   * @return {undefined}
   */
  handleResize() {
    this.updateResultsPosition()
  }

  /**
   * Handle case, when search input lost focus
   * @param  {FocusEvent} e Focus event
   * @return {undefined}
   */
  handleBlur (e) {
    if (!e.relatedTarget || !e.relatedTarget.classList.contains('autocomplete__results')) {
      this.setFocused(false)
    }
  }

  /**
   * Handle case, when the search input got focus
   * @return {undefined}
   */
  handleFocus () {
    if (this.state.results && this.state.results.length) {
      this.showResults(true)
    }
  }

  /**
   * Handle key up on the search input
   * @param  {KeyboardEvent} e Keyboard event
   * @return {undefined}
   */
  handleKeyUpOnInput (e) {
    if (!e.ctrlKey && this.keyboard.keys.ignored.indexOf(e.keyCode) < 0 && !(e.shiftKey && this.keyboard.keys.ignored.indexOf(e.keyCode) > -1)) {
      this.setFocused(true)
      this.updateQuery(this.elements.input.value)
      this.updateResults()
    } else if (this.isNavigationKeyPressed(e)) {
      if (!this.state.results.length) {
        return
      }

      if (this.state.focusedResult === null) {
        this.state.focusedResult = 0
      } else {
        this.state.focusedResult += e.keyCode === 38 ? -1 : 1
        if (this.state.focusedResult >= this.state.results.length) {
          this.state.focusedResult = 0
        } else if (this.state.focusedResult < 0) {
          this.state.focusedResult = this.state.results.length - 1
        }
      }

      this.showResults()
    }
  }

  /**
   * Check, if event is about navigation key pressed.
   * Returns true if so, false otherwise
   * @param  {KeyboardEvent} e Keyboard event
   * @return {Boolean}
   */
  isNavigationKeyPressed (e) {
    return e.keyCode === 38 || e.keyCode === 40
  }

  /**
   * Handle keydown on the search input
   * @param  {KeyboardEvent} e Keyboard event
   * @return {undefined}
   */
  handleKeyDownOnInput (e) {
    if (this.keyboard.keys.select.indexOf(e.keyCode) >= 0 && this.state.selectedElement >= 0) {
      if (!this.elements.results.classList.contains('autocomplete__results_hidden') && this.state.results[this.state.focusedResult]) {
        if (e.keyCode !== 9) {
          e.preventDefault()
        }
        this.elements.input.value = this.state.results[this.state.focusedResult][this.state.itemValue]
      }
    }

    if (e.keyCode === 9) {
      this.hideResults()
    }
  }

  /**
   * Handle click on the document
   * @param  {MouseEvent} e Mouse event
   * @return {undefined}
   */
  handleClickOnDocument (e) {
    if (e.target.className.indexOf('autocomplete') < 0) {
      this.hideResults()
      this.setFocused(false)
    }
  }

  /**
   * Update search results
   * @return {undefined}
   */
  updateResults () {
    if (this.state.query.length >= this.state.minCharactersForSearch) {
      this.searchResults(this.state.query, this.state.items)
    } else {
      this.hideResults()
    }
  }

  /**
   * Hide search results container
   * @return {undefined}
   */
  hideResults () {
    this.elements.results.classList.add('autocomplete__results_hidden')
  }

  /**
   * Show search results container
   * @param  {Boolean} [force=false] Forced value
   * @return {undefined}
   */
  showResults (force = false) {
    if (force) {
      this.elements.input.classList.add('autocomplete__input_focused')
    }

    if (this.elements.input.classList.contains('autocomplete__input_focused')) {
      this.elements.results.innerHTML = ''
      this.elements.results.appendChild(this.getResultsElements())
      this.elements.results.classList.remove('autocomplete__results_hidden')
      this.updateResultsPosition()
    }
  }

  /**
   * Builds and returns a DocumentFragment with search results elements
   * @return {DocumentFragment} Search results document fragment
   */
  getResultsElements () {
    const documentFragment = document.createDocumentFragment()

    this.state.results.forEach((item, index) => {
      const searchResultsElement = document.createElement('div')

      searchResultsElement.className = 'autocomplete__result'
      searchResultsElement.innerHTML = item[this.state.itemValue]

      if (index === this.state.focusedResult) {
        searchResultsElement.className += ' autocomplete__result_focused'
      }

      documentFragment.appendChild(searchResultsElement)

      searchResultsElement.addEventListener('click', () => {
        this.state.focusedResult = index
        this.showResults()
        this.elements.input.value = this.state.results[this.state.focusedResult][this.state.itemValue]
        this.hideResults()
      })
    })

    return documentFragment
  }

  /**
   * Updates search results container position
   * @return {undefined}
   */
  updateResultsPosition () {
    const autocompleteBounds = this.elements.input.getBoundingClientRect()
    this.elements.results.style.top = autocompleteBounds.bottom + 'px'
    this.elements.results.style.left = autocompleteBounds.left + 'px'
    this.elements.results.style.width = autocompleteBounds.width + 'px'
    this.elements.results.setAttribute('tabindex', '-1')
  }

  /**
   * Update search query
   * @param  {String} value Search query
   * @return {undefined}
   */
  updateQuery (value) {
    this.state.query = value
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
        item[this.state.keyValue]
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== 0
      )
    })
  }

  /**
   * Show loading message
   * @return {undefined}
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
    this.elements.results.classList.remove('autocomplete__results_hidden')
  }

  /**
   * Search results for given query
   * Shows loading message while searching results
   * Shows results (or no results message) when done
   * @param  {String} query Search query
   * @param  {Function|Object|Array|Promise} items Search source
   * @return {undefined}
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
   * Get search results from given source
   * @param  {String} query Search query
   * @param  {Function|Object|Array|Promise} src Search source
   * @return {Array} Search results
   */
  getSearchResultsFromSource(query, src) {
    let result = src

    if (typeof src === 'function') {
      result = src(query)
    }

    if (result instanceof Promise) {
      return result
    } else if (items instanceof Object) {
      result = Object.values(src)
    }

    return new Promise((resolve, reject) => {
      if (result instanceof Array) {
        resolve(result)
      } else {
        reject('Search results is not an array')
      }
    })
  }
}

export default DSAutocomplete
