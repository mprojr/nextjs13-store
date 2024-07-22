import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Button({ children, className, ...props }) {
  return (
    <button className={classNames('px-4 py-2 bg-[#76b4c7] text-white rounded hover:bg-black', className)} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};