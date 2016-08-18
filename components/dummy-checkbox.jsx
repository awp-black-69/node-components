var React = require('react');

function getRndId() {
	var id;
	while(document.getElementById(id = Math.random().toString(36).substr(2)));
	return id;
}

var DummyCheckbox = React.createClass({
	getInitialState: function () {
		return {
			dumId: null,
			isChecked: null
		};
	},

	checkboxChanged: function (e) {
		this.setState({
			isChecked: e.target.checked
		});

		this.props.onChange && this.props.onChange();
	},
	initialChecked: function (props) {
		this.setState({
			isChecked: props.checked,
			dumId: props.id || getRndId()
		});
	},

	componentDidMount: function () {
		this.initialChecked(this.props);
	},
	componentWillReceiveProps: function (nextProps) {
		this.initialChecked(nextProps);
	},

	render: function () {
		return (
			<div className="dummy-checkbox">
				<input type="checkbox" id={this.state.dumId} onChange={this.checkboxChanged} checked={this.state.isChecked} />
				<label htmlFor={this.state.dumId}>
					<span className="selection"/>
				</label>
			</div>
		);
	}
});

module.exports = DummyCheckbox;