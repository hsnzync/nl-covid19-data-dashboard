import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Other = forwardRef(({ ...rest }, ref) => {
  return (
    <svg
      ref={ref}
      role="img"
      focusable="false"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="currentColor"
      {...rest}
    >
      <path d="M10.8014 20.5916C9.36173 20.5916 8.20996 19.4399 8.20996 18.0002C8.20996 16.5605 9.36173 15.4087 10.8014 15.4087C12.2411 15.4087 13.3929 16.5605 13.3929 18.0002C13.3929 19.4399 12.2411 20.5916 10.8014 20.5916ZM18 20.5916C16.5603 20.5916 15.4085 19.4399 15.4085 18.0002C15.4085 16.5605 16.5603 15.4087 18 15.4087C19.4397 15.4087 20.5914 16.5605 20.5914 18.0002C20.5914 19.4399 19.4397 20.5916 18 20.5916ZM25.1985 20.5916C23.7588 20.5916 22.607 19.4399 22.607 18.0002C22.607 16.5605 23.7588 15.4087 25.1985 15.4087C26.6382 15.4087 27.79 16.5605 27.79 18.0002C27.79 19.4399 26.6382 20.5916 25.1985 20.5916Z" />
    </svg>
  );
});

Other.propTypes = {
  // color: PropTypes.string,
  // size: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number
  // ]),
};

Other.displayName = 'Other';

export default Other;