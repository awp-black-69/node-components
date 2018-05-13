import React from 'react';

import { children } from '../_constants/propDefinitions';

const Button = props => (
	<button className="foo-btn">{props.children}</button>
);

Button.propTypes = {
	children,
};

Button.defaultProps = {
	children: null,
};

export default Button;
