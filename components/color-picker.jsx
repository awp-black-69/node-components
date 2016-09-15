var config = {
	prContainerWidth: 30,
	defaultSize: 200
};

var prDragInitAt = {x: 0, y: 0}
	,secDragInitAt = {x: 0, y: 0}
	,secCursorInitAt = {x: 0, y: 0}
	,isPrimaryDrag = false
	,isSecondaryDrag = false
	,isMoveBinded = true;

function rgbToHsb(rgb) {
	var hu,sa,br
		,r,g,b
		,redc, greenc, bluec
		,cMax, cMin;

	r = rgb.r;
	g = rgb.g;
	b = rgb.b;

	cMax = r >= g && r >= b ? r : (g >= b ? g : b);
	cMin = r <= g && r <= b ? r : (g <= b ? g : b);

	br = cMax / 255;

	if(cMax != 0)
		sa = (cMax - cMin) / cMax;
	else
		sa = 0;

	if(sa == 0)
		hu = 0;
	else {
		redc = (cMax - r) / (cMax - cMin);
		greenc = (cMax - g) / (cMax - cMin);
		bluec = (cMax - b) / (cMax - cMin);

		if(r == cMax)
			hu = bluec - greenc;
		else if (g == cMax)
			hu = 2 + redc - bluec;
		else
			hu = 4 + greenc - redc;

		if(hu < 0)
			hu += 1;
	}

	return {
		h: hu.toFixed(2),
		s: sa.toFixed(2),
		b: br.toFixed(2)
	};
}

