import React from "react";
import './home.css';

export default class Header extends React.Component {
	
	render(){
		return(
			<nav className="navbar navbar-default">
				<div className="container">
					<div className="navbar-header">
						<div className="col-sm-12">
							<h1>CoinWISE</h1>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}