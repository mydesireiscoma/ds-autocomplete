class Autocomplete {
  constructor (options) {
    this.elements = {
      input: options.element,
      results: this.getSearchResultsContainer()
    }

    this.state = Object.assign({
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

    this.keyboard = {
      keys: {
        cancel: [27],
        select: [9, 13],
        ignored: [37, 39, 38, 40, 13, 27, 16, 9],
        up: 38,
        down: 40
      }
    }

    this.init()
  }

  init () {
    if (!this.getSearchResultsContainer()) {
      this.createSearchResultsContainer()
      this.attachSearchResultsContainer()
    }

    this.addEventListeners()
  }

  setFocused (value) {
    if (value) {
      this.elements.input.classList.add('autocomplete__input_focused')
    } else {
      this.elements.input.classList.remove('autocomplete__input_focused')
      this.hideResults()
    }

    this.state.focused = value
  }

  attachSearchResultsContainer () {
    this.elements.results = this.getSearchResultsContainer()
  }

  createSearchResultsContainer () {
    const documentFragment = document.createDocumentFragment()
    const searchResultsElement = document.createElement('div')

    searchResultsElement.className = 'autocomplete__results'
    documentFragment.appendChild(searchResultsElement)

    document.body.appendChild(documentFragment)
  }

  getSearchResultsContainer () {
    return document.querySelector('.autocomplete__results')
  }

  addEventListeners () {
    // handle middle mouse key

    this.elements.input.addEventListener('blur', e => this.handleBlur(e))
    this.elements.input.addEventListener('focus', e => this.handleFocus(e))
    this.elements.input.addEventListener('keyup', e => this.handleKeyUp(e))
    this.elements.input.addEventListener('keydown', e => this.handleKeyDown(e))

    if (!window.autocompleteEventListenersAdded) {
      window.addEventListener('click', e => this.handleClick(e))
      window.autocompleteEventListenersAdded = true
    }

    window.addEventListener('resize', e => this.handleResize)
    window.addEventListener('orientationchange', e => this.handleOrientationChange)
  }

  handleResize() {
    this.updateResultsPosition()
  }

  handleOrientationChange() {
    this.handleResize()
  }

  handleBlur (e) {
    if (!e.relatedTarget || !e.relatedTarget.classList.contains('autocomplete__results')) {
      this.setFocused(false)
    }
  }

  handleFocus () {
    if (this.state.results && this.state.results.length) {
      this.showResults(true)
    }
  }

  handleKeyUp (e) {
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

      this.highlightFocusedResult()
    }
  }

  highlightFocusedResult () {
    this.showResults()
  }

  isNavigationKeyPressed (e) {
    return e.keyCode === 38 || e.keyCode === 40
  }

  handleKeyDown (e) {
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

  handleClick (e) {
    if (e.target.className.indexOf('autocomplete') < 0) {
      this.hideResults()
      this.setFocused(false)
    }
  }

  updateResults () {
    if (this.state.query.length >= this.state.minCharactersForSearch) {
      this.searchResults(this.state.query, this.state.items)
    } else {
      this.hideResults()
    }
  }

  hideResults () {
    this.elements.results.classList.add('autocomplete__results_hidden')
  }

  showResults (force = false) {
    if (force) {
      this.elements.input.classList.add('autocomplete__input_focused')
    }

    if (!this.elements.input.classList.contains('autocomplete__input_focused')) {
      return
    }

    this.elements.results.innerHTML = ''
    this.elements.results.appendChild(this.getResultsElements())
    this.elements.results.classList.remove('autocomplete__results_hidden')
    this.updateResultsPosition()
  }

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
        this.highlightFocusedResult()
        this.elements.input.value = this.state.results[this.state.focusedResult][this.state.itemValue]
        this.hideResults()
      })
    })

    return documentFragment
  }

  updateResultsPosition () {
    const autocompleteBounds = this.elements.input.getBoundingClientRect()
    this.elements.results.style.top = autocompleteBounds.bottom + 'px'
    this.elements.results.style.left = autocompleteBounds.left + 'px'
    this.elements.results.style.width = autocompleteBounds.width + 'px'
    this.elements.results.setAttribute('tabindex', '-1')
  }

  updateQuery (value) {
    this.state.query = value
  }

  builtInSearchFunction (query, items) {
    return items.filter(item => {
      return (
        item[this.state.keyValue]
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== 0
      )
    })
  }

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

  searchResults (query, items) {
    this.state.focusedResult = null

    clearTimeout(this.state.debounce)

    this.state.debounce = setTimeout(() => {
      const jailedDebounceValue = this.state.debounce

      if (typeof items === 'function') {
        const result = items(query)

        if (result instanceof Promise) {
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
        } else {
          this.state.results = result
          this.showResults()
        }
      } else if (items instanceof Array) {
        this.state.results = this.builtInSearchFunction(query, items)
        this.showResults()
      } else if (items instanceof Object) {
        console.warn('[autocomplete] objects are not supported yet')
      } else {
        console.error('[autocomplete] items property is should be: object, array, function or promise, got ', items)
      }
    }, 250)
  }
}

export default Autocomplete
