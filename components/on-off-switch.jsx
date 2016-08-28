var React = require('react');

var OnOffSwitch = React.createClass({
	getInitialState: function () {
		return {
			isOn: true
		};
	},
	componentDidMount: function() {
		if(undefined != this.props.isOn) {
			this.setState({
				isOn: this.props.isOn
			});
		}
	},
	render: function () {
		return (
			<div className="on-off-switch-wrapper">
				<div className={"switch on" + (this.state.isOn ? " selected" : "")}>{this.props.onText}</div>
				<div className={"switch off" + (!this.state.isOn ? " selected" : "")}>{this.props.offText}</div>
			</div>
		);
	}
});

module.exports = OnOffSwitch;