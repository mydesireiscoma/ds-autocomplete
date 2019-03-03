/** @type {Array} */
import items from './items.json'
import DSAutocomplete from '../dist/autocomplete.esm.dist'

/* eslint-env browser */

/* eslint-disable no-new */

const itemsPA = ['one', 'two', 'three']
const autocompletePAInput = document.querySelector('#autocomplete-plain-array')
new DSAutocomplete(autocompletePAInput, { items: itemsPA })

const autocompleteOAInput = document.querySelector('#autocomplete-objects-array')
new DSAutocomplete(autocompleteOAInput, { items, itemValuePropertyName: 'country' })

const itemsO = {}
items.forEach((item) => {
  itemsO[item.country] = item
})

const autocompleteOInput = document.querySelector('#autocomplete-object')
new DSAutocomplete(autocompleteOInput, { items: itemsO, itemValuePropertyName: 'country' })

const itemsF = () => {
  return ['one', 'two', 'three']
}

const itemsP = (query) => {
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

const autocompleteFInput = document.querySelector('#autocomplete-function')
new DSAutocomplete(autocompleteFInput, { items: itemsF })

const autocompletePInput = document.querySelector('#autocomplete-promise')
new DSAutocomplete(autocompletePInput, { items: itemsP })
