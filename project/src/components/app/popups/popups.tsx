import { memo } from 'react';
import { useAppSelector } from '../../../hooks/useStoreSelectors';
import PasswordPlate from './passwordPlate/passwordPlate';

function Popups(): JSX.Element {

  const isPasswordPlateOpened = useAppSelector((state) => state.currentRoomInfo.isPasswordPlateOpened);
  return (
    <div className='popups' hidden={!isPasswordPlateOpened}>
      <PasswordPlate/>
    </div>
  );
}

export default memo(Popups);
