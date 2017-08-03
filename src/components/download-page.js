import React from 'react';

		var assert = require('assert');
		var bigi = require('bigi');
		

export default class DownloadCampaign extends React.Component {


	constructor(props) {
		super(props);

		console.log(props);
		this.state = { 
        	wallet: this.props.match.params.wallet,
			title: this.props.match.params.title,
			money: this.props.match.params.value,
			date: this.props.match.params.date 
      };
 		
	}

	ascii_to_hexa(str)
  	{
		var arr1 = '';
		for (var n = 0, l = str.length; n < l; n ++) 
     	{
			arr1 += Number(str.charCodeAt(n)).toString(16);
	 	}
		return arr1;
   }


	generateSeeds(title, wallet) {
		var text = "talents.jun2017";
	
		
		let qtdWallet = Number(wallet);
		var masterKey = [];

		for (var i = 0; i < qtdWallet; i++) {
			let textss = "" + text + title + i;
			masterKey[i] = textss;
		 }

		 return masterKey;
	}

	generateSHA256(seed) {

		var bitcoin = require("bitcoinjs-lib");
		var hash = bitcoin.crypto.sha256(seed);

    	// var keyPair = new bitcoin.ECPair(hash);
    	// var address = keyPair.getAddress();

    	return hash;
	}

	base58Encode(textualSeed) {
		const bs58 = require('bs58');

		//var bytes = Buffer.from(textualSeed);
		var address = bs58.encode(textualSeed);
		return address;
	}

	base58Decode(textualSeed) {
		var bs58check = require('bs58check');
		var bitcoin = require("bitcoinjs-lib")

		var decoded = bs58check.decode(textualSeed);

		var d = bigi.fromBuffer(decoded);

    	var keyPair = new bitcoin.ECPair(d);

    	console.log(keyPair);
    	var address = keyPair.getAddress();

		return address;
	}

	generatePublicKey(text) {
		var bitcoin = require("bitcoinjs-lib");

    	var keyPair = bitcoin.ECPair.fromWIF(text);
    	//var keyPair = new bitcoin.address.fromBase58Check(hash);
    	var address = keyPair.getAddress();


		return address;

	}

	generateAddressBitcoin(seed) {
		const url = "https://coinwise.io/w/#";

		var address = url + seed;

		// var bitcoin = require("bitcoinjs-lib");
		// var keyPair = bitcoin.ECPair.makeRandom();

		// var address = keyPair.getAddress();

		return address;
	}

	generateWIFform(privateKey) {
		var wif = require('wif');

		var privateKey = new Buffer(privateKey);

		var key = wif.encode(128, privateKey, false);

		return key;
	}

	generateFileCoinWise(text, fileName) {
		var FileSaver = require('file-saver');
		var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
		FileSaver.saveAs(blob, fileName);
	}

	render(){
	

		var _masterKey = this.generateSeeds(this.state.title, this.state.wallet);

		var intermediarySeedAux = [];
		var intermediarySeed = [];
		var finalSeed = [];
		var privateKey = [];
		var WIFform = [];
		var publicKey = [];
		var url = [];

		for(var j = 0; j < _masterKey.length; j++){
			intermediarySeedAux[j] = this.generateSHA256(_masterKey[j]);
		} 

		for(var t = 0; t < _masterKey.length; t++) {
			let intermediary = this.generateSHA256(intermediarySeedAux[t]);
			intermediarySeed[t] = this.base58Encode(intermediary);
			finalSeed[t] = intermediarySeed[t].substring(0,20);
			privateKey[t] = this.generateSHA256(finalSeed[t]);
			WIFform[t] = this.generateWIFform(privateKey[t]);
			publicKey[t] = this.generatePublicKey(WIFform[t]);
		    url[t] = this.generateAddressBitcoin(finalSeed[t]);
		}

		console.log(WIFform);
		console.log(publicKey);
		console.log(url);

		var output = [];
		var textCoinWISE = ""; //texto para download
		var textClient = "";
		var fileNameCoinWISE = this.state.title + "_private.txt";
		var fileNameClient = this.state.title + "_address.txt";

		for(var i = 0; i < WIFform.length; i++) {
			output[i] = {
				WIF: WIFform[i],
				key: publicKey[i],
				seed: url[i]
			}
			textCoinWISE += output[i].WIF + " " + output[i].key + " " + output[i].seed + "\n"; 
			textClient += output[i].key + " " + this.state.money + "\n";
		}


		var listItems = output.map(function(item) {
      		return (
        		<tr>
          			<td>{item.WIF}</td>
          			<td>{item.key}</td>
          			<td><a href={item.seed} target="_blank">{item.seed}</a></td>
        		</tr>
      		);
    	});
		
		return(
			<div>
				<h2>{this.state.title}</h2>
				<div className="height20"></div>
				<div className="table-responsive">
  					<table className="table table-hover">
    					<tr>
    						<th>WIF</th>
    						<th>Address</th>
    						<th>URL</th>
    					</tr>
    					<tbody>
    						{listItems}
    					</tbody>

 					 </table>
				</div>
				<div>
					<div className="height10"></div>
					<div className="row">
						<div className="col-sm-6">
							<button className="btn btn-default" onClick={() => {this.generateFileCoinWise(textCoinWISE, fileNameCoinWISE)}}>Download CoinWISE</button>
						</div>
						<div className="col-sm-6"><button className="btn btn-default" onClick={() => {this.generateFileCoinWise(textClient, fileNameClient)}}>Download Client</button></div>
					</div>
				</div>
			</div>
		);
	}

}
