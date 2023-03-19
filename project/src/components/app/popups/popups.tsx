import { memo, useRef } from 'react';
import { useAppSelector } from '../../../hooks/useStoreSelectors';
import PasswordPlate from './passwordPlate/passwordPlate';

function Popups(): JSX.Element {

  const isPasswordPlateOpened = useAppSelector((state) => state.currentRoomInfo.isPasswordPlateOpened);
  const background = useRef<HTMLDivElement>(null);
  return (
    <div className='popups' hidden={!isPasswordPlateOpened} ref={background}>
      <PasswordPlate backgroundRef={background}/>
    </div>
  );
}

export default memo(Popups);
