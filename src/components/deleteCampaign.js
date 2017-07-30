import React from 'react';

export default class DeleteCampaign extends React.Component {
 constructor() {
 super();
 this.state = {
 clicks: 0
 }
 }

 clicou = () => this.setState({clicks: this.state.clicks + 1});
 
 render() {
 return <div>
 	<p>{this.state.clicks}</p>
 	<button className="btn btn-primary" onClick={this.clicou}>Delete Campaign</button>
 </div>
 }
}