import React from 'react';
// import { Link } from 'react-router';
import { Link } from 'react-router-dom';
//import FormCampaign from './form-campaign';

export default class AddCampaign extends React.Component{

	handleSearch() {
		window.location = '/form-campaign';
	}
	
	render() {
		return (
			<div className="AddCampaign-div">
				<button className="btn btn-default btn-lg">
        			<Link to={"/form-campaign"}>Add Campaign</Link>
      			</button>
      		</div>
		);
	}
}