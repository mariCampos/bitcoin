import React from 'react';
import Header from './header';
import AddCampaign from './add-campaign';

export default class Home extends React.Component{
	constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

	render() {
		return (
      <div>
        <Header/>
        <AddCampaign />
      </div>
    );
	}
}

