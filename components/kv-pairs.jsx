var React = require('react');

var InputText = require('./input-text.jsx');

var KVPair = React.createClass({
	getInitialState: function(){
		return {
			pairs: []
		};
	},
	updateKey: function(index, value){
		var pairs = this.state.pairs;

		pairs[index].key = value;

		this.setState({
			pairs: pairs
		});
	},
	updateValue: function(index, value){
		var pairs = this.state.pairs;

		pairs[index].value = value;

		this.setState({
			pairs: pairs
		});
	},
	pushPairs: function(e){
		this.setState({
			pairs: this.state.pairs.concat({key: e.target.value, value: ''})
		});
	},
	deletePair: function(e){
		var delAt = e.target.getAttribute('data-index')
			,pairs = this.state.pairs;

		pairs.splice(delAt, 1);

		this.setState({
			pairs: pairs
		});
	},
	render: function(){
		var self = this
			,rows;

		rows = this.state.pairs.map(function(pair, index){
			return (
				<div className="row has-value">
					<div className="key-wrapper">
						<InputText value={pair.key} onChange={self.updateKey} name={index} />
					</div>
					<div className="value-wrapper">
						<InputText value={pair.value} onChange={self.updateValue} name={index} />
					</div>
					<i className="close-icon" data-index={index} onClick={self.deletePair} />
				</div>
			);
		});

		rows.push(
			<div className="row">
				<div className="key-wrapper">
					<input type="text" onFocus={this.pushPairs} value="" />
				</div>
				<div className="value-wrapper">
					<input type="text" value="" />
				</div>
			</div>
		);

		return (
			<div className="kv-pair-wrapper">
				{rows}
			</div>
		);
	}
});

module.exports = KVPair;