var DSAutocomplete = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * DeadSimple Autocomplete javascript plugin
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
  var DSAutocomplete =
  /*#__PURE__*/
  function () {
    /**
     * Autocomplete constructor
     * @param {HTMLInputElement} element HTML input element
     * @param {DSAConfig} options Plugin config
     * @param {DSAKeyboardConfig} keyboardOptions
     */
    function DSAutocomplete(element, options, keyboardOptions) {
      _classCallCheck(this, DSAutocomplete);

      /**
       * Plugin elements
       * @type {{input, results: HTMLElement}}
       */
      this.elements = {
        input: element,
        results: this.getSearchResultsContainer()
        /**
         * Default plugin config
         * @typedef {{itemValuePropertyName: string, minCharactersForSearch: number, items: Array}} DSAConfig
         */

      };
      this.defaultConfig = {
        /** Search source */
        items: [],

        /** Name of the property with value should be displayed in list and in input when selected */
        itemValuePropertyName: 'name',

        /** Minimal characters required for the results fetching */
        minCharactersForSearch: 3
        /**
         * Actual plugin config
         * @type {DSAConfig}
         */

      };
      this.config = Object.assign(this.defaultConfig, options);
      /**
       * Plugin state values
       * @type {{debounce: number, highlightedElement: null, selectedElement: null, query: string, focusedResult: null, focused: boolean, results: Array}}
       */

      this.state = {
        query: '',
        results: [],
        focused: false,
        debounce: 0,
        focusedResult: null,
        selectedElement: null,
        highlightedElement: null
        /**
         * Plugin keyboard settings
         * @typedef {{cancel: number[], ignored: number[], select: number[], up: number[], down: number[]}} DSAKeyboardConfig
         */

      };
      this.keyboard = {
        /**
         * Keys for "cancel" (i.e. hide results) event
         * @type number[]
         */
        cancel: [27],

        /**
         * Keys for "select" event (i.e. select currently highlighted result)
         * @type number[]
         */
        select: [9, 13],

        /**
         * Ignored keys, what should't cause results refetching
         * @type {[Number]}
         */
        ignored: [37, 39, 38, 40, 13, 27, 16, 9],

        /**
         * Keys for navigate on the results to the up
         * @type number[]
         */
        up: [38],

        /**
         * Keys for navigate on the results to the down
         * @type number[]
         */
        down: [40]
      };
      this.init();
    }
    /**
     * Initiate plugin
     * @return {undefined}
     */


    _createClass(DSAutocomplete, [{
      key: "init",
      value: function init() {
        if (!this.getSearchResultsContainer()) {
          this.createSearchResultsContainer();
          this.attachSearchResultsContainer();
        }

        this.addEventListeners();
      }
      /**
       * Set search input focused state
       * Attaches classes to the search input and hides results depending on the
       * value passed in
       * @param {Boolean} value True for focused state and false for blur
       */

    }, {
      key: "setFocused",
      value: function setFocused(value) {
        if (value) {
          this.elements.input.classList.add('autocomplete__input_focused');
        } else {
          this.elements.input.classList.remove('autocomplete__input_focused');
          this.hideResults();
        }

        this.state.focused = value;
      }
      /**
       * Attach search results container to the component
       * @return {[type]} [description]
       */

    }, {
      key: "attachSearchResultsContainer",
      value: function attachSearchResultsContainer() {
        this.elements.results = this.getSearchResultsContainer();
      }
      /**
       * Create search results container
       * @return {undefined}
       */

    }, {
      key: "createSearchResultsContainer",
      value: function createSearchResultsContainer() {
        var documentFragment = document.createDocumentFragment();
        var searchResultsElement = document.createElement('div');
        searchResultsElement.className = 'autocomplete__results';
        documentFragment.appendChild(searchResultsElement);
        document.body.appendChild(documentFragment);
      }
      /**
       * Returns search results container element
       * @return {HTMLElement} [description]
       */

    }, {
      key: "getSearchResultsContainer",
      value: function getSearchResultsContainer() {
        return document.querySelector('.autocomplete__results');
      }
      /**
       * Attach event listeners
       * @todo Handle middle mouse key
       */

    }, {
      key: "addEventListeners",
      value: function addEventListeners() {
        var _this = this;

        this.elements.input.addEventListener('blur', function (e) {
          return _this.handleBlur(e);
        });
        this.elements.input.addEventListener('focus', function () {
          return _this.handleFocus();
        });
        this.elements.input.addEventListener('keyup', function (e) {
          return _this.handleKeyUpOnInput(e);
        });
        this.elements.input.addEventListener('keydown', function (e) {
          return _this.handleKeyDownOnInput(e);
        });

        if (!window.autocompleteEventListenersAdded) {
          window.addEventListener('click', function (e) {
            return _this.handleClickOnDocument(e);
          });
          window.autocompleteEventListenersAdded = true;
        }

        window.addEventListener('resize', function () {
          return _this.handleResize();
        });
        window.addEventListener('orientationchange', function () {
          return _this.handleResize();
        });
      }
      /**
       * Handle screen size changes
       * @return {undefined}
       */

    }, {
      key: "handleResize",
      value: function handleResize() {
        this.updateResultsPosition();
      }
      /**
       * Handle case, when search input lost focus
       * @param  {FocusEvent} e Focus event
       * @return {undefined}
       */

    }, {
      key: "handleBlur",
      value: function handleBlur(e) {
        // noinspection JSUnresolvedVariable
        if (!e.relatedTarget || !e.relatedTarget.classList.contains('autocomplete__results')) {
          this.setFocused(false);
        }
      }
      /**
       * Handle case, when the search input got focus
       * @return {undefined}
       */

    }, {
      key: "handleFocus",
      value: function handleFocus() {
        if (this.state.results && this.state.results.length) {
          this.showResults(true);
        }
      }
      /**
       * Handle key up on the search input
       * @param  {KeyboardEvent} e Keyboard event
       */

    }, {
      key: "handleKeyUpOnInput",
      value: function handleKeyUpOnInput(e) {
        var activeKey = this.getKeyCodeFromEvent(e);

        if (!e.ctrlKey && !this.isIgnoredKey(activeKey) && !(e.shiftKey && this.isIgnoredKey(activeKey))) {
          this.setFocused(true);
          this.updateQuery(this.elements.input.value);
          this.updateResults();
        } else if (this.isNavigationKey(activeKey)) {
          if (!this.state.results.length) {
            return;
          }

          if (this.state.focusedResult === null) {
            this.state.focusedResult = 0;
          } else {
            this.state.focusedResult += activeKey === 38 ? -1 : 1;

            if (this.state.focusedResult >= this.state.results.length) {
              this.state.focusedResult = 0;
            } else if (this.state.focusedResult < 0) {
              this.state.focusedResult = this.state.results.length - 1;
            }
          }

          this.showResults();
        }
      }
      /**
       * Check if passed keycode should be ignored
       * @param {Number} keyCode
       * @return {Boolean}
       */

    }, {
      key: "isIgnoredKey",
      value: function isIgnoredKey(keyCode) {
        return this.keyboard.ignored.indexOf(keyCode) >= 0;
      }
      /**
       * Check, if event is about navigation key pressed.
       * Returns true if so, false otherwise
       * @param  {Number} keyCode Keyboard event
       * @return {Boolean}
       */

    }, {
      key: "isNavigationKey",
      value: function isNavigationKey(keyCode) {
        return this.keyboard.up.indexOf(keyCode) >= 0 || this.keyboard.down.indexOf(keyCode) >= 0;
      }
      /**
       * Handle keydown on the search input
       * @param  {KeyboardEvent} e Keyboard event
       */

    }, {
      key: "handleKeyDownOnInput",
      value: function handleKeyDownOnInput(e) {
        var key = this.getKeyCodeFromEvent(e);

        if (this.keyboard.select.indexOf(key) >= 0 && this.state.selectedElement >= 0) {
          if (!this.elements.results.classList.contains('autocomplete__results_hidden') && this.state.results[this.state.focusedResult]) {
            if (key !== 9) {
              e.preventDefault();
            }

            this.elements.input.value = this.state.results[this.state.focusedResult][this.config.itemValuePropertyName];
          }
        }

        if (key === 9) {
          this.hideResults();
        }
      }
      /**
       * Handle click on the document
       * @param {Event} e Mouse event
       */

    }, {
      key: "handleClickOnDocument",
      value: function handleClickOnDocument(e) {
        // noinspection JSUnresolvedVariable
        if (e.target.className.indexOf('autocomplete') < 0) {
          this.hideResults();
          this.setFocused(false);
        }
      }
      /**
       * Update search results
       * @return {undefined}
       */

    }, {
      key: "updateResults",
      value: function updateResults() {
        if (this.state.query.length >= this.config.minCharactersForSearch) {
          this.searchResults(this.state.query, this.config.items);
        } else {
          this.hideResults();
        }
      }
      /**
       * Hide search results container
       */

    }, {
      key: "hideResults",
      value: function hideResults() {
        this.elements.results.classList.add('autocomplete__results_hidden');
      }
      /**
       * Show search results container
       * @param  {Boolean} [force=false] Forced value
       */

    }, {
      key: "showResults",
      value: function showResults() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (force) {
          this.elements.input.classList.add('autocomplete__input_focused');
        }

        if (this.elements.input.classList.contains('autocomplete__input_focused')) {
          this.elements.results.innerHTML = '';
          this.elements.results.appendChild(this.getResultsElements());
          this.elements.results.classList.remove('autocomplete__results_hidden');
          this.updateResultsPosition();
        }
      }
      /**
       * Builds and returns a DocumentFragment with search results elements
       * @return {DocumentFragment} Search results document fragment
       */

    }, {
      key: "getResultsElements",
      value: function getResultsElements() {
        var _this2 = this;

        var documentFragment = document.createDocumentFragment();
        this.state.results.forEach(function (item, index) {
          var searchResultsElement = document.createElement('div');
          searchResultsElement.className = 'autocomplete__result';
          searchResultsElement.innerHTML = item[_this2.config.itemValuePropertyName];

          if (index === _this2.state.focusedResult) {
            searchResultsElement.className += ' autocomplete__result_focused';
          }

          documentFragment.appendChild(searchResultsElement);
          searchResultsElement.addEventListener('click', function () {
            _this2.state.focusedResult = index;

            _this2.showResults();

            _this2.elements.input.value = _this2.state.results[_this2.state.focusedResult][_this2.config.itemValuePropertyName];

            _this2.hideResults();
          });
        });
        return documentFragment;
      }
      /**
       * Updates search results container position
       * @return {undefined}
       */

    }, {
      key: "updateResultsPosition",
      value: function updateResultsPosition() {
        var autocompleteBounds = this.elements.input.getBoundingClientRect();
        this.elements.results.style.top = autocompleteBounds.bottom + 'px';
        this.elements.results.style.left = autocompleteBounds.left + 'px';
        this.elements.results.style.width = autocompleteBounds.width + 'px';
        this.elements.results.setAttribute('tabindex', '-1');
      }
      /**
       * Update search query
       * @param  {String} value Search query
       */

    }, {
      key: "updateQuery",
      value: function updateQuery(value) {
        this.state.query = value;
      }
      /**
       * Builtin search function.
       * May be overrided by custom user function
       * @param  {String} query Search query
       * @param  {Array} items Search source
       * @return {Array} Search results
       */

    }, {
      key: "builtInSearchFunction",
      value: function builtInSearchFunction(query, items) {
        var _this3 = this;

        return items.filter(function (item) {
          return item[_this3.config.itemValuePropertyName].toLowerCase().indexOf(query.toLowerCase()) !== 0;
        });
      }
      /**
       * Show loading message
       */

    }, {
      key: "showLoading",
      value: function showLoading() {
        if (!this.state.focused) {
          return;
        }

        this.elements.results.innerHTML = '';
        var fragment = document.createDocumentFragment();
        var message = document.createElement('div');
        message.className = 'autocomplete__loader';
        message.innerText = 'Loading...';
        fragment.appendChild(message);
        this.updateResultsPosition();
        this.elements.results.appendChild(fragment);
        this.elements.results.classList.remove('autocomplete__results_hidden');
      }
      /**
       * Search results for given query
       * Shows loading message while searching results
       * Shows results (or no results message) when done
       * @param  {String} query Search query
       * @param  {Function|Object|Array|Promise} items Search source
       */

    }, {
      key: "searchResults",
      value: function searchResults(query, items) {
        var _this4 = this;

        this.state.focusedResult = null;
        clearTimeout(this.state.debounce);
        this.state.debounce = setTimeout(function () {
          var jailedDebounceValue = _this4.state.debounce;

          var result = _this4.getSearchResultsFromSource(query, items);

          _this4.showLoading();

          result.then(function (data) {
            _this4.state.results = data;
          }).catch(function () {
            _this4.state.results = [];
          }).finally(function () {
            if (jailedDebounceValue === _this4.state.debounce) {
              _this4.showResults();
            } else {
              _this4.showLoading();
            }
          });
        }, 250);
      }
      /**
       * Get search results from given source.
       * Returns Promise, what should be resolved with array of results on success
       * @param  {String} query Search query
       * @param  {Function|Object|Array|Promise} src Search source
       * @return {Promise} Search results promise
       */

    }, {
      key: "getSearchResultsFromSource",
      value: function getSearchResultsFromSource(query, src) {
        var result = src;

        if (typeof src === 'function') {
          result = src(query);
        }

        if (result instanceof Promise) {
          return result;
        } else if (result instanceof Object) {
          result = Object.values(src);
        }

        return new Promise(function (resolve, reject) {
          if (result instanceof Array) {
            resolve(result);
          } else {
            reject(new TypeError('Search results is not an array'));
          }
        });
      }
      /**
       * Get event key code
       * @param {KeyboardEvent|MouseEvent} e
       * @return {Number}
       */

    }, {
      key: "getKeyCodeFromEvent",
      value: function getKeyCodeFromEvent(e) {
        var code;

        if (e.hasOwnProperty('key')) {
          code = e.key;
        } else {
          if (e.hasOwnProperty('keyIdentifier')) {
            code = e.keyIdentifier;
          } else {
            if (e.hasOwnProperty('keyCode')) {
              // noinspection JSDeprecatedSymbols
              code = e.keyCode;
            }
          }
        }

        return code;
      }
    }]);

    return DSAutocomplete;
  }(); // noinspection JSUnusedGlobalSymbols

  return DSAutocomplete;

}());
