var React = require('react');

var InputText = React.createClass({
	getInitialState: function () {
		return {
			isFocused: false,
			value: ''
		};
	},

	focused: function () {
		this.setState({
			isFocused: true
		});
		this.props.onFocus && this.props.onFocus(this.props.focusData);
	},
	blured: function () {
		this.setState({
			isFocused: false
		});
	},
	textChanged: function (e) {
		var value = e.target.value;
		this.setState({
			value: value
		});

		this.props.onChange && this.props.onChange(this.props.name, value);
	},
	updateValue: function (props) {
		this.setState({
			value: props.value
		});
	},


	componentWillReceiveProps: function (nextProps) {
		this.updateValue(nextProps)
	},
	componentDidMount: function () {
		this.updateValue(this.props)
	},
	render: function () {
		// console.log("F", this.state.isFocused, "V", this.state.value);
		return (
			<div className={"dummy-input-text" + (this.state.isFocused ? " focused" : "") + (this.state.value ? " has-text" : "") + (!this.props.label ? " only-hint" : "")}>
				{
					this.props.label ?
						<label>{this.props.label}</label> :
						null
				}
				{
					this.props.hint ?
						<label className="hint">{this.props.hint}</label> :
						null
				}
				<input type="text" onFocus={this.focused} onBlur={this.blured} onChange={this.textChanged} value={this.state.value} />
				<div className="focus-line"></div>
			</div>
		);
	}
});

module.exports = InputText;