'use strict'

const BlobWriter = require('rawdevjs-filter-blob-writer')
const DemosaicFilter = require('rawdevjs-filter-demosaic')
const DngColorProcessing = require('rawdevjs-filter-dng-decoder/color-processing')
const DngDecoder = require('rawdevjs-filter-dng-decoder')
const FetchSource = require('rawdevjs-filter-fetch-source')
const FilterChain = require('rawdevjs-filter-chain')
const PngEncoder = require('rawdevjs-filter-png-encoder')
const ReduceBy2 = require('rawdevjs-filter-reduce-by-2')
const ReduceBitDepth = require('rawdevjs-filter-reduce-bit-depth')
const RgbLookupTable = require('rawdevjs-filter-rgb-lookup-table')

function run (source) {
  let dngColorProcessingFilter = new DngColorProcessing()

  let filterChain = new FilterChain([
    new FetchSource(),
    new DngDecoder(),
    dngColorProcessingFilter,
    new DemosaicFilter(),
    new ReduceBy2(),
    new ReduceBy2(),
    new RgbLookupTable({lutSize: 17, valuesCallback: dngColorProcessingFilter.processColor}),
    new ReduceBitDepth(),
    new PngEncoder(),
    new BlobWriter({mediaType: 'image/png'})
  ])

  return filterChain.process(source)
}

let elements = document.getElementsByClassName('rawdevjs')

for (let i = 0; i < elements.length; i++) {
  let element = elements[i]
  let source = element.getAttribute('data-src')

  run(source).then((blobUrl) => {
    let imageElement = document.createElement('img')
    imageElement.setAttribute('src', blobUrl)
    element.appendChild(imageElement)
  }).catch((err) => {
    console.error(err.stack || err.message)
  })
}
