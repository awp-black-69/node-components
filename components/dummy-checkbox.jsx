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

		this.props.onChange && this.props.onChange(e);
	},

	componentDidMount: function () {
		this.setState({
			isChecked: this.props.checked,
			dumId: this.props.id || this.state.dumId || getRndId()
		});
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