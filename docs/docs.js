/** @type {Array} */
import items from './items.json'
import DSAutocomplete from '../dist/autocomplete.esm.dist'

/* eslint-env browser */
/* eslint-disable no-new */

function getResultsAsync (query) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', 'https://api.github.com/search/repositories?q=' + query)

    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText).items)
      } else {
        reject(new Error('Request failed'))
      }
    }

    xhr.send()
  })
}

document.querySelectorAll('.autocomplete__input').forEach((el) => {
  if (el.classList.contains('async')) {
    new DSAutocomplete(el, {
      items: (query) => {
        return getResultsAsync(query)
      }
    })
  } else if (el.classList.contains('object')) {
    new DSAutocomplete(el, {
      items: items,
      itemValuePropertyName: 'country'
    })
  } else if (el.classList.contains('plain')) {
    new DSAutocomplete(el, {
      items: items.map((item) => item.country),
      itemValuePropertyName: 'country'
    })
  }
})
