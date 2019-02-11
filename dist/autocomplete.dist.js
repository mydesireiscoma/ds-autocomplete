var Autocomplete = (function () {
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

  var Autocomplete =
  /*#__PURE__*/
  function () {
    function Autocomplete(options) {
      _classCallCheck(this, Autocomplete);

      this.elements = {
        input: options.element,
        results: this.getSearchResultsContainer()
      };
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
      }, options);
      this.keyboard = {
        keys: {
          cancel: [27],
          select: [9, 13],
          ignored: [37, 39, 38, 40, 13, 27, 16, 9],
          up: 38,
          down: 40
        }
      };
      this.init();
    }

    _createClass(Autocomplete, [{
      key: "init",
      value: function init() {
        if (!this.getSearchResultsContainer()) {
          this.createSearchResultsContainer();
          this.attachSearchResultsContainer();
        }

        this.addEventListeners();
      }
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
    }, {
      key: "attachSearchResultsContainer",
      value: function attachSearchResultsContainer() {
        this.elements.results = this.getSearchResultsContainer();
      }
    }, {
      key: "createSearchResultsContainer",
      value: function createSearchResultsContainer() {
        var documentFragment = document.createDocumentFragment();
        var searchResultsElement = document.createElement('div');
        searchResultsElement.className = 'autocomplete__results';
        documentFragment.appendChild(searchResultsElement);
        document.body.appendChild(documentFragment);
      }
    }, {
      key: "getSearchResultsContainer",
      value: function getSearchResultsContainer() {
        return document.querySelector('.autocomplete__results');
      }
    }, {
      key: "addEventListeners",
      value: function addEventListeners() {
        var _this = this;

        // handle middle mouse key
        this.elements.input.addEventListener('blur', function (e) {
          return _this.handleBlur(e);
        });
        this.elements.input.addEventListener('focus', function (e) {
          return _this.handleFocus(e);
        });
        this.elements.input.addEventListener('keyup', function (e) {
          return _this.handleKeyUp(e);
        });
        this.elements.input.addEventListener('keydown', function (e) {
          return _this.handleKeyDown(e);
        });

        if (!window.autocompleteEventListenersAdded) {
          window.addEventListener('click', function (e) {
            return _this.handleClick(e);
          });
          window.autocompleteEventListenersAdded = true;
        }

        window.addEventListener('resize', function (e) {
          return _this.handleResize;
        });
        window.addEventListener('orientationchange', function (e) {
          return _this.handleOrientationChange;
        });
      }
    }, {
      key: "handleResize",
      value: function handleResize() {
        this.updateResultsPosition();
      }
    }, {
      key: "handleOrientationChange",
      value: function handleOrientationChange() {
        this.handleResize();
      }
    }, {
      key: "handleBlur",
      value: function handleBlur(e) {
        if (!e.relatedTarget || !e.relatedTarget.classList.contains('autocomplete__results')) {
          this.setFocused(false);
        }
      }
    }, {
      key: "handleFocus",
      value: function handleFocus() {
        if (this.state.results && this.state.results.length) {
          this.showResults(true);
        }
      }
    }, {
      key: "handleKeyUp",
      value: function handleKeyUp(e) {
        if (!e.ctrlKey && this.keyboard.keys.ignored.indexOf(e.keyCode) < 0 && !(e.shiftKey && this.keyboard.keys.ignored.indexOf(e.keyCode) > -1)) {
          this.setFocused(true);
          this.updateQuery(this.elements.input.value);
          this.updateResults();
        } else if (this.isNavigationKeyPressed(e)) {
          if (!this.state.results.length) {
            return;
          }

          if (this.state.focusedResult === null) {
            this.state.focusedResult = 0;
          } else {
            this.state.focusedResult += e.keyCode === 38 ? -1 : 1;

            if (this.state.focusedResult >= this.state.results.length) {
              this.state.focusedResult = 0;
            } else if (this.state.focusedResult < 0) {
              this.state.focusedResult = this.state.results.length - 1;
            }
          }

          this.highlightFocusedResult();
        }
      }
    }, {
      key: "highlightFocusedResult",
      value: function highlightFocusedResult() {
        this.showResults();
      }
    }, {
      key: "isNavigationKeyPressed",
      value: function isNavigationKeyPressed(e) {
        return e.keyCode === 38 || e.keyCode === 40;
      }
    }, {
      key: "handleKeyDown",
      value: function handleKeyDown(e) {
        if (this.keyboard.keys.select.indexOf(e.keyCode) >= 0 && this.state.selectedElement >= 0) {
          if (!this.elements.results.classList.contains('autocomplete__results_hidden') && this.state.results[this.state.focusedResult]) {
            if (e.keyCode !== 9) {
              e.preventDefault();
            }

            this.elements.input.value = this.state.results[this.state.focusedResult][this.state.itemValue];
          }
        }

        if (e.keyCode === 9) {
          this.hideResults();
        }
      }
    }, {
      key: "handleClick",
      value: function handleClick(e) {
        if (e.target.className.indexOf('autocomplete') < 0) {
          this.hideResults();
          this.setFocused(false);
        }
      }
    }, {
      key: "updateResults",
      value: function updateResults() {
        if (this.state.query.length >= this.state.minCharactersForSearch) {
          this.searchResults(this.state.query, this.state.items);
        } else {
          this.hideResults();
        }
      }
    }, {
      key: "hideResults",
      value: function hideResults() {
        this.elements.results.classList.add('autocomplete__results_hidden');
      }
    }, {
      key: "showResults",
      value: function showResults() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (force) {
          this.elements.input.classList.add('autocomplete__input_focused');
        }

        if (!this.elements.input.classList.contains('autocomplete__input_focused')) {
          return;
        }

        this.elements.results.innerHTML = '';
        this.elements.results.appendChild(this.getResultsElements());
        this.elements.results.classList.remove('autocomplete__results_hidden');
        this.updateResultsPosition();
      }
    }, {
      key: "getResultsElements",
      value: function getResultsElements() {
        var _this2 = this;

        var documentFragment = document.createDocumentFragment();
        this.state.results.forEach(function (item, index) {
          var searchResultsElement = document.createElement('div');
          searchResultsElement.className = 'autocomplete__result';
          searchResultsElement.innerHTML = item[_this2.state.itemValue];

          if (index === _this2.state.focusedResult) {
            searchResultsElement.className += ' autocomplete__result_focused';
          }

          documentFragment.appendChild(searchResultsElement);
          searchResultsElement.addEventListener('click', function () {
            _this2.state.focusedResult = index;

            _this2.highlightFocusedResult();

            _this2.elements.input.value = _this2.state.results[_this2.state.focusedResult][_this2.state.itemValue];

            _this2.hideResults();
          });
        });
        return documentFragment;
      }
    }, {
      key: "updateResultsPosition",
      value: function updateResultsPosition() {
        var autocompleteBounds = this.elements.input.getBoundingClientRect();
        this.elements.results.style.top = autocompleteBounds.bottom + 'px';
        this.elements.results.style.left = autocompleteBounds.left + 'px';
        this.elements.results.style.width = autocompleteBounds.width + 'px';
        this.elements.results.setAttribute('tabindex', '-1');
      }
    }, {
      key: "updateQuery",
      value: function updateQuery(value) {
        this.state.query = value;
      }
    }, {
      key: "builtInSearchFunction",
      value: function builtInSearchFunction(query, items) {
        var _this3 = this;

        return items.filter(function (item) {
          return item[_this3.state.keyValue].toLowerCase().indexOf(query.toLowerCase()) !== 0;
        });
      }
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
    }, {
      key: "searchResults",
      value: function searchResults(query, items) {
        var _this4 = this;

        this.state.focusedResult = null;
        clearTimeout(this.state.debounce);
        this.state.debounce = setTimeout(function () {
          var jailedDebounceValue = _this4.state.debounce;

          if (typeof items === 'function') {
            var result = items(query);

            if (result instanceof Promise) {
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
            } else {
              _this4.state.results = result;

              _this4.showResults();
            }
          } else if (items instanceof Array) {
            _this4.state.results = _this4.builtInSearchFunction(query, items);

            _this4.showResults();
          } else if (items instanceof Object) {
            console.warn('[autocomplete] objects are not supported yet');
          } else {
            console.error('[autocomplete] items property is should be: object, array, function or promise, got ', items);
          }
        }, 250);
      }
    }]);

    return Autocomplete;
  }();

  return Autocomplete;

}());
