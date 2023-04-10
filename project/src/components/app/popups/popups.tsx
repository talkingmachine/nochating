import { useAppSelector } from '../../../hooks/useStoreSelectors';
import AltContextMenu from './altContextMenu/altContextMenu';
import NewRoom from './newRoom/newRoom';
import PasswordPlate from './passwordPlate/passwordPlate';
import WarningMessage from './warningMessage/warningMessage';

function Popups(): JSX.Element {
  const passwordPlateIsOpen = useAppSelector((state) => state.passwordPlateInfo.isOpen);
  const newRoomIsOpen = useAppSelector((state) => state.newRoomInfo.isOpen);
  const contextMenuIsOpen = useAppSelector((state) => state.contextMenuInfo.isOpen);
  const warningMessageIsOpen = useAppSelector((state) => state.warningMessageInfo.isOpen);


  return (
    <>
      {passwordPlateIsOpen ? <PasswordPlate/> : false}
      {newRoomIsOpen ? <NewRoom/> : false}
      {contextMenuIsOpen ? <AltContextMenu /> : false}
      {warningMessageIsOpen ? <WarningMessage /> : false}
    </>
  );
}

export default Popups;
