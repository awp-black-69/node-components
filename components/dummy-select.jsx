var _ = require('underscore')
	,React = require('react');


var DummySelect = React.createClass({
	getInitialState: function () {
		return {
			isActive: false,
			selectedItem: null,
			displayText: null
		};
	},

	selectItem: function (e) {
		var currentTarget = e.currentTarget
			,selectedItem
			,selectedIndex
			,oldSelectedItem;

		oldSelectedItem = this.state.selectedItem;

		selectedItem = _.find(this.props.data, function (item) {
			return item.id == currentTarget.id;
		});

		this.setState({
			selectedItem: selectedItem,
			displayText: selectedItem && selectedItem.value,
			isActive: false
		});

		if(!oldSelectedItem || (oldSelectedItem.id != selectedItem.id)) {
			this.props.onChange && this.props.onChange(this.props.name, selectedItem, (this.props.data || []).indexOf(selectedItem));
		}
	},
	getItemList: function () {
		var that = this;

		return _.map(this.props.data, function (item) {
			return (
				<li key={item.id} id={item.id} onClick={that.selectItem}>{item.value}</li>
			);
		});
	},
	toggleDropDown: function () {
		this.setState({
			isActive: !this.state.isActive
		});
	},
	collapseDropDown: function () {
		if(this.state.isActive) {
			this.setState({
				isActive: false
			});
		}
	},
	stopPropagation: function (e) {
		e.nativeEvent.stopImmediatePropagation();
	},
	updateSelected: function (props) {
		var selectedItem;


		if(props.selectedId) {
			selectedItem = _.find(props.data, function (data) {
				return data.id = props.selectedId;
			});
		} else if(undefined != props.selectedIndex) {
			selectedItem = props.data[props.selectedIndex];
		}

		this.setState({
			selectedItem: selectedItem,
			displayText: selectedItem && selectedItem.value
		});
	},

	componentWillReceiveProps: function (nextProps) {
		this.updateSelected(nextProps);
	},
	componentDidMount: function () {
		document.addEventListener('click', this.collapseDropDown);

		this.updateSelected(this.props);
	},
	componentWillUnmount: function () {
		document.removeEventListener('click', this.collapseDropDown);
	},

	render: function () {
		return (
			<div className={"dummy-select" + (this.state.isActive ? " active" : "") + (this.props.position == "up" ? " position-up" : "")} onClick={this.stopPropagation}>
				<div className="selected-item" onClick={this.toggleDropDown}>
					<span className={"hint" + (this.state.displayText ? " has-value" : "")}>{this.state.displayText || this.props.hint || "Select"}</span>
					<span className="icon"/>
				</div>
				<div className="item-list-wrapper">
					<ul className="item-list">
						{this.getItemList()}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = DummySelect;