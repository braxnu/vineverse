import React from 'react'
import ReactDOM from 'react-dom'
import { LineChart } from 'react-d3-basic'
import Plantation from '../shared/plantation'
import {
  gameDaysToRealSeconds
} from '../shared/gametime'

/*
  function harvest ({
    day,
    rate = 2, // ile zbioru z 1 ha
    farmSize = 5, // wielkość uprawy
    maxAge = 20 * 365, // max czas zycia uprawy w dniach
    firstHarvest = 365 * 5, // pierwszy zbiór (po ilu dniach od zalozenia uprawy)
    harvestEvery = 365 / 5, // częstość zbiorów (co ile dni)
    harvestFor = 15 // długość okresu zbiorów w dniach
  }) {
    return day % harvestEvery < harvestFor ? (day > firstHarvest ? 1 : 0) : 0
  }

  function size ({
    day,
    rate = 2, // ile zbioru z 1 ha
    farmSize = 5, // wielkość uprawy
    maxAge = 20 * 365, // max czas zycia uprawy w dniach
    firstHarvest = 365 * 5, // pierwszy zbiór (po ilu dniach od zalozenia uprawy)
    harvestEvery = 365 / 5, // częstość zbiorów (co ile dni)
    harvestFor = 15 // długość okresu zbiorów w dniach
  }) {
    return (
      (day < maxAge)
      ? (
          farmSize *
          // Math.sin(day / Math.PI / maxAge * 10) *
          Math.sin(day / Math.PI / maxAge * 8)
        )
      : 0
    )
  }
*/

const Chart = props => {
  const margin = 30

  const chartSeries = [
    {
      field: 'value',
      name: props.title,
      color: 'red'
    }
  ]

  return (
    <LineChart
      title={props.title}
      width={document.documentElement.clientWidth}
      height={350}
      margins={{
        top: margin,
        right: margin,
        bottom: margin,
        left: margin + 10}}
      data={props.data}
      chartSeries={chartSeries}
      x={i => i.day}
      />
  )
}

const resolution = 20

const dayList = new Array(100 * resolution)
  .fill(null)
  .map((o, i) => i / resolution)

const plantation = new Plantation({
  date: 0,
  maxAge: 90,
  firstCropAfter: 40,
  harvestTime: 5,
  harvestEvery: 10
})

ReactDOM.render(
  <div>
    <Chart
      title='Harvest time'
      data={dayList.map(day => ({
        day,
        value: plantation.getAvailableCrop(gameDaysToRealSeconds(day))
      }))}
      />
    <Chart
      title='Life length'
      data={dayList.map(day => ({
        day,
        value: plantation.isAlive(gameDaysToRealSeconds(day))
      }))}
      />
  </div>,
  document.querySelector('#app')
)
