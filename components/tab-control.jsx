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
			var isActive = !_.contains(that.props.disabledTabs, tab.name);

			return (
				<div className={"tab" + (that.state.selectedTabIndex == index ? " active" : "") + (!isActive ? " disabled" : "")} key={tab.id} data-index={index} onClick={isActive ? that.updateTab : null}>
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

	componentWillUpdate: function (nextProp) {
		var that = this
			,selectedIndex = that.state.selectedTabIndex
			,selectedTab
			,isSelectedDisabled
			,firstEnabledTab;

		selectedTab = nextProp.data[selectedIndex];

		isSelectedDisabled = _.contains(nextProp.disabledTabs, selectedTab.name);

		if(isSelectedDisabled) {
			firstEnabledTab = _.find(nextProp.data, function (tab) {
				return !_.contains(nextProp.disabledTabs, tab.name)
			});

			this.setState({
				selectedTabIndex: nextProp.data.indexOf(firstEnabledTab)
			});
		}
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