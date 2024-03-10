type ChatIconProps = {
  isActive?: boolean;
};

const ChatIcon = ({ isActive }: ChatIconProps) => {
  return (
    <>
      {isActive ? (
        <svg
          width='21'
          height='20'
          viewBox='0 0 21 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16.0617 0H4.94174C2.42064 0.086985 0.439921 2.18816 0.501744 4.71V18.44C0.475929 18.9013 0.73859 19.3304 1.16118 19.5172C1.58377 19.7041 2.0779 19.6096 2.40174 19.28L4.77174 16.75C5.22329 16.2764 5.84739 16.0058 6.50175 16H16.0217C17.2508 15.9688 18.4163 15.4468 19.258 14.5507C20.0997 13.6545 20.5476 12.4586 20.5017 11.23V4.71C20.5636 2.18816 18.5828 0.086985 16.0617 0ZM6.75174 5.22H11.7517C12.166 5.22 12.5017 5.55579 12.5017 5.97C12.5017 6.38421 12.166 6.72 11.7517 6.72H6.75174C6.33753 6.72 6.00174 6.38421 6.00174 5.97C6.00174 5.55579 6.33753 5.22 6.75174 5.22ZM6.75174 10.72H14.2517C14.666 10.72 15.0017 10.3842 15.0017 9.97C15.0017 9.55579 14.666 9.22 14.2517 9.22H6.75174C6.33753 9.22 6.00174 9.55579 6.00174 9.97C6.00174 10.3842 6.33753 10.72 6.75174 10.72Z'
            fill='#6E6AF0'
          />
        </svg>
      ) : (
        <svg
          width='21'
          height='20'
          viewBox='0 0 21 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.94226 0H16.0623C18.5954 0.0869407 20.5809 2.2066 20.5023 4.74V11.26C20.5399 12.4835 20.0883 13.6716 19.2475 14.5612C18.4067 15.4508 17.246 15.9686 16.0223 16H6.50226C5.84345 16.0136 5.21868 16.2953 4.77226 16.78L2.40226 19.31C2.20147 19.529 1.91933 19.6556 1.62226 19.66C1.31544 19.6522 1.02447 19.522 0.814118 19.2985C0.603766 19.075 0.491482 18.7767 0.502257 18.47V4.74C0.423625 2.2066 2.40913 0.0869407 4.94226 0ZM16.0623 14.5C17.7672 14.4137 19.0815 12.9653 19.0023 11.26V4.74C19.0815 3.03472 17.7672 1.58627 16.0623 1.5H4.94225C3.23731 1.58627 1.92298 3.03472 2.00225 4.74V17.54L3.63225 15.76C4.37768 14.9671 5.41401 14.5121 6.50225 14.5H16.0623Z'
            fill='#959BA3'
          />
          <path
            d='M6.75225 6.75H11.7523C12.1665 6.75 12.5023 6.41421 12.5023 6C12.5023 5.58579 12.1665 5.25 11.7523 5.25H6.75225C6.33804 5.25 6.00225 5.58579 6.00225 6C6.00225 6.41421 6.33804 6.75 6.75225 6.75Z'
            fill='#959BA3'
          />
          <path
            d='M14.2523 9.25H6.75225C6.33804 9.25 6.00225 9.58579 6.00225 10C6.00225 10.4142 6.33804 10.75 6.75225 10.75H14.2523C14.6665 10.75 15.0023 10.4142 15.0023 10C15.0023 9.58579 14.6665 9.25 14.2523 9.25Z'
            fill='#959BA3'
          />
        </svg>
      )}
    </>
  );
};

export default ChatIcon;