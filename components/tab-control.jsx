var _ = require('underscore')
	,React = require('react');

var TabControl = React.createClass({
	getInitialState: function () {
		return {
			selectedTabIndex: 0
		};
	},

	updateTab: function (e) {
		var currentTarget = e.currentTarget
			,index = currentTarget.getAttribute('data-index');

		this.setState({
			selectedTabIndex: index
		});
	},
	generateTabs: function () {
		var that = this
			,data = this.props.data;

		return _.map(data, function (tab, index) {
			return (
				<div className={"tab" + (that.state.selectedTabIndex == index ? " active" : "")} key={tab.id} data-index={index} onClick={that.updateTab}>
					{tab.text}
				</div>
			);
		});
	},
	getTabContent: function () {
		var that = this
			,tabIndex = this.state.selectedTabIndex
			,tabs = this.props.data;

		return _.map(tabs, function (tab, index) {
			return (
				<div className="componet-wrapper" key={tab.id} id={tab.id} style={{display: (tabIndex==index ? "block" : "none")}}>
					<tab.component {...tab.componentParams} name={tab.name} onChange={that.props.onChange} />
				</div>
			);
		});
	},

	render: function () {
		return (
			<div className="tab-control">
				<div className="tabs">
					{this.generateTabs()}
				</div>
				<div className="tab-component-wrapper">
					{this.getTabContent()}
				</div>
			</div>
		);
	}
});

module.exports = TabControl;