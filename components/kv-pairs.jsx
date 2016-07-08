var _ = require('underscore')
	,React = require('react');

var InputText = require('./input-text.jsx');

var KVPair = React.createClass({
	getInitialState: function(){
		return {
			pairs: []
		};
	},
	hasChanged: function (pairs) {
		var kv = {};

		if(!this.props.onChange)
			return;

		_.each(pairs, function (pair) {
			kv[pair.key] = pair.value;
		});

		this.props.onChange(this.props.name, kv);
	},
	updateKey: function(index, value){
		var pairs = this.state.pairs;

		pairs[index].key = value;

		this.setState({
			pairs: pairs
		});

		this.hasChanged(pairs);
	},
	updateValue: function(index, value){
		var pairs = this.state.pairs;

		pairs[index].value = value;

		this.setState({
			pairs: pairs
		});

		this.hasChanged(pairs);
	},
	pushKey: function(id){
		this.setState({
			pairs: this.state.pairs.concat({key: '', value: '', id: id})
		});
	},
	pushValue: function(id){
		this.setState({
			pairs: this.state.pairs.concat({key: '', value: '', id: id})
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
			,rows
			,now;

		rows = this.state.pairs.map(function(pair, index){
			return (
				<div className="row has-value" key={pair.id}>
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

		now = Date.now();

		rows.push(
			<div className="row" key={now}>
				<div className="key-wrapper">
					<InputText onFocus={this.pushKey} focusData={now} value="" />
				</div>
				<div className="value-wrapper">
					<InputText onFocus={this.pushValue} focusData={now} value="" />
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