import PropTypes from 'prop-types';

export const children = PropTypes.oneOfType([
	PropTypes.node,
	PropTypes.arrayOf(PropTypes.node),
]);

export const version = 'V1.0';
