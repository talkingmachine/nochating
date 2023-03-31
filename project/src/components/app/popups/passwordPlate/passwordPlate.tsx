
import { useEffect } from 'react';
import { memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type PasswordPlateProps = {
  password: string;
  closePasswordMenu: () => void;
  isOpen: boolean;
}
function PasswordPlate({password, closePasswordMenu, isOpen}: PasswordPlateProps): JSX.Element {

  const passwordInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const removePasswordPlateWhenEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.removeEventListener('keydown', removePasswordPlateWhenEsc);
        window.removeEventListener('click', removePasswordPlateClick);
      }
    };
    const removePasswordPlateClick = (e: MouseEvent) => {
      // if (backgroundRef.current && e.target === backgroundRef.current) { // click outside the plate
      //   window.removeEventListener('keydown', removePasswordPlateWhenEsc);
      //   window.removeEventListener('click', removePasswordPlateClick);
      //   dispatch(setCurrentRoomIsPasswordPlateOpened(false));
      // }
    };

    if (isOpen) {
      window.addEventListener('keydown', removePasswordPlateWhenEsc);
      window.addEventListener('click', removePasswordPlateClick); // otherwise closes immediately
    }
    if (!isOpen) {
      window.removeEventListener('click', removePasswordPlateClick);
      window.removeEventListener('keydown', removePasswordPlateWhenEsc);
      if (passwordInput.current) {
        passwordInput.current.value = '';
      }
    }
  }, [isOpen]);

  const exitButtonHandler = () => {
    closePasswordMenu();
  };

  const joinClickHandler = () => {
    if (passwordInput.current && passwordInput.current.value === password) {
      closePasswordMenu();
      navigate('/chat');
    }
  };

  return (
    <article className='password-plate'>
      <span className="password-plate__title">Say the password</span>
      <button onClick={exitButtonHandler} className="exit">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M18 18L6 6" stroke="#CCCCCC" strokeWidth={2} strokeLinecap="round" /></svg>
      </button>
      <input type="text" className="password-plate__input" placeholder='Password:' ref={passwordInput}/>
      <button onClick={joinClickHandler} className="password-plate__join"><u>Join us</u></button>
    </article>
  );
}

export default memo(PasswordPlate);
