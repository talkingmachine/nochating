import { collection, DocumentData, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { GContext } from '../../..';
import { ALT_MENU_TYPES } from '../../../consts/altMenuTypes';
import { useAppDispatch } from '../../../hooks/useStoreSelectors';
import { setCurrentRoomChatId, setCurrentRoomIsPasswordPlateOpened, setCurrentRoomPassword } from '../../../store/actions';
import { RoomInfoDocumentData } from '../../../types/DocumentData';
import AltContextMenu from '../../app/popups/altContextMenu/altContextMenu';
import RoomImage from './RoomImage/roomImage';

function RoomsList(): JSX.Element {

  const {database} = useContext(GContext);
  const [roomsList, setRoomsList] = useState<DocumentData[]>([]);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [contextMenuCoords, setContextMenuCoords] = useState<{x: number; y: number}>({x: 0, y: 0});
  const [contextMenuIds, setContextMenuIds] = useState<{roomId: string; chatId: string}>({ roomId: '', chatId: ''});

  const dispatch = useAppDispatch();

  useEffect(() => {
    const q = query(collection(database, 'rooms'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (querySnapshot) => { //const unsubscribe =
      const currentList: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        currentList.push({...doc.data(), id: doc.id});
      });
      setRoomsList(currentList);
    });
  }, [database]);

  const joinClickHandler = (document: DocumentData) => {
    dispatch(setCurrentRoomChatId(document.chatId as string));
    dispatch(setCurrentRoomPassword(document.password as string));
    dispatch(setCurrentRoomIsPasswordPlateOpened(true));
  };

  const RMCHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, document: RoomInfoDocumentData) => {
    e.preventDefault();
    setIsContextMenuOpen(true);
    setContextMenuIds({
      roomId: document.id,
      chatId: document.chatId
    });
    setContextMenuCoords({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <ul className="rooms__list">
      {roomsList.map((document) => (
        <li key={document.id as string}
          onContextMenu={(e) => RMCHandler(e, document as RoomInfoDocumentData)}
          className="list__room"
        >
          <div onClick={() => joinClickHandler(document)} className="room__content">
            <RoomImage chatId={document.chatId as string}/>
            <div className="room__middle-row">
              <h3 className="room-header">{document.title}</h3>
            </div>
          </div>

          {isContextMenuOpen ?
            <AltContextMenu
              contextMenuType={ALT_MENU_TYPES.roomContextMenu}
              contextMenuCoords={contextMenuCoords}
              roomId={contextMenuIds.roomId}
              chatId={contextMenuIds.chatId}
              closeContextMenu={() => setIsContextMenuOpen(false)}
            />
            : false}
        </li>
      ))}
    </ul>
  );
}

export default RoomsList;
