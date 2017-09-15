import * as d3 from 'd3'
import { feature as topojsonFeature } from 'topojson'
import * as geoMath from './math'

export default (canvas, options = {}) => {
  const {
    width,
    height,
    datasetURI
  } = options

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

  let gpos0
  let o0

  canvas.call(
    d3.drag()
      .on('start', function () {
        gpos0 = projection.invert(d3.mouse(this))
        o0 = projection.rotate()
      })
      .on('drag', function () {
        const gpos1 = projection.invert(d3.mouse(this))

        o0 = projection.rotate()

        const o1 = geoMath.eulerAngles(gpos0, gpos1, o0)

        if (o1) projection.rotate(o1)
      })
  )

  d3.json(datasetURI, (err, data) => {
    if (err) {
      console.error(err)
      return
    }

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
}
