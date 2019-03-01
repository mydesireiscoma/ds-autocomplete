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
   */
  var DSAutocomplete =
  /*#__PURE__*/
  function () {
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
    function DSAutocomplete(element, options, keyboardOptions) {
      _classCallCheck(this, DSAutocomplete);

      /**
       * Autocomplete config
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
        /**
         * Actual plugin config
         * @type {DSAConfig}
         */

      };
      this.config = Object.assign(this.defaultConfig, options);
      /**
       * Plugin elements
       * @typedef {Object} DSAElements
       * @property {HTMLInputElement} input - HTML input
       * @property {HTMLElement} results - HTML element for search results
       */

      this.elements = {
        input: element,
        results: this.getSearchResultsContainer()
        /**
         * Plugin state values
         * @typedef {Object} DSAState
         * @property {String} query - Search query
         * @property {Array} results - Search results
         * @property {Boolean} focused - Indicates, if autocomplete input is focused
         * @property {Number} debounce - ID value of the timer that is set
         * @property {Number} focusedResult - Currently focused element index
         * @property {Object|String} selectedElement - Currently selected item
         * @property {Number} highlightedElement - Index of currently highlighted element
         */

      };
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
         * @typedef {Object} DSAKeyboardConfig
         * @property {Number[]} cancel - Keys used for hide search results without selecting currently highlighted item
         * @property {Number[]} select - Keys used for selection currently highlighted item
         * @property {Number[]} ignored - Keys, which are should not fire search results refetching
         * @property {Number[]} up - Keys used to navigate to the up on the search results
         * @property {Number[]} down - Keys used to navigate to the down on the search results
         */

      };
      this.keyboard = {
        cancel: [27],
        select: [9, 13],
        ignored: [37, 39, 38, 40, 13, 27, 16, 9],
        up: [38],
        down: [40]
      };
      this.init();
    }
    /**
     * Initiate plugin
     */


    _createClass(DSAutocomplete, [{
      key: "init",
      value: function init() {
        if (!this.getSearchResultsContainer()) {
          this.attachSearchResultsContainer(this.config.resultsTemplate(this.config));
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
        this.elements.input.classList.toggle(this.config.inputFocusedClass, value);

        if (!value) {
          this.hideResults();
        }

        this.state.focused = value;
      }
      /**
       * Attach search results container to the component
       */

    }, {
      key: "attachSearchResultsContainer",
      value: function attachSearchResultsContainer(el) {
        document.body.append(el);
        this.elements.results = el;
      }
      /**
       * Returns search results container element
       * @return {HTMLElement}
       */

    }, {
      key: "getSearchResultsContainer",
      value: function getSearchResultsContainer() {
        return document.querySelector('.' + this.config.resultsClass);
      }
      /**
       * Attach event listeners
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
        window.addEventListener('scroll', function () {
          return _this.handleResize();
        });
        window.addEventListener('orientationchange', function () {
          return _this.handleResize();
        });
      }
      /**
       * Handle screen size changes
       */

    }, {
      key: "handleResize",
      value: function handleResize() {
        if (this.isInputFocused() && this.isResultsVisible()) {
          this.updateResultsPosition();
        }
      }
      /**
       * Handle case, when search input lost focus
       * @param  {FocusEvent} e - Focus event
       */

    }, {
      key: "handleBlur",
      value: function handleBlur(e) {
        // noinspection JSUnresolvedVariable
        if (!e.relatedTarget || !e.relatedTarget.classList.contains(this.config.resultsClass)) {
          this.setFocused(false);
        }
      }
      /**
       * Handle case, when the search input got focus
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
       * @param  {KeyboardEvent} e - Keyboard event
       */

    }, {
      key: "handleKeyUpOnInput",
      value: function handleKeyUpOnInput(e) {
        var activeKey = this.getKeyCodeFromEvent(e);

        if (!e.ctrlKey && !this.isIgnoredKey(activeKey) && !(e.shiftKey && this.isIgnoredKey(activeKey))) {
          this.setFocused(true);
          this.state.query = this.elements.input.value;
          this.updateResults();
        }
      }
      /**
       * Check if passed keycode should be ignored (key is in the ignored array or reserved by the plugin)
       * @param {Number} keyCode - Key code
       * @return {Boolean} - True if key is ignored, false otehrwise
       */

    }, {
      key: "isIgnoredKey",
      value: function isIgnoredKey(keyCode) {
        return this.keyboard.ignored.indexOf(keyCode) >= 0 || this.keyboard.cancel.indexOf(keyCode) >= 0 || this.keyboard.down.indexOf(keyCode) >= 0 || this.keyboard.up.indexOf(keyCode) >= 0;
      }
      /**
       * Check, if event is about navigation key pressed.
       * @param  {Number} keyCode - Keyboard event
       * @return {Boolean} - True if is navigation key, false otherwise
       */

    }, {
      key: "isNavigationKey",
      value: function isNavigationKey(keyCode) {
        return this.keyboard.up.indexOf(keyCode) >= 0 || this.keyboard.down.indexOf(keyCode) >= 0;
      }
      /**
       * Check, if results container is visible or not
       * @return {boolean} - True if results container is visible, false otherwise
       */

    }, {
      key: "isResultsVisible",
      value: function isResultsVisible() {
        return this.elements.results.classList.contains(this.config.resultsHiddenClass);
      }
      /**
       * Handle keydown on the search input
       * @param  {KeyboardEvent} e - Keyboard event
       */

    }, {
      key: "handleKeyDownOnInput",
      value: function handleKeyDownOnInput(e) {
        var key = this.getKeyCodeFromEvent(e);
        var isTabKey = key === 9;

        if (this.keyboard.select.indexOf(key) >= 0 && this.state.selectedElement >= 0 && !this.isResultsVisible() && this.state.results[this.state.focusedResult]) {
          if (isTabKey) {
            e.preventDefault();
          }

          this.elements.input.value = this.state.results[this.state.focusedResult][this.config.itemValuePropertyName];
        } else if (this.isNavigationKey(key)) {
          e.preventDefault();

          if (!this.state.results.length) {
            return;
          }

          if (this.state.focusedResult === null) {
            this.state.focusedResult = 0;
          } else {
            if (this.keyboard.up.indexOf(key) >= 0) {
              this.state.focusedResult -= 1;
            } else if (this.keyboard.down.indexOf(key) >= 0) {
              this.state.focusedResult += 1;
            }

            if (this.state.focusedResult >= this.state.results.length) {
              this.state.focusedResult = 0;
            } else if (this.state.focusedResult < 0) {
              this.state.focusedResult = this.state.results.length - 1;
            }
          }

          this.showResults();
        }

        if (this.isCancelKey(key)) {
          this.hideResults();
        }

        if (isTabKey) {
          this.hideResults();
        }
      }
      /**
       * Check if is "cancel" action key
       * @param {Number} keyCode - Key code
       * @return {Boolean} - True if is "cancel" key, false otherwise
       */

    }, {
      key: "isCancelKey",
      value: function isCancelKey(keyCode) {
        return this.keyboard.cancel.indexOf(keyCode) >= 0;
      }
      /**
       * Check, if input is focused or not
       * @return {boolean} - True, if input focused, false otherwise
       */

    }, {
      key: "isInputFocused",
      value: function isInputFocused() {
        return this.elements.input.classList.contains(this.config.inputFocusedClass);
      }
      /**
       * Handle click on the document
       * @param {Event} e - Mouse event
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
       * @param {Boolean} [force=false] Forced value
       */

    }, {
      key: "showResults",
      value: function showResults() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (force) {
          this.elements.input.classList.add(this.config.inputFocusedClass);
        }

        if (this.isInputFocused()) {
          this.elements.results.innerHTML = '';
          this.elements.results.appendChild(this.getResultsElements());
          this.elements.results.classList.remove(this.config.resultsHiddenClass);
          this.updateResultsPosition();
        }
      }
      /**
       * Generates search results item html element
       * @param {DSASearchResultsItem} itemData - Search results item data
       * @param {DSAConfig} config - DS Autocomplete config
       * @return {HTMLElement} - Search results item html element
       */

    }, {
      key: "buildSearchItemTemplate",
      value: function buildSearchItemTemplate(itemData, config) {
        var itemElement = document.createElement('div');
        itemElement.className = config.itemClass;
        itemElement.innerText = itemData[config.itemValuePropertyName];
        return itemElement;
      }
      /**
       * Generates search results container element
       * @return {HTMLElement} - Search results container
       */

    }, {
      key: "buildSearchResultsTemplate",
      value: function buildSearchResultsTemplate(config) {
        var searchResultsElement = document.createElement('div');
        searchResultsElement.className = config.resultsClass;
        return searchResultsElement;
      }
      /**
       * Builds and returns a DocumentFragment with search results elements
       * @return {DocumentFragment} - Search results document fragment
       */

    }, {
      key: "getResultsElements",
      value: function getResultsElements() {
        var _this2 = this;

        var documentFragment = document.createDocumentFragment();
        this.state.results.forEach(function (item, index) {
          var searchResultsElement = _this2.config.itemTemplate(item, _this2.config);

          if (index === _this2.state.focusedResult) {
            searchResultsElement.classList.add(_this2.config.itemFocusedClass);
          }

          documentFragment.appendChild(searchResultsElement);
          searchResultsElement.addEventListener('click', function () {
            _this2.state.focusedResult = index;
            _this2.elements.input.value = _this2.state.results[_this2.state.focusedResult][_this2.config.itemValuePropertyName];

            _this2.hideResults();
          });
        });
        return documentFragment;
      }
      /**
       * Updates search results container position
       */

    }, {
      key: "updateResultsPosition",
      value: function updateResultsPosition() {
        var autocompleteBounds = this.elements.input.getBoundingClientRect();
        this.elements.results.style.top = autocompleteBounds.bottom + document.documentElement.scrollTop + 'px';
        this.elements.results.style.left = autocompleteBounds.left + 'px';
        this.elements.results.style.width = autocompleteBounds.width + 'px';
        this.elements.results.setAttribute('tabindex', '-1');
        this.elements.input.style.backgroundColor = 'red';
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
        this.elements.results.classList.remove(this.config.resultsHiddenClass);
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
       * @param  {String} query - Search query
       * @param  {DSASearchResultsSource|DSASearchResultsCallback} src - Search source
       * @return {Promise} - Search results promise
       */

    }, {
      key: "getSearchResultsFromSource",
      value: function getSearchResultsFromSource(query, src) {
        var result;

        if (typeof src === 'function') {
          result = src(query);
        }

        if (src instanceof Promise) {
          return src;
        } else if (src instanceof Object) {
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

        if (typeof e.which !== 'undefined') {
          code = e.which;
        } else {
          // noinspection JSDeprecatedSymbols
          code = e.keyCode;
        }

        return code;
      }
    }]);

    return DSAutocomplete;
  }(); // noinspection JSUnusedGlobalSymbols

  return DSAutocomplete;

}());
