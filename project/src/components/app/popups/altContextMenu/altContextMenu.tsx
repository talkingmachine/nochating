import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useContext, useEffect, useRef } from 'react';
import { GContext } from '../../../..';
import { ALT_MENU_TYPES } from '../../../../consts/altMenuTypes';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useStoreSelectors';
import { setContextMenuInfo } from '../../../../store/actions';

function AltContextMenu(): JSX.Element {

  const {database, storage} = useContext(GContext);
  const dispatch = useAppDispatch();
  const contextMenuInfo = useAppSelector((state) => state.contextMenuInfo);
  const contextMenuRef = useRef(null);
  const style = {
    left: contextMenuInfo.contextMenuCoords.x,
    top: contextMenuInfo.contextMenuCoords.y,
  };

  const removePasswordPlateClick = (e: MouseEvent) => {
    if (e.target !== contextMenuRef.current) {
      window.removeEventListener('click', removePasswordPlateClick);
      dispatch(setContextMenuInfo({...contextMenuInfo, isOpen: false}));
    }
  };
  useEffect(()=>{
    window.addEventListener('click', removePasswordPlateClick);
  });

  const removeRoom = async (currentRoomId: string) => {
    try {
      await deleteDoc(doc(database, 'chats', contextMenuInfo.chatId));
    } catch (e) {
      // TODO say something
    }
    try {
      await deleteDoc(doc(database, 'rooms', currentRoomId));
    } catch (e) {
      // TODO say something
    }
    try {
      await deleteObject(ref(storage, `img/room-image/${contextMenuInfo.chatId}`));
    } catch (e) {
      // TODO say something
    }
  };

  const removeMessage = async (currentMessageId: string) => {
    try {
      await deleteDoc(doc(database, 'chats', contextMenuInfo.chatId, 'messages', currentMessageId));
    } catch (e) {
      // TODO say something
    }
  };

  const deleteClickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    switch (contextMenuInfo.contextMenuType) {
      case ALT_MENU_TYPES.roomContextMenu:
        dispatch(setContextMenuInfo({...contextMenuInfo, isOpen: false}));
        removeRoom(contextMenuInfo.roomId);
        break;
      case ALT_MENU_TYPES.messageContextMenu:
        dispatch(setContextMenuInfo({...contextMenuInfo, isOpen: false}));
        removeMessage(contextMenuInfo.messageId);
        break;
    }
  };
  return (
    <article className='alt-context-menu' style={style} ref={contextMenuRef}>
      <ul className="context-menu__options">
        <li onClick={deleteClickHandler} className="options__delete">
          {/* <svg width={15} height={15} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.39999 5.3998H21.6M8.39999 1.7998H15.6M9.59999 17.3998V10.1998M14.4 17.3998V10.1998M16.2 22.1998H7.79999C6.47451 22.1998 5.39999 21.1253 5.39999 19.7998L4.85208 6.64976C4.82367 5.96801 5.36869 5.3998 6.05103 5.3998H17.949C18.6313 5.3998 19.1763 5.96801 19.1479 6.64976L18.6 19.7998C18.6 21.1253 17.5255 22.1998 16.2 22.1998Z" stroke="#CCCCCC" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg> */}
          <span>Delete</span>
        </li>
      </ul>
    </article>
  );
}

export default AltContextMenu;
