var React = require('react');

var queue = []
	,showToast = false;

var Toast = React.createClass({
	getInitialState: function () {
		return {
			id: null,
			showToast: false,
			message: '',
			timer: null
		};
	},

	updateTimer: function () {
		var self = this;

		if(this.state.timer) {
			window.clearTimeout(this.state.timer)
		}

		this.setState({
			timer: setTimeout(function () {
				self.endToast();
			}, this.props.toastTiming || 2000)
		});
	},
	endToast: function () {
		showToast = false;

		this.setState({
			timer: null,
			showToast: showToast,
			id: null
		});

		if(queue.length) {
			this.startToast(queue.shift())
		}
	},
	startToast: function (data) {
		showToast = true;

		this.setState({
			id: data.id,
			showToast: showToast,
			message: data.message
		});
		this.updateTimer();
	},
	onToast: function (data) {
		data.id = data.id || Math.random();

		if(data.id === this.state.id) {
			this.setState({
				message: data.message
			});
		} else if(showToast) {
			queue.push(data);
		} else {
			this.startToast(data);
		}
	},

	componentDidMount: function () {
		var emitter = this.props.emitter;

		if(emitter) {
			emitter.on('toast', this.onToast);
		}
	},
	render: function () {
		return (
			<div className={"toast-container" + (this.state.showToast ? " show-toast" : "")}>
				<div className="toast-message">
					<span>
						{this.state.message}
					</span>
				</div>
			</div>
		);
	}
});

module.exports = Toast;