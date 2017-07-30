import React from 'react';
import { browserHistory } from 'react-router';
import * as Datetime from "react-datetime";
import * as ReactDatetime from "react-datetime";
import { Link } from 'react-router-dom';
require('react-datetime');

export default class FormCampaign extends React.Component {
	constructor() {
 		super();

 		this.state = {
 			title: '',
 			wallet: 0,
 			money: 0,
 			date: ''
 		}
 		// this.title = {value: ''};
 		// this.wallet = {value: ''};
 		// this.money = {value: ''};
 		// this.date = {value: ''};

 		this.handleInputChange = this.handleInputChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
 	}

 	handleInputChange(event) {
 		// const target = event.target;
 		// const name = target.name;
 		let newState = {};

  		newState[event.target.name] = event.target.value;

  		this.setState(newState);
 	}

 	handleSubmit(event) {
 		console.log(this.state.title);
 		console.log(this.wallet);
 		//adicionar action
 		 // this.setState({
   	// 		title: '',
   	// 		wallet: '',
   	// 		money: '',
   	// 		date: ''
   	// 	});
 		 // browserHistory.push("/download-campaign/"+this.state.title+"/"+this.state.wallet
 		 // 	+"/"+this.state.value+"/"+this.state.date);

 	}

 	render(){
 		var title = this.state.title;
 		var wallet = this.state.wallet;
 		var money = this.state.money;
 		var date = this.state.date;
 		return(
 			<form onSubmit={this.handleSubmit}>
   

        <div className="formadd">
            <div className="form-header">
              <h2>Create your wallet</h2>
            </div>
            <div className="height10"></div>

            <div className="campaign-form">
                   <div className="form-group">
                <h4>Campaign title:</h4>
                <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                  <h4>How many wallets:</h4>
                <input type="number" name="wallet" value={this.state.wallet} onChange={this.handleInputChange} />
              </div>
        
            <div className="form-group">
              
                  <h4>Value:</h4>
               <input type="number" name="money" value={this.state.money} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
          
                  <h4>Expiration date:</h4>
              <input type="text" name="date" value={this.state.date} onChange={this.handleInputChange} placeholder="dd-mm-yyyy"/>
            </div>
             <button className="btn btn-default"  value="generate"><Link to={"/download-campaign/" + title + "/" +wallet+"/"+ money +"/"+date}>Generate</Link></button>
          </div>
           
       
        </div>
              		
      </form>
 );
 		 
 }

}