import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const GeenWedstrijden = forwardRef(({ ...rest }, ref) => {
  return (
    <svg
      ref={ref}
      focusable="false"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="currentColor"
      {...rest}
    >
      <path d="M14.9976 14.4268C15.9707 14.7049 16.8049 14.0097 17.0829 13.0366C17.222 11.9244 16.8049 11.0902 15.8317 10.9512C14.7195 10.6732 14.0244 11.2293 13.7463 12.3415C13.4683 13.4536 14.0244 14.2878 14.9976 14.4268Z" />
      <path d="M22.5049 26.6609C21.3927 26.6609 20.5585 27.4951 20.5585 28.6073C20.5585 29.7195 21.3927 30.5536 22.5049 30.5536C23.6171 30.5536 24.4512 29.7195 24.4512 28.6073C24.4512 27.4951 23.6171 26.6609 22.5049 26.6609Z" />
      <path d="M15.3151 19.6069L28.2066 32.4983L29.3155 31.3895L6.79351 8.86749L5.68463 9.97637L11.0749 15.3667C10.2588 15.557 9.56663 15.8261 9.29756 16.0951C8.74146 16.6512 8.04634 17.7634 7.76829 18.5976C7.49024 19.2927 7.62926 19.9878 8.18536 20.4049C8.24278 20.3188 8.33578 20.1556 8.45455 19.9471C8.91092 19.1462 9.74787 17.6773 10.4098 17.3464C10.6878 17.2073 11.3829 16.9293 12.2171 16.9293C11.8 18.5976 11.3829 20.822 11.2439 21.6561C10.9919 23.0423 11.7679 23.5147 12.7436 24.1086C12.8443 24.1699 12.9472 24.2325 13.0512 24.2976H12.9122C12.8659 24.2976 12.7886 24.2821 12.6856 24.2615C12.4797 24.2203 12.1707 24.1586 11.8 24.1586C11.5219 24.8537 10.8268 26.2439 10.5488 26.8C9.71463 26.8 8.04634 26.3829 7.62926 26.2439C6.23902 25.9659 5.68292 27.3561 5.68292 27.3561C6.79512 27.7732 9.57561 28.7464 10.6878 28.7464C11.3829 28.7464 11.661 28.4683 12.078 27.7732C12.2819 27.4674 12.5045 27.1055 12.732 26.7356C13.1251 26.0964 13.5331 25.433 13.8854 24.9927C14.4415 25.2708 15.2756 25.6878 15.6927 25.9659C15.7622 26.4525 15.8317 27.2866 15.9012 28.1208C15.9707 28.9549 16.0402 29.789 16.1098 30.2756C16.1098 30.8317 16.6659 31.6659 17.778 31.9439C17.9171 30.5537 17.9171 29.7195 17.9171 28.3293V25.9659C17.9171 25.5488 17.9171 25.1317 17.639 24.7147C17.5 24.2976 17.0829 23.8805 14.7195 22.2122C14.8585 21.6561 14.9976 21.0305 15.1366 20.4049C15.1961 20.1371 15.2556 19.8692 15.3151 19.6069Z" />
      <path d="M21.2537 19.8488C21.2537 19.9638 21.0634 20.5545 20.2892 20.8339L19.0951 19.6397C19.5818 19.7094 20.278 19.7791 21.2537 19.8488Z" />
      <path d="M16.8049 17.3464L16.8111 17.3558L14.7736 15.3183C16.1121 15.7006 16.4195 16.4313 16.7367 17.1852C16.7592 17.2388 16.7818 17.2926 16.8049 17.3464Z" />
      <path d="M22.2268 5.25119C22.5049 5.39022 22.7829 5.11217 22.922 4.83412C23.061 4.41705 22.7829 4.139 22.5049 4.139C22.0878 3.99997 21.9488 4.27802 21.8098 4.55607C21.6707 4.83412 21.8098 5.11217 22.2268 5.25119Z" />
      <path d="M26.6757 8.5878C26.5366 9.28292 26.1196 9.56097 25.5635 9.42194C24.8683 9.28292 24.7293 8.86585 24.7293 8.17072C24.8683 7.61462 25.4244 7.19755 25.9805 7.33658C26.5366 7.4756 26.8147 7.89267 26.6757 8.5878Z" />
      <path d="M27.9021 12.4172C28.1845 12.4703 28.5812 12.5449 29.1781 12.6195C29.1781 12.6195 29.039 13.1756 28.2049 13.3147C27.9268 13.3147 27.0927 13.3147 26.8146 13.1756C26.5366 13.0366 25.9805 12.3415 25.8415 11.9244C25.7488 12.2951 25.6561 12.7895 25.5634 13.2838C25.5171 13.5309 25.4707 13.7781 25.4244 14.0098C25.7875 14.2922 26.0687 14.5044 26.2883 14.6701C26.8252 15.0753 26.994 15.2027 27.0927 15.4C27.2317 15.539 27.2317 15.8171 27.2317 16.0951V17.4854C27.2317 17.8171 27.2001 18.1172 27.1669 18.4309C27.1307 18.7746 27.0927 19.1347 27.0927 19.5708C26.3976 19.4317 26.1195 18.8756 26.1195 18.5976C26.05 18.3195 26.0152 17.833 25.9805 17.3464C25.9457 16.8598 25.911 16.3732 25.8415 16.0951L24.7293 15.539C24.4512 16.0951 24.0342 16.7903 23.7561 17.2073C23.4781 17.6244 23.339 17.7634 22.922 17.7634C22.2268 17.7634 20.6976 17.2073 20.0024 16.9293C20.0024 16.9293 20.2805 16.0951 20.9756 16.2342C21.022 16.2342 21.161 16.2651 21.3463 16.3063C21.7171 16.3886 22.2732 16.5122 22.6439 16.5122C22.922 16.2342 23.339 15.4 23.4781 14.983C23.8951 15.122 24.1732 15.122 24.1732 15.122H24.3122C24.2476 15.0735 24.1829 15.0269 24.1194 14.9811C23.6362 14.6328 23.2162 14.3299 23.339 13.5927C23.3928 13.3777 23.4465 13.0589 23.5083 12.6923C23.6063 12.1108 23.7246 11.4091 23.8951 10.8122C23.339 10.8122 22.922 10.9512 22.7829 11.0903C22.5003 11.2787 22.09 11.9779 21.8115 12.4523C21.6791 12.678 21.5765 12.8528 21.5317 12.8976C21.1146 12.6195 21.1146 12.2025 21.2537 11.7854C21.3355 11.6626 21.4174 11.5158 21.5027 11.3625C21.7074 10.9952 21.9325 10.5913 22.2268 10.3951C22.2811 10.3409 22.3777 10.2813 22.5043 10.2216C22.4996 10.0743 22.4675 9.81765 22.4354 9.56099C22.4007 9.28294 22.3659 9.00489 22.3659 8.86587C22.2269 8.86587 21.9488 8.72684 21.8098 8.58782C21.7403 8.72684 21.636 8.90062 21.5318 9.0744C21.4275 9.24819 21.3232 9.42197 21.2537 9.56099C21.2165 9.59824 21.1892 9.63549 21.1639 9.67007C21.0947 9.76454 21.0402 9.83904 20.8366 9.83904C20.4196 9.83904 19.5854 9.56099 19.1683 9.42197C19.1683 9.42197 19.3074 9.00489 19.7244 9.00489C19.782 9.00489 19.9112 9.02875 20.0625 9.05669C20.2764 9.09621 20.5347 9.14392 20.6976 9.14392C20.7903 9.05124 20.883 8.83498 20.9757 8.61872C21.022 8.51058 21.0683 8.40245 21.1147 8.30977H21.5318C21.5071 8.29743 21.4813 8.28509 21.4549 8.27246C21.184 8.14278 20.849 7.98236 20.9757 7.47563C20.9757 7.3366 21.1147 6.50245 21.3927 5.94636C21.2298 5.94636 21.1147 5.99406 21.0193 6.03358C20.9518 6.06153 20.8942 6.08538 20.8366 6.08538C20.6576 6.1749 20.4786 6.49497 20.3366 6.74869C20.2582 6.88902 20.191 7.00904 20.1415 7.05855C20.0025 6.91953 19.8635 6.7805 20.0025 6.50245C20.1415 6.22441 20.4196 5.80733 20.5586 5.66831C20.6976 5.52928 21.5318 5.39026 21.9488 5.39026C22.5875 5.39026 22.7567 5.7424 22.8879 6.01525C22.8994 6.03934 22.9107 6.06282 22.922 6.08538C22.922 6.22441 23.2 6.64148 23.3391 6.7805C23.3391 6.7805 23.7561 6.91953 24.3122 6.91953C24.2775 6.95428 24.2514 6.99773 24.2253 7.04117C24.1471 7.17151 24.0689 7.30184 23.7561 7.19758C23.4781 7.3366 23.061 7.3366 22.922 7.19758C22.783 7.05855 22.5049 6.7805 22.3659 6.50245C22.3659 6.91953 22.2269 7.3366 21.9488 7.61465C22.783 8.17075 22.922 8.30977 22.922 8.4488C23.061 8.58782 23.061 8.72684 23.061 8.86587V10.0172C23.5904 9.86237 24.2512 9.75936 24.7293 9.83905C25.9979 9.96591 26.2247 10.4401 26.4659 10.9446C26.489 10.993 26.5123 11.0416 26.5366 11.0903C26.6756 11.3683 27.0927 12.2025 27.3707 12.3415C27.4996 12.3415 27.6582 12.3713 27.9021 12.4172Z" />
    </svg>
  );
});

GeenWedstrijden.propTypes = {
  // color: PropTypes.string,
  // size: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number
  // ]),
};

GeenWedstrijden.displayName = 'GeenWedstrijden';

export default GeenWedstrijden;