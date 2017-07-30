import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import AddCampaign from './components/add-campaign';
import Home from './components/home';//primeiro component do react
import DeleteCampaign from './components/deleteCampaign';
import FormCampaign from './components/form-campaign';
import DownloadCampaign from './components/download-page'

class App extends Component {
  render() {
  	return (
  			 <BrowserRouter>
  			 	<div>
  			 		<Route path={"/"} component={Home}></Route>
  			 		<Route path={"/form-campaign"} component={FormCampaign}></Route>
  			 		<Route path={"/download-campaign/:title/:wallet/:value/:date/"} component={DownloadCampaign}></Route>
  			 		<Route path={"/add-campaign"} component={AddCampaign}></Route>
  			 	</div>
          	</BrowserRouter>
  		);
 // return <div>
 //      <Header/>
        <div className="heigth20"></div>
 //      <Home/>
 // </div>;
 }
}

export default App;
