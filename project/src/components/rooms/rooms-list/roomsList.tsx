import { collection, DocumentData, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { memo, useContext, useEffect, useState } from 'react';
import { GContext } from '../../..';
import { ALT_MENU_TYPES } from '../../../consts/altMenuTypes';
import { RoomInfoDocumentData } from '../../../types/DocumentData';
import RoomImage from './RoomImage/roomImage';
import { roomsFilter } from '../../../utils/roomsFilter';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStoreSelectors';
import { isAuthorized } from '../../../utils/isAuthorized';
import { useNavigate } from 'react-router-dom';
import { setContextMenuInfo, setCurrentRoomChatId, setOnTop, setPasswordPlateInfo } from '../../../store/actions';

type RoomsListType = {
  filterWord: string;
}
function RoomsList({filterWord}: RoomsListType): JSX.Element {

  const {database} = useContext(GContext);
  const user = useAppSelector((state) => state.user);
  const currentChatId = useAppSelector((state) => state.currentRoomInfo.chatId);
  const contextMenuInfo = useAppSelector((state) => state.contextMenuInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [roomsList, setRoomsList] = useState<DocumentData[]>([]);
  const [filteredRoomsList, setFilteredRoomsList] = useState<RoomInfoDocumentData[]>([]);

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
    if (isAuthorized(user)) {
      if (!document.password) { // join immediately if no password
        dispatch(setCurrentRoomChatId(document.chatId));
        dispatch(setOnTop(false));
        navigate('/chat');
        return;
      }
      if (document.chatId === currentChatId) { // reject trying to join current chat
        return;
      }
      dispatch(setPasswordPlateInfo({
        password: document.password,
        chatId: document.chatId,
        isOpen: true,
      }));
    } else {
      // TODO say something
    }
  };

  const RMCHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, document: RoomInfoDocumentData) => {
    e.preventDefault();
    dispatch(setContextMenuInfo({
      ...contextMenuInfo,
      isOpen: true,
      contextMenuType: ALT_MENU_TYPES.roomContextMenu,
      chatId: document.chatId,
      contextMenuCoords: {
        x: e.clientX,
        y: e.clientY
      },
      roomId: document.id
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
    </ul>
  );
}

export default memo(RoomsList);
