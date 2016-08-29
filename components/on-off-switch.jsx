var React = require('react');

var OnOffSwitch = React.createClass({
	getInitialState: function () {
		return {
			isOn: true
		};
	},

	toggleSwitch: function(e) {
		var isOn = e.target.classList.contains('on');
		this.setState({
			isOn: isOn
		});

		this.props.onChange(this.props.name, isOn);
	},
	updateSwitch: function (props) {
		if(undefined != props.isOn) {
			this.setState({
				isOn: props.isOn
			});
		}
	},

	componentWillReceiveProps: function (nextProps) {
		this.updateSwitch(nextProps);
	},
	componentDidMount: function() {
		this.updateSwitch(this.props);
	},
	render: function () {
		return (
			<div className="on-off-switch-wrapper">
				<div className={"switch on" + (this.state.isOn ? " selected" : "")} onClick={this.toggleSwitch}>{this.props.onText}</div>
				<div className={"switch off" + (!this.state.isOn ? " selected" : "")} onClick={this.toggleSwitch}>{this.props.offText}</div>
			</div>
		);
	}
});

module.exports = OnOffSwitch;