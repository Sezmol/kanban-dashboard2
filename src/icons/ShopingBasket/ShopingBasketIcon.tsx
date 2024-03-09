type ShopingBasketIconProps = {
  isActive?: boolean;
};

const ShopingBasketIcon = ({ isActive }: ShopingBasketIconProps) => {
  return (
    <>
      {isActive ? (
        <svg
          width='19'
          height='20'
          viewBox='0 0 19 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.1 7.28001H16.62C18.02 7.28001 19.06 8.85001 18.72 10.51L17.5 17.19C17.3909 18.2959 16.5159 19.1709 15.41 19.28H3.63C2.50849 19.189 1.61222 18.3096 1.5 17.19L0.2 10.45C-0.0999998 8.79001 0.93 7.22001 2.33 7.22001H8.33L3.96 2.00001C3.78109 1.65199 3.873 1.22605 4.17951 0.982791C4.48602 0.739529 4.92171 0.746738 5.22 1.00001L9.79 6.38001L13.79 1.03001C13.9686 0.795998 14.2585 0.675064 14.5505 0.71276C14.8425 0.750456 15.0922 0.941055 15.2055 1.21276C15.3189 1.48447 15.2786 1.796 15.1 2.03001L11.1 7.28001ZM6.56 15.44C6.68467 15.4425 6.80812 15.4151 6.92 15.36C7.32048 15.1588 7.48526 14.6734 7.29 14.27L5.65 11C5.54538 10.7009 5.27781 10.4889 4.96274 10.4554C4.64767 10.4219 4.34149 10.5728 4.17628 10.8432C4.01107 11.1136 4.01641 11.4549 4.19 11.72L5.82 15C5.96537 15.2731 6.2506 15.4427 6.56 15.44ZM9.83 15.09C9.38265 15.09 9.02 14.7274 9.02 14.28V11.28C9.01997 10.831 9.38104 10.4655 9.83 10.46C10.279 10.46 10.6445 10.821 10.65 11.27V14.27C10.6527 14.4883 10.5672 14.6985 10.4128 14.8528C10.2584 15.0072 10.0483 15.0927 9.83 15.09ZM13.83 15L15.5 11.72C15.5918 11.5225 15.6012 11.2965 15.5261 11.092C15.4511 10.8875 15.2978 10.7213 15.1 10.63C14.9066 10.5334 14.6826 10.5182 14.4778 10.5877C14.2731 10.6572 14.1047 10.8056 14.01 11L12.37 14.27C12.2338 14.522 12.2427 14.8277 12.3934 15.0713C12.5441 15.315 12.8137 15.4594 13.1 15.45C13.41 15.4541 13.6944 15.2788 13.83 15Z'
            fill='#6E6AF0'
          />
        </svg>
      ) : (
        <svg
          width='20'
          height='19'
          viewBox='0 0 20 19'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.4519 6.5758H16.9819C18.3719 6.5758 19.4119 8.1558 19.0719 9.8058L17.8519 16.4958C17.742 17.5996 16.8662 18.4713 15.7619 18.5758H3.98186C2.86196 18.4895 1.96473 17.6133 1.85186 16.4958L0.551856 9.7858C0.251856 8.1358 1.29186 6.5558 2.68186 6.5558H8.68186L4.31186 1.3458C4.13294 0.997789 4.22486 0.571849 4.53137 0.328587C4.83788 0.0853257 5.27356 0.0925345 5.57186 0.345803L10.1119 5.6958L14.1119 0.345803C14.2415 0.160453 14.4427 0.0377391 14.6668 0.00734923C14.8909 -0.0230406 15.1176 0.0416616 15.2919 0.185803C15.649 0.461841 15.7201 0.972743 15.4519 1.3358L11.4519 6.5758ZM16.2819 16.2058L17.5019 9.5158C17.5963 9.10803 17.5047 8.67936 17.2519 8.3458C17.1877 8.25583 17.0907 8.19475 16.9819 8.1758H2.72186C2.613 8.19475 2.51599 8.25583 2.45186 8.3458C2.19899 8.67936 2.1074 9.10803 2.20186 9.5158L3.42186 16.2058C3.50186 16.6758 3.78186 16.9458 3.94186 16.9458H15.7619C15.9219 16.9458 16.2019 16.6758 16.2819 16.2058Z'
            fill='#959BA3'
          />
          <path
            d='M10.1519 9.7658C9.69898 9.7658 9.33186 10.1329 9.33186 10.5858V13.5858C9.33733 14.0348 9.70286 14.3958 10.1519 14.3958C10.6047 14.3958 10.9719 14.0287 10.9719 13.5758V10.5758C10.9664 10.1268 10.6009 9.76577 10.1519 9.7658Z'
            fill='#959BA3'
          />
          <path
            d='M6.00186 10.3458C5.88996 10.0546 5.62254 9.85216 5.31193 9.82343C5.00132 9.79471 4.70131 9.94472 4.53792 10.2104C4.37453 10.4762 4.37605 10.8116 4.54186 11.0758L6.18186 14.3458C6.31745 14.6246 6.60189 14.7999 6.91186 14.7958C7.0366 14.7991 7.16024 14.7716 7.27186 14.7158C7.46691 14.6191 7.61552 14.4489 7.68493 14.2425C7.75433 14.0362 7.73884 13.8107 7.64186 13.6158L6.00186 10.3458Z'
            fill='#959BA3'
          />
          <path
            d='M15.4619 9.9258C15.2674 9.82602 15.0409 9.80904 14.8338 9.87871C14.6267 9.94839 14.4565 10.0988 14.3619 10.2958L12.7219 13.5658C12.6249 13.7607 12.6094 13.9862 12.6788 14.1925C12.7482 14.3989 12.8968 14.5691 13.0919 14.6658C13.2037 14.7209 13.3272 14.7483 13.4519 14.7458C13.7618 14.7499 14.0463 14.5746 14.1819 14.2958L15.8519 11.0258C15.9475 10.8284 15.96 10.601 15.8867 10.3943C15.8135 10.1876 15.6604 10.0189 15.4619 9.9258Z'
            fill='#959BA3'
          />
        </svg>
      )}
    </>
  );
};

export default ShopingBasketIcon;
