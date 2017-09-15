import * as d3 from 'd3'
import { feature as topojsonFeature } from 'topojson'

const canvas = d3.select('#globe').append('canvas')
const size = 800

canvas.attr('style', 'width: 100vw;')
canvas.attr('width', size)
canvas.attr('height', size)

const context = canvas.node().getContext('2d')

const projection = d3.geoOrthographic()
  .scale(size / 2.1)
  .translate([size / 2, size / 2])
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

    projection.rotate([velocity * dt + origin[0], origin[1]])
    context.clearRect(0, 0, size, size)
    context.beginPath()
    path(land)
    context.lineWidth = 2
    context.strokeStyle = '#000'
    context.stroke()
  })
})
