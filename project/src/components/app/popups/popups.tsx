import classNames from 'classnames';
import { memo, useRef } from 'react';
import { useAppSelector } from '../../../hooks/useStoreSelectors';
import AltContextMenu from './altContextMenu/altContextMenu';
import PasswordPlate from './passwordPlate/passwordPlate';

function Popups(): JSX.Element {

  const isPasswordPlateOpened = useAppSelector((state) => state.currentRoomInfo.isPasswordPlateOpened);
  const isAltContextMenuOpened = useAppSelector((state) => state.altContextMenu.isOpen);

  const background = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className={classNames('popups',{'back-blur': isPasswordPlateOpened})} hidden={!isPasswordPlateOpened} ref={background}>
        <PasswordPlate backgroundRef={background}/>
      </div>
      {isAltContextMenuOpened ? <AltContextMenu/> : false}
    </>
  );
}

export default memo(Popups);
