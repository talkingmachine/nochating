
import { useEffect } from 'react';
import { memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentRoomChatId } from '../../../../store/actions';
import { useAppDispatch } from '../../../../hooks/useStoreSelectors';

type PasswordPlateProps = {
  password: string;
  closePasswordMenu: () => void;
  chatId: string;
  isOpen: boolean;
}
function PasswordPlate({password, closePasswordMenu, chatId, isOpen}: PasswordPlateProps): JSX.Element {

  const passwordInput = useRef<HTMLInputElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const removePasswordPlateWhenEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.removeEventListener('keydown', removePasswordPlateWhenEsc);
        window.removeEventListener('click', removePasswordPlateClick);
        window.removeEventListener('keydown', removePasswordPlateEnter);
        closePasswordMenu();
      }
    };
    const removePasswordPlateClick = (e: MouseEvent) => {
      if (e.target === backgroundRef.current) { // click outside the plate
        window.removeEventListener('keydown', removePasswordPlateWhenEsc);
        window.removeEventListener('click', removePasswordPlateClick);
        window.removeEventListener('keydown', removePasswordPlateEnter);
        closePasswordMenu();
      }
    };
    const removePasswordPlateEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        joinClickHandler();
        if (passwordInput.current && passwordInput.current.value === password) {
          window.removeEventListener('keydown', removePasswordPlateWhenEsc);
          window.removeEventListener('click', removePasswordPlateClick);
          window.removeEventListener('keydown', removePasswordPlateEnter);
          closePasswordMenu();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', removePasswordPlateWhenEsc);
      window.addEventListener('click', removePasswordPlateClick); // otherwise closes immediately
      window.addEventListener('keydown', removePasswordPlateEnter);
    }
    if (!isOpen) {
      window.removeEventListener('click', removePasswordPlateClick);
      window.removeEventListener('keydown', removePasswordPlateWhenEsc);
      window.removeEventListener('keydown', removePasswordPlateEnter);
      if (passwordInput.current) {
        passwordInput.current.value = '';
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closePasswordMenu, isOpen, password]);

  const exitButtonHandler = () => {
    closePasswordMenu();
  };

  const joinClickHandler = () => {
    if (passwordInput.current && passwordInput.current.value === password) {
      dispatch(setCurrentRoomChatId(chatId));
      navigate('/chat');
      closePasswordMenu();
    }
  };

  return (
    <div className="blur-wrapper" hidden={!isOpen} ref={backgroundRef}>
      <article className='password-plate'>
        <span className="password-plate__title">Say the password</span>
        <button onClick={exitButtonHandler} className="exit">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M18 18L6 6" stroke="#CCCCCC" strokeWidth={2} strokeLinecap="round" /></svg>
        </button>
        <input type="text" className="password-plate__input" placeholder='Password:' ref={passwordInput}/>
        <button onClick={joinClickHandler} className="password-plate__join">Join us</button>
      </article>
    </div>
  );
}

export default memo(PasswordPlate);
