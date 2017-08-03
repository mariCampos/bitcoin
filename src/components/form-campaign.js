import React from 'react';
import { browserHistory } from 'react-router';
import * as Datetime from "react-datetime";
import * as ReactDatetime from "react-datetime";
import { FormErrors } from './FormErrors';
import { Link } from 'react-router-dom';
require('react-datetime');

export default class FormCampaign extends React.Component {
	constructor() {
 		super();

 		this.state = {
 			title: '',
 			wallet: 0,
 			money: 0,
 			date: '',
      formErrors: {title: '', wallet: 0, money: 0, date:''},
      formValid: false
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

    const name = event.target.name;
  const value = event.target.value;
 		let newState = {};

  		newState[event.target.name] = event.target.value;

  		this.setState(newState, () => { this.validateField(name, value) });
 	}

 	handleSubmit(event) {
 		//adicionar action
 		 // this.setState({
      this.verifyState();

 	}

  validateField(fieldName, value) {
  let fieldValidationErrors = this.state.formErrors;
  let titleValid = this.state.title;
  let walletValid = this.state.wallet;
  let moneyValid = this.state.money;
  let dateValid = this.state.date;

  switch(fieldName) {
    case 'title':
      titleValid  = value !== '';
      fieldValidationErrors.title = titleValid ? '' : ' is invalid';
      break;
    case 'wallet':
      walletValid = value > 0;
      fieldValidationErrors.wallet = walletValid ? '': 'is invalid';
      break;
     case 'money':
      moneyValid = value > 0;
      fieldValidationErrors.money = moneyValid ? '': 'is invalid';
      break;
    case 'date':
      dateValid = value !== '';
      fieldValidationErrors.date = dateValid ? '': 'is invalid';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  titleValid: titleValid,
                  walletValid: walletValid,
                  moneyValid: moneyValid,
                  dateValid: dateValid
                }, this.validateForm);
}

validateForm() {
  this.setState({formValid: this.state.titleValid && this.state.walletValid && this.state.moneyValid && this.state.dateValid});
}


 	render(){
 		var title = this.state.title;
 		var wallet = this.state.wallet;
 		var money = this.state.money;
 		var date = this.state.date;
    var validate = this.state.formValid;



 		return(
 			<form onSubmit={this.handleSubmit}>
   

        <div className="formadd">
            <div className="form-header">
              <h2>Create your wallet</h2>
              <p>Complete all fields</p>
            </div>
            <div className="height10"></div>
            <FormErrors formErrors={this.state.formErrors} />
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
              <input type="date" name="date" value={this.state.date} onChange={this.handleInputChange} placeholder="dd-mm-yyyy"/>
            </div>
             <button className="btn btn-default" disabled={!this.state.formValid} value="generate">

             {(function(validate) {
              if (validate ){
                return ( <Link to={"/download-campaign/" + title + "/" +wallet+"/"+ money +"/"+date}>Generate</Link>);
              }
             })(validate)}             
            </button>
          </div>
           
       
        </div>
              		
      </form>
 );
 		 
 }

}