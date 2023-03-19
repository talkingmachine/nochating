
import classNames from 'classnames';
import { useEffect } from 'react';
import { memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useStoreSelectors';
import { setCurrentRoomIsPasswordPlateOpened } from '../../../../store/actions';

function PasswordPlate(): JSX.Element {

  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordPlate = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isPasswordPlateOpened = useAppSelector((state) => state.currentRoomInfo.isPasswordPlateOpened);
  const password = useAppSelector((state) => state.currentRoomInfo.password);

  useEffect(() => {
    const removePasswordPlateWhenEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.removeEventListener('keydown', removePasswordPlateWhenEsc);
        window.removeEventListener('click', removePasswordPlateClick);
        dispatch(setCurrentRoomIsPasswordPlateOpened(false));
      }
    };
    const removePasswordPlateClick = (e: MouseEvent) => {
      if (passwordPlate.current && !passwordPlate.current.contains(e.target as HTMLElement) && !passwordPlate.current.style.visibility === true) { // click outside the plate
        window.removeEventListener('keydown', removePasswordPlateWhenEsc);
        window.removeEventListener('click', removePasswordPlateClick);
        dispatch(setCurrentRoomIsPasswordPlateOpened(false));
      }
    };

    if (isPasswordPlateOpened) {
      window.addEventListener('keydown', removePasswordPlateWhenEsc);
      setTimeout(() => window.addEventListener('click', removePasswordPlateClick), 10); // otherwise closes immediately
    }
    if (!isPasswordPlateOpened) {
      window.removeEventListener('click', removePasswordPlateClick);
      window.removeEventListener('keydown', removePasswordPlateWhenEsc);

    }
  }, [dispatch, isPasswordPlateOpened]);

  const exitButtonHandler = () => {
    dispatch(setCurrentRoomIsPasswordPlateOpened(false));
  };

  const joinClickHandler = () => {
    if (passwordInput.current && passwordInput.current.value === password) {
      navigate('/chat');
    }
  };

  return (
    <article className={classNames('password-plate', {'shown': isPasswordPlateOpened})} ref={passwordPlate}>
      <span className="password-plate__title">Say the password</span>
      <button onClick={exitButtonHandler} className="exit">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M18 18L6 6" stroke="#CCCCCC" strokeWidth={2} strokeLinecap="round" /></svg>
      </button>
      <input type="text" className="password-plate__Plate" placeholder='Password:' ref={passwordInput}/>
      <button onClick={joinClickHandler} className="password-plate__join"><u>Join us</u></button>
    </article>
  );
}

export default memo(PasswordPlate);
