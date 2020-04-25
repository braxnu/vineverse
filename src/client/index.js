import React from 'react';
import ReactDOM from 'react-dom';

console.log(1)
const rootElement = document.getElementById("root");

ReactDOM.render(
  <span id="app" />,
  rootElement
);

export const DemoComponent = props => (
  <div>{props.name}</div>
)
