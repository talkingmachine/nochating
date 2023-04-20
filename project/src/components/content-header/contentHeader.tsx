import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreSelectors';
import { setOnTop } from '../../store/actions';
import { isAuthorized } from '../../utils/isAuthorized';

function ContentHeader(): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const asideOnTop = useAppSelector((state) => state.onTop);
  const userInfoClickHandler = () => {
    dispatch(setOnTop(false));
    navigate('/');
  };

  const backArrowHandler = () => {
    dispatch(setOnTop(true));
  };

  return (
    <section className="content__header">
      {!asideOnTop && isAuthorized(user) ?
        <button onClick={backArrowHandler} className="header__to-chats">
          <svg width={35} height={35} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5247 16.8828C10.8782 17.3071 11.5088 17.3644 11.9331 17.0108C12.3573 16.6573 12.4147 16.0267 12.0611 15.6024L10.5247 16.8828ZM7.75732 11.9999L6.9891 11.3597C6.68006 11.7306 6.68006 12.2693 6.9891 12.6401L7.75732 11.9999ZM12.0611 8.39745C12.4147 7.97317 12.3573 7.3426 11.9331 6.98904C11.5088 6.63548 10.8782 6.6928 10.5247 7.11708L12.0611 8.39745ZM16.2427 12.9999C16.7949 12.9999 17.2427 12.5522 17.2427 11.9999C17.2427 11.4476 16.7949 10.9999 16.2427 10.9999V12.9999ZM12.0611 15.6024L8.52554 11.3597L6.9891 12.6401L10.5247 16.8828L12.0611 15.6024ZM8.52554 12.6401L12.0611 8.39745L10.5247 7.11708L6.9891 11.3597L8.52554 12.6401ZM7.75732 12.9999H16.2427V10.9999H7.75732V12.9999ZM5.91891 5.91878C9.27741 2.56028 14.7226 2.56028 18.0811 5.91878L19.4954 4.50457C15.3558 0.365013 8.64425 0.365013 4.50469 4.50457L5.91891 5.91878ZM18.0811 5.91878C21.4396 9.27729 21.4396 14.7225 18.0811 18.081L19.4954 19.4952C23.6349 15.3557 23.6349 8.64413 19.4954 4.50457L18.0811 5.91878ZM18.0811 18.081C14.7226 21.4395 9.27741 21.4395 5.91891 18.081L4.50469 19.4952C8.64425 23.6348 15.3558 23.6348 19.4954 19.4952L18.0811 18.081ZM5.91891 18.081C2.5604 14.7225 2.5604 9.27729 5.91891 5.91878L4.50469 4.50457C0.365135 8.64413 0.365135 15.3557 4.50469 19.4952L5.91891 18.081Z" fill="#5e5670" /></svg>
        </button>
        : false}
      <div onClick={userInfoClickHandler} className="header__userinfo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 991 254"><path d="M245.41,254H991V0H0L203.36,234.79A55.63,55.63,0,0,0,245.41,254Z"/></svg>
        <span>{user.displayName}</span>
        <img src={user.photoURL ? user.photoURL : 'img/user-avatar1.jpg'} alt="user avatar"/>
      </div>
    </section>
  );
}

export default ContentHeader;
