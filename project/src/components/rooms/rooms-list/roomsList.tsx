import { collection, DocumentData, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { GContext } from '../../..';
import { ALT_MENU_TYPES } from '../../../consts/altMenuTypes';
import { RoomInfoDocumentData } from '../../../types/DocumentData';
import AltContextMenu from '../../app/popups/altContextMenu/altContextMenu';
import RoomImage from './RoomImage/roomImage';
import PasswordPlate from '../../app/popups/passwordPlate/passwordPlate';
import { roomsFilter } from '../../../utils/roomsFilter';

type RoomsListType = {
  filterWord: string;
}
function RoomsList({filterWord}: RoomsListType): JSX.Element {

  const {database} = useContext(GContext);
  const [roomsList, setRoomsList] = useState<DocumentData[]>([]);
  const [filteredRoomsList, setFilteredRoomsList] = useState<RoomInfoDocumentData[]>([]);

  type PasswordMenuType = {
    isOpen: boolean;
    password: string;
    chatId: string;
  }
  const [passwordMenuState, setPasswordMenuState] = useState<PasswordMenuType>({
    isOpen: false,
    password: '',
    chatId: '',
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
    // return unsubscribe();
  }, [database]);

  useEffect(() => {
    if (filterWord) {
      setFilteredRoomsList(roomsFilter(roomsList as RoomInfoDocumentData[], filterWord));
    } else {
      setFilteredRoomsList(roomsList as RoomInfoDocumentData[]);
    }
  }, [filterWord, roomsList]);


  const joinClickHandler = (document: RoomInfoDocumentData) => {
    setPasswordMenuState((prev) => ({...prev, isOpen: true}));
    setPasswordMenuState((prev) => ({...prev, password: document.password}));
    setPasswordMenuState((prev) => ({...prev, chatId: document.chatId}));
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
      {filteredRoomsList.map((document) => (
        <li key={document.id}
          onContextMenu={(e) => RMCHandler(e, document)}
          className="list__room"
        >
          <div onClick={() => joinClickHandler(document)} className="room__content">
            <RoomImage chatId={document.chatId}/>
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
      <PasswordPlate
        password={passwordMenuState.password}
        closePasswordMenu={() => setPasswordMenuState((prev) => ({...prev, isOpen: false}))}
        chatId = {passwordMenuState.chatId}
        isOpen={passwordMenuState.isOpen}
      />
    </ul>
  );
}

export default RoomsList;
