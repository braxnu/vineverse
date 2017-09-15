import * as d3 from 'd3'
import globe from './globe'

const canvas = d3.select('#globe').append('canvas')

globe(canvas, {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  datasetURI: '/world-110m.json'
})
