import { select } from 'd3'

const canvas = select('#globe').append('canvas')
const context = canvas.node().getContext('2d')

canvas.attr('height', '100vh')
canvas.attr('width', '100vw')
