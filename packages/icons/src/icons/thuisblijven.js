import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Thuisblijven = forwardRef(({ ...rest }, ref) => {
  return (
    <svg
      ref={ref}
      role="img"
      focusable="false"
      width={32}
      height={32}
      fill="none"
      {...rest}
    >
      <path fill="#fff" d="M0 0h32v32H0z" />
      <path
        d="M27.863 15.269L16.325 4.34c-.203-.163-.487-.163-.65 0L4.137 15.269c-.203.203-.324.447-.324.731v.731c0 .244.203.488.487.488h1.95v10.156h19.5V17.219h1.95a.47.47 0 00.488-.488V16c0-.284-.122-.528-.325-.731zm-9.222-3.982c.69 0 1.137.447 1.137 1.3 0 .732-.406 1.26-1.137 1.26-.732 0-1.138-.447-1.138-1.26 0-.771.406-1.3 1.138-1.3zm-5.2-.365c.69 0 1.137.447 1.137 1.3 0 .731-.406 1.26-1.137 1.26-.732 0-1.138-.448-1.138-1.26 0-.772.406-1.3 1.138-1.3zm7.475 8.937c-.732-2.356-.691-3.372-.854-3.9l-.121-.243c.162.65.04.934-.041 1.259-.081.366-.162.69-.081 1.056.162.65.69 1.463.69 3.535 0 0-.203-.082-.609-.122h-.081v4.306s-1.016-.163-1.056-1.097v-3.128c-.122 0-.285.04-.407.04v3.129c-.081.934-1.056 1.097-1.056 1.097v-3.9c.244 0 .731-.163.731-.691 0-1.26.04-3.29-.69-3.575-.529-.203-1.95-.203-2.397 0-.772.366-.813 2.356-.732 3.575.041.569.488.69.732.69v3.86c-.69 0-1.178-.406-1.26-1.178 0 0-.162-4.672-.162-4.713 0-.04-.081-.122-.163-.122-.08 0-.162.082-.162.122 0 .041-.163 4.713-.163 4.713.041.772-.406 1.178-1.097 1.178v-9.79c0-.041-.162 0-.243.121-.163.285-.163.65-.163.975v3.006c-.325 0-.894-.203-.934-.934-.081-1.625-.284-4.59 1.3-4.997 1.015-.284 2.234-.244 3.128 0 .284.082.528.244.731.488-.406.203-.65.61-.65 1.178 0 .772.406 1.219 1.138 1.219.731 0 1.137-.488 1.137-1.22 0-.446-.122-.771-.365-1.015.162-.162.365-.244.568-.325a3.42 3.42 0 011.097-.162c.406 0 .732.04 1.097.162.731.244 1.138.894 1.3 2.235.081.609.285 1.097.447 1.99.122.732-.284 1.138-.61 1.178z"
        fill="#000"
      />
    </svg>
  );
});

Thuisblijven.propTypes = {
  // color: PropTypes.string,
  // size: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number
  // ]),
};

Thuisblijven.displayName = 'Thuisblijven';

export default Thuisblijven;