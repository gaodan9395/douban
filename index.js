import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import M from './Xiangmu';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Detail from './detail/detail';
import Cart from './Cart/Cart';
import Login from './Login/Login';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
	<BrowserRouter>
    <Switch>
      <Route path="/Cart" component={Cart}/>
      <Route path="/Login" component={Login}/>
      <Route path="/Xiangmu" component={M} />
      <Route path="/detail/:id" component={Detail} />
      <Redirect to="/Xiangmu" />
    </Switch>
  </BrowserRouter>
	// <M /> 
	,document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
