
import { Dispatch, SetStateAction, useEffect } from 'react';
import { memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type PasswordPlateProps = {
  setIsPasswordPlateOpened: Dispatch<SetStateAction<boolean>>;
  password: string; // stupid but ok
}
function PasswordPlate({setIsPasswordPlateOpened, password} :PasswordPlateProps): JSX.Element {

  const passwordPlate = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const removePasswordPlateWhenEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPasswordPlateOpened(false);
        window.removeEventListener('keydown', removePasswordPlateWhenEsc);
        window.removeEventListener('click', removePasswordPlateClick);
      }
    };
    const removePasswordPlateClick = (e: MouseEvent) => {
      if (passwordPlate.current && !passwordPlate.current.contains(e.target as HTMLElement)) { // click outside the plate
        window.removeEventListener('keydown', removePasswordPlateWhenEsc);
        window.removeEventListener('click', removePasswordPlateClick);
        setIsPasswordPlateOpened(false);
      }
    };
    window.addEventListener('keydown', removePasswordPlateWhenEsc);
    setTimeout(() => window.addEventListener('click', removePasswordPlateClick), 200); // otherwise closes immediately
    return () => {
      window.removeEventListener('keydown', removePasswordPlateWhenEsc);
      window.removeEventListener('click', removePasswordPlateClick);
    };
  }, [setIsPasswordPlateOpened]);

  const exitButtonHandler = () => {
    setIsPasswordPlateOpened(false);
  };

  const joinClickHandler = () => {
    if (passwordPlate.current && passwordPlate.current.value === password) {
      navigate('/chat');
    }
  };

  return (
    <article className="password-plate">
      <span className="password-plate__title">Say the password</span>
      <button onClick={exitButtonHandler} className="exit">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M18 18L6 6" stroke="#CCCCCC" strokeWidth={2} strokeLinecap="round" /></svg>
      </button>
      <input type="text" className="password-plate__Plate" placeholder='Password:' ref={passwordPlate}/>
      <button onClick={joinClickHandler} className="password-plate__join"><u>Join us</u></button>
    </article>
  );
}

export default memo(PasswordPlate);
