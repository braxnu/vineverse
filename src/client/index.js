import { select } from 'd3'
import { geoOrthographic, geoPath } from 'd3-geo'
import { json as geoJson } from 'd3-request'
import { feature as topojsonFeature } from 'topojson'
import { timer } from 'd3'

const canvas = select('#globe').append('canvas')
const size = 800

canvas.attr('style', 'width: 100vw;')
canvas.attr('width', size)
canvas.attr('height', size)

const context = canvas.node().getContext('2d')

const projection = geoOrthographic()
  .scale(size / 2.1)
  .translate([size / 2, size / 2])
  .clipAngle(90)

const path = geoPath()
  .projection(projection)
  .context(context)

geoJson('/world-110m.json', (err, data) => {
  const land = topojsonFeature(data, data.objects.land)
  const t0 = Date.now()
  const origin = [71, -22]
  const velocity = 0.005

  timer(() => {
    const dt = Date.now() - t0

    projection.rotate([velocity * dt + origin[0], origin[1]]);
    context.clearRect(0, 0, size, size)
    context.beginPath()
    path(land)
    context.lineWidth = 2
    context.strokeStyle = '#000'
    context.stroke()
  })
})