module.exports = function (React) {
	var ColorPicker = React.createClass({
		getInitialState: function () {
			return {
				isPrimaryDrag: false,
				primaryY: 0,
				secX: 0,
				secY: 0
			};
		},

		getStyles: function () {
			var size = this.props.size || config.defaultSize;
			return {
				size: size,
				prCanvas: {
					height: size
				},
				secCanvas: {
					size: size
				}
			};
		},
		initPrDrag: function () {
			isPrimaryDrag = true;
		},
		endPrDrag: function () {
			isPrimaryDrag = false;
		},
		dragPrimaryPointer: function (e) {
			var rawY;

			if(!(e.buttons & 1)) { // 1 => left mouse button
				isPrimaryDrag = false;
			}

			if(isPrimaryDrag) {
				rawY = e.clientY - e.currentTarget.offsetTop;

				rawY = Math.min(rawY, this.props.size || config.defaultSize);
				rawY = Math.max(rawY, 0);


				this.setState({
					primaryY: rawY
				});

				this.drawSecondary(rawY);

				this.colorHasChanged(this.props.name, this.getColor(rawY, null, null));
			}
		},
		drawPrimary: function () {
			var prCanvas = this.refs.primaryCanvas
				,prCtx
				,grad;

			prCtx = prCanvas.getContext('2d');

			grad = prCtx.createLinearGradient(0,0,0,prCanvas.height);

			grad.addColorStop(0, '#F00');
			grad.addColorStop(1/6, '#FF0');
			grad.addColorStop(2/6, '#0F0');
			grad.addColorStop(3/6, '#0FF');
			grad.addColorStop(4/6, '#00F');
			grad.addColorStop(5/6, '#F0F');
			grad.addColorStop(1, '#F00');

			prCtx.fillStyle = grad;
			prCtx.fillRect(0,0,prCanvas.width,prCanvas.height);
		},
		drawSecondary: function (Y) {
			var maxY = this.props.size || config.defaultSize
				,secCanvas = this.refs.secondaryCanvas
				,secCtx = secCanvas.getContext('2d')
				,gradX
				,color;

			color = this.fromYToColor(Y / maxY);

			gradX = secCtx.createLinearGradient(0,0,secCanvas.width,0);
			gradX.addColorStop(0,'#FFF');
			gradX.addColorStop(1, 'rgb(' + parseInt(color.r) + ',' + parseInt(color.g) + ',' + parseInt(color.b) + ')');

			secCtx.fillStyle = gradX;

			secCtx.fillRect(0,0,secCanvas.width,secCanvas.height);

			gradX = secCtx.createLinearGradient(0,0,0,secCanvas.width);
			gradX.addColorStop(0,'rgba(0,0,0,0)');
			gradX.addColorStop(1, 'rgba(0,0,0,1)');

			secCtx.fillStyle = gradX;

			secCtx.fillRect(0,0,secCanvas.width,secCanvas.height);
		},
		fromYToColor: function (Y) {
			if(Y>=0 && Y<=1/6) {
				return {r: 255, g: (6*Y) * 255, b:0};
			} else if (Y > 1/6 && Y<=2/6) {
				return {r: (2-(6*Y)) * 255, g: 255, b: 0};
			} else if (Y > 2/6 && Y<=1/2) {
				return {r: 0, g: 255, b: ((6*Y)-2) * 255};
			} else if (Y > 1/2 && Y<=2/3) {
				return {r: 0, g: (4-(6*Y)) * 255, b: 255};
			} else if(Y>2/3 && Y<=5/6) {
				return {r: ((6*Y)-4) * 255, g: 0, b: 255};
			} else {
				return {r: 255, g: 0, b: (6-(6*Y)) * 255};
			}
		},
		jumpPrimary: function (e) {
			var canvasY = e.clientY - e.target.getBoundingClientRect().top;

			this.setState({
				primaryY: canvasY
			});

			this.drawSecondary(canvasY);

			this.colorHasChanged(this.props.name, this.getColor(canvasY, null, null));
		},
		enableSecondaryPointerDrag: function (e) {
			secDragInitAt.x = e.clientX;
			secDragInitAt.y = e.clientY;
			secCursorInitAt.x = this.state.secX;
			secCursorInitAt.y = this.state.secY;
			isSecondaryDrag = true;
		},
		dragPointer: function (e) {
			var x = e.clientX
				,y = e.clientY
				,nX
				,nY;

			if(isSecondaryDrag && !(e.buttons & 1)) {
				isSecondaryDrag = false;
			}

			nX = secCursorInitAt.x + (x - secDragInitAt.x);
			nY = secCursorInitAt.y + (y - secDragInitAt.y);

			if(isSecondaryDrag) {
				nX = Math.min(nX, this.refs.secondaryCanvas.width);
				nX = Math.max(nX, 0);

				nY = Math.min(nY, this.refs.secondaryCanvas.height);
				nY = Math.max(nY, 0);

				this.setState({
					secX: nX,
					secY: nY
				});
				this.colorHasChanged(this.props.name, this.getColor(null, nX, nY));
			}

		},
		getColor: function (prY, secX, secY) {
			secX = secX != null ? secX : this.state.secX;
			secY = secY != null ? secY : this.state.secY;
			prY = prY != null ? prY : this.state.primaryY;

			var primarySwatch
				,secondaryShade
				,size = this.props.size || config.defaultSize
				,shadeX = secX/size
				,shadeY = secY/size;

			primarySwatch = this.fromYToColor(prY/size);

			function shadeToColor(fraction, from, to) {
				var diff = to - from;
				return from + (diff * fraction);
			}

			secondaryShade = {
				r: shadeToColor(shadeX, 255, primarySwatch.r),
				g: shadeToColor(shadeX, 255, primarySwatch.g),
				b: shadeToColor(shadeX, 255, primarySwatch.b)
			};

			secondaryShade.r = parseInt(shadeToColor(shadeY, secondaryShade.r, 0));
			secondaryShade.g = parseInt(shadeToColor(shadeY, secondaryShade.g, 0));
			secondaryShade.b = parseInt(shadeToColor(shadeY, secondaryShade.b, 0));

			return secondaryShade;
		},
		colorHasChanged: function (name, data) {
			// Object.assign(data, {hsb: rgbToHsb(data)});
			this.props.onChange && this.props.onChange(name, data);
		},
		// setPositionByColor: function (color) {
		// 	var r = color.r
		// 		,g = color.g
		// 		,b = color.b
		// 		,saturationFactor
		// 		,saturatedR
		// 		,saturatedG
		// 		,saturatedB;
		//
		// 	saturationFactor = 255 / Math.max(r,g,b);
		//
		// 	saturatedR = r * saturationFactor;
		// 	saturatedG = g * saturationFactor;
		// 	saturatedB = b * saturationFactor;
		// },

		componentWillReceiveProps: function (nextProp) {
			if(nextProp.isActive && !isMoveBinded) {
				document.addEventListener('mousemove', this.dragPointer);
				isMoveBinded = true;
			} else if(!nextProp.isActive) {
				document.removeEventListener('mousemove', this.dragPointer);
				isMoveBinded = false;
			}
		},
		componentDidMount: function () {
			this.drawPrimary();

			this.drawSecondary(0);
			document.addEventListener('mousemove', this.dragPointer = this.dragPointer.bind(this));
			isMoveBinded = true;
			this.setState({
				secX: this.props.size || config.defaultSize
			});
		},
		componentWillUnmount: function () {
			document.removeEventListener('mousemove', this.dragPointer);
		},
		render: function () {
			var styles = this.getStyles();

			return (
				<div className="color-picker-wrapper" style={{width: styles.size + config.prContainerWidth}}>
					<div className="picker-container">
						<div className="primary-canvas-wrapper" style={{width: config.prContainerWidth}} onMouseMove={this.dragPrimaryPointer} onMouseUp={this.endPrDrag}>
							<canvas ref="primaryCanvas" width="10" height={styles.prCanvas.height} onClick={this.jumpPrimary} />
							<div className="primary-pointer" style={{top: this.state.primaryY}} onMouseDown={this.initPrDrag} />
						</div>
						<div className="secondary-canvas-wrapper">
							<canvas ref="secondaryCanvas" width={styles.secCanvas.size} height={styles.secCanvas.size} />
							<div className="secondary-pointer" style={{left: this.state.secX, top: this.state.secY}} onMouseDown={this.enableSecondaryPointerDrag}></div>
						</div>
					</div>
				</div>
			);
		}
	});

	return ColorPicker;
};