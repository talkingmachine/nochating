
import { useEffect } from 'react';
import { memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentRoomChatId, setPasswordPlateInfo } from '../../../../store/actions';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useStoreSelectors';

function PasswordPlate(): JSX.Element {

  const passwordInput = useRef<HTMLInputElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const passwordPlateInfo = useAppSelector((state) => state.passwordPlateInfo);
  const closePasswordPlate = () => {
    dispatch(setPasswordPlateInfo({...passwordPlateInfo, isOpen: false}));
  };

  useEffect(() => {
    const removePasswordPlateWhenEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.removeEventListener('keydown', removePasswordPlateWhenEsc);
        window.removeEventListener('click', removePasswordPlateClick);
        window.removeEventListener('keydown', removePasswordPlateEnter);
        closePasswordPlate();
      }
    };
    const removePasswordPlateClick = (e: MouseEvent) => {
      if (e.target === backgroundRef.current) { // click outside the plate
        window.removeEventListener('keydown', removePasswordPlateWhenEsc);
        window.removeEventListener('click', removePasswordPlateClick);
        window.removeEventListener('keydown', removePasswordPlateEnter);
        closePasswordPlate();
      }
    };
    const removePasswordPlateEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        joinClickHandler();
        if (passwordInput.current && passwordInput.current.value === passwordPlateInfo.password) {
          window.removeEventListener('keydown', removePasswordPlateWhenEsc);
          window.removeEventListener('click', removePasswordPlateClick);
          window.removeEventListener('keydown', removePasswordPlateEnter);
          closePasswordPlate();
        }
      }
    };

    if (passwordPlateInfo.isOpen) {
      window.addEventListener('keydown', removePasswordPlateWhenEsc);
      window.addEventListener('click', removePasswordPlateClick); // otherwise closes immediately
      window.addEventListener('keydown', removePasswordPlateEnter);
    }
    if (!passwordPlateInfo.isOpen) {
      window.removeEventListener('click', removePasswordPlateClick);
      window.removeEventListener('keydown', removePasswordPlateWhenEsc);
      window.removeEventListener('keydown', removePasswordPlateEnter);
      if (passwordInput.current) {
        passwordInput.current.value = '';
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordPlateInfo.isOpen, passwordPlateInfo.password]);

  const exitButtonHandler = () => {
    closePasswordPlate();
  };

  const joinClickHandler = () => {
    if (passwordInput.current && passwordInput.current.value === passwordPlateInfo.password) {
      dispatch(setCurrentRoomChatId(passwordPlateInfo.chatId));
      navigate('/chat');
      closePasswordPlate();
    }
  };

  return (
    <div className="blur-wrapper" hidden={!passwordPlateInfo.isOpen} ref={backgroundRef}>
      <article className='popups__password-plate'>
        <span className="password-plate__title">Say the password</span>
        <button onClick={exitButtonHandler} className="exit">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M18 18L6 6" stroke="#CCCCCC" strokeWidth={2} strokeLinecap="round" /></svg>
        </button>
        <input type="text" className="password-plate__input" placeholder='Password:' autoFocus ref={passwordInput}/>
        <button onClick={joinClickHandler} className="password-plate__join">Join</button>
      </article>
    </div>
  );
}

export default memo(PasswordPlate);
