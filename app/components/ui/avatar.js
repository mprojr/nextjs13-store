import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from 'next/image';

export function Avatar({ children, className, ...props }) {
  return (
    <div className={classNames('relative w-10 h-10 rounded-full overflow-hidden', className)} {...props}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt, ...props }) {
  return <Image src={src} alt={alt} height={500} width={500} className="w-full h-full object-cover" {...props} />;
}

export function AvatarFallback({ children, ...props }) {
  return <div className="flex items-center justify-center w-full h-full bg-gray-200" {...props}>{children}</div>;
}

Avatar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AvatarImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

AvatarFallback.propTypes = {
  children: PropTypes.node.isRequired,
};