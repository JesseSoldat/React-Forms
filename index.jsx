import React from 'react';
import { render } from 'react-dom';

import One from './01-basic-button.jsx';

console.log(One.displayName);

const routes = [
  One
];

const location = window.location;
console.log('location ', location);

window.addEventListener('hashchange', location.reload.bind(location));

const loc = location.hash.replace('#/', '');
console.log('loc ', loc);

const element = createTOC();

const container = document.createElement('div');
document.body.appendChild(container);

render(element, container);

function createTOC() {
  return (
  <div>
    {routes.map((route, i) => (
    <li key={i}><a href={`#`}>{route.displayName}</a></li>
    ))}
  </div>
  )
}

