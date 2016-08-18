var React = require('react');

function getRndId() {
	var id;
	while(document.getElementById(id = Math.random().toString(36).substr(2)));
	return id;
}

var DummyCheckbox = React.createClass({
	getInitialState: function () {
		return {
			dumId: getRndId()
		};
	},
	render: function () {
		return (
			<div className="dummy-checkbox">
				<input type="checkbox" id={this.state.dumId} onChange={this.props.onChange} />
				<label htmlFor={this.state.dumId}>
					<span className="selection"/>
				</label>
			</div>
		);
	}
});

module.exports = DummyCheckbox;