import { collection, DocumentData, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { GContext } from '../../..';
import { ALT_MENU_TYPES } from '../../../consts/altMenuTypes';
import { RoomInfoDocumentData } from '../../../types/DocumentData';
import AltContextMenu from '../../app/popups/altContextMenu/altContextMenu';
import RoomImage from './RoomImage/roomImage';
import PasswordPlate from '../../app/popups/passwordPlate/passwordPlate';

function RoomsList(): JSX.Element {

  const {database} = useContext(GContext);
  const [roomsList, setRoomsList] = useState<DocumentData[]>([]);

  type PasswordMenuType = {
    isOpen: boolean;
    password: string;
  }
  const [passwordMenuState, setPasswordMenuState] = useState<PasswordMenuType>({
    isOpen: false,
    password: ''
  });

  type ContextMenuType = {
    isOpen: boolean;
    chatId: string;
    roomId: string;
    coords: {
      x: number;
      y: number;
    };
  }
  const [contextMenuState, setContextMenuState] = useState<ContextMenuType>({
    isOpen: false,
    roomId: '',
    chatId: '',
    coords: {x: 0, y: 0}
  });

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

  const joinClickHandler = (document: RoomInfoDocumentData) => {
    setPasswordMenuState((prev) => ({...prev, isOpen: true}));
    setPasswordMenuState((prev) => ({...prev, password: document.password}));
  };

  const RMCHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, document: RoomInfoDocumentData) => {
    e.preventDefault();
    setContextMenuState((prev) => ({...prev, isOpen: true}));
    setContextMenuState((prev) => ({...prev, coords: {
      x: e.clientX,
      y: e.clientY
    }}));
    setContextMenuState((prev) => ({...prev,
      roomId: document.id,
      chatId: document.chatId
    }));
  };

  return (
    <ul className="rooms__list">
      {roomsList.map((document) => (
        <li key={document.id as string}
          onContextMenu={(e) => RMCHandler(e, document as RoomInfoDocumentData)}
          className="list__room"
        >
          <div onClick={() => joinClickHandler(document as RoomInfoDocumentData)} className="room__content">
            <RoomImage chatId={document.chatId as string}/>
            <div className="room__middle-row">
              <h3 className="room-header">{document.title}</h3>
            </div>
          </div>
        </li>
      ))}
      {contextMenuState.isOpen ?
        <AltContextMenu
          contextMenuType={ALT_MENU_TYPES.roomContextMenu}
          contextMenuCoords={contextMenuState.coords}
          roomId={contextMenuState.roomId}
          chatId={contextMenuState.chatId}
          closeContextMenu={() => setContextMenuState((prev) => ({...prev, isOpen: false}))}
        />
        : false}
      {passwordMenuState.isOpen ?
        <PasswordPlate
          password={passwordMenuState.password}
          closePasswordMenu={() => setPasswordMenuState((prev) => ({...prev, isOpen: false}))}
          isOpen={passwordMenuState.isOpen}
        />
        : false}
    </ul>
  );
}

export default RoomsList;
