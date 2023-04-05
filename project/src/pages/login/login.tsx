import { useContext, useState } from 'react';
import { GContext } from '../..';
import { useAppDispatch } from '../../hooks/useStoreSelectors';
import { UserType } from '../../types/User';
import { setUser } from '../../store/actions';
import { USER_INFO } from '../../consts/constUserInfo';
import { useNavigate } from 'react-router-dom';

function Login(): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {signIn} = useContext(GContext);
  const [userInfo, setUserInfo] = useState<UserType>(USER_INFO);
  const signInClickHandler = () => {

    signIn().then((result) => {
      const user: UserType = {
        displayName: result.user.displayName ? result.user.displayName : USER_INFO.displayName,
        photoURL: result.user.photoURL ? result.user.photoURL : USER_INFO.photoURL,
        uid: result.user.photoURL ? result.user.uid : USER_INFO.uid,
      };
      if (user.photoURL && user.displayName) {
        setUserInfo(user);
        dispatch(setUser(user));
      }
      navigate('/chat');
    });
  };

  return (
    <section className="content__login">
      <div onClick={signInClickHandler} className="login__userinfo">
        <img src={userInfo.photoURL ? userInfo.photoURL : 'img/user-avatar1.jpg'} alt="user avatar"/>
        <span>{userInfo.displayName}</span>
      </div>
    </section>
  );
}

export default Login;

