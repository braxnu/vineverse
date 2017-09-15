import * as d3 from 'd3'
import { feature as topojsonFeature } from 'topojson'

const canvas = d3.select('#globe').append('canvas')
const width = document.documentElement.clientWidth
const height = document.documentElement.clientHeight

canvas.attr('width', width)
canvas.attr('height', height)

const context = canvas.node().getContext('2d')

const projection = d3.geoOrthographic()
  .scale(Math.min(width, height) / 2.1)
  .translate([width / 2, height / 2])
  .clipAngle(90)

const path = d3.geoPath()
  .projection(projection)
  .context(context)

d3.json('/world-110m.json', (err, data) => {
  const land = topojsonFeature(data, data.objects.land)
  const t0 = Date.now()
  const origin = [71, -22]
  const velocity = 0.005

  d3.timer(() => {
    const dt = Date.now() - t0

    // projection.rotate([velocity * dt + origin[0], origin[1]])
    context.clearRect(0, 0, width, height)
    context.beginPath()
    path(land)
    context.lineWidth = 2
    context.strokeStyle = '#000'
    context.stroke()
  })
})
