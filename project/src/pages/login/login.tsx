import { useContext } from 'react';
import { GContext } from '../..';
import { USER_INFO } from '../../consts/constUserInfo';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_NAMES } from '../../consts/localStorageNames';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreSelectors';
import { setCurrentRoomChatId, setUser } from '../../store/actions';
import { uploadStorageInfo } from '../../utils/uploadStorageInfo';
import { isAuthorized } from '../../utils/isAuthorized';


function Login(): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const {signIn, logOut} = useContext(GContext);
  const signInClickHandler = () => {
    signIn().then((result) => {
      localStorage.setItem(
        LOCAL_STORAGE_NAMES.userDisplayName,
        result.user.displayName ? result.user.displayName : USER_INFO.displayName
      );
      localStorage.setItem(
        LOCAL_STORAGE_NAMES.userPhotoURL,
        result.user.photoURL ? result.user.photoURL : USER_INFO.photoURL
      );
      localStorage.setItem(
        LOCAL_STORAGE_NAMES.userUID,
        result.user.photoURL ? result.user.uid : USER_INFO.uid,
      );

      dispatch(setUser(uploadStorageInfo()));
    }).catch(
      // TODO say something
    );
  };
  const toChatsClickHandler = () => {
    if (isAuthorized(userInfo)) {
      navigate('/chat');
    }
  };
  const signOutClickHandler = () => {
    logOut().then(() => {
      localStorage.setItem(
        LOCAL_STORAGE_NAMES.userDisplayName,
        USER_INFO.displayName
      );
      localStorage.setItem(
        LOCAL_STORAGE_NAMES.userPhotoURL,
        USER_INFO.photoURL
      );
      localStorage.setItem(
        LOCAL_STORAGE_NAMES.userUID,
        USER_INFO.uid,
      );
      dispatch(setUser(uploadStorageInfo()));
      dispatch(setCurrentRoomChatId(''));
    });
  };

  return (
    <section className="content__login">
      <div onClick={signInClickHandler} className="login__userinfo">
        <img src={userInfo.photoURL} alt="user avatar"/>
        <span>{userInfo.displayName}</span>
      </div>
      <div className="login__buttons">
        <button onClick={toChatsClickHandler} className="buttons__to-chats" hidden={!isAuthorized(userInfo)}>To chats ➤</button>
        <button onClick={signOutClickHandler} className="buttons__logout" hidden={!isAuthorized(userInfo)}>Logout</button>
      </div>
    </section>
  );
}

export default Login;

