import { deleteDoc, doc } from 'firebase/firestore';
import { useContext } from 'react';
import { GContext } from '../../../..';
import { ALT_MENU_TYPES } from '../../../../consts/altMenuTypes';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useStoreSelectors';
import { setContextMenuIsOpen, setContextMenuType } from '../../../../store/actions';

function AltContextMenu(): JSX.Element {

  const {database} = useContext(GContext);
  const dispatch = useAppDispatch();
  const drawPosition = useAppSelector((state) => state.altContextMenu.coords);
  const contextMenuType = useAppSelector((state) => state.altContextMenu.menuType);
  const currentRoomId = useAppSelector((state) => state.currentRoomInfo.id);
  const currentChatId = useAppSelector((state) => state.currentRoomInfo.chatId);
  const style = {
    left: drawPosition.x,
    top: drawPosition.y,
  };

  const removeRoom = async (roomId: string, chatId: string) => {
    try {
      await deleteDoc(doc(database, 'chats', chatId));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Error removing chat message: ', e);
    }

    try {
      await deleteDoc(doc(database, 'rooms', roomId));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Error removing room message: ', e);
    }
  };


  const deleteClickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    switch (contextMenuType) {
      case ALT_MENU_TYPES.roomContextMenu:
        removeRoom(currentRoomId, currentChatId);
        break; /// TODO add more / default
    }
    dispatch(setContextMenuType(ALT_MENU_TYPES.undefinedType));
    dispatch(setContextMenuIsOpen(false));
  };

  return (
    <article className='alt-context-menu' style={style}>
      <ul className="context-menu__options">
        <li onClick={deleteClickHandler} className="options__delete">
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.39999 5.3998H21.6M8.39999 1.7998H15.6M9.59999 17.3998V10.1998M14.4 17.3998V10.1998M16.2 22.1998H7.79999C6.47451 22.1998 5.39999 21.1253 5.39999 19.7998L4.85208 6.64976C4.82367 5.96801 5.36869 5.3998 6.05103 5.3998H17.949C18.6313 5.3998 19.1763 5.96801 19.1479 6.64976L18.6 19.7998C18.6 21.1253 17.5255 22.1998 16.2 22.1998Z" stroke="#CCCCCC" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>Delete</span>
        </li>
      </ul>
    </article>
  );
}

export default AltContextMenu;
