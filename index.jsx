import React from 'react';
import { render } from 'react-dom';

import One from './01-basic-button.jsx';
import Two from './02-basic-button.jsx';
import Three from './03-basic-input.jsx';
import Four from './04-basic-input.jsx';
import Five from './05-state-input.jsx';
import Six from './06-state-input-multi.jsx';
import Seven from './07-basic-validation.jsx';
import Eight from './08-field-component-form.jsx';
import Nine from './09-async-fetch.jsx';
import Ten from './10-remote-persist.jsx';
import Eleven from './11-redux-app.jsx';

import Zero from './00-btn-counter.jsx';
import test from './test.jsx';



const routes = [
 One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven, Zero, test
];

const location = window.location;
// console.log(location);
// console.log('location.href ', location.href);
// console.log('location.hash ', location.hash);


window.addEventListener('hashchange', location.reload.bind(location));

const loc = location.hash.replace('#/', '');
// console.log('loc ', loc);
//remove the #

const element = loc ? createRoute(loc) : createTOC();

const container = document.createElement('div');
document.body.appendChild(container);

render(element, container);

function createTOC() {
  return (
  <div>
    {routes.map((route, i) => (
    <li key={i}><a href={`#/${(i+1)}`}>{route.displayName}</a></li>
    ))}
  </div>
  )
}

function createRoute(nStr) {
  let i = nStr -1;
  if (i < 0) i = 0;
  if (i > routes.length -1) i = routes.length -1 ;

  const naveStyle = {
    position: 'fixed', bottom: 50, width: '100%', textAlign: 'center'
  };

  const isFirst = i <= 0;
  const isLast = i >= routes.length -1;

  return (
  <div>
    {React.createElement(routes[i])}
    <div style={naveStyle}>
      {isFirst ? '' : <a href={`#/${i}`}>{'<'}</a>}
      <a href={location.href.replace(location.hash, '')}>&nbsp;&nbsp;&nbsp;TOC&nbsp;&nbsp;&nbsp;</a>
      {isLast ? '' : <a href={`#/${(i + 2)}`}>{'>'}</a>}
    </div>
  </div>
  )

}

