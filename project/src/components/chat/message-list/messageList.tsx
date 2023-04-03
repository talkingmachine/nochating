import { collection,DocumentData,onSnapshot, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { GContext } from '../../..';
import { ALT_MENU_TYPES } from '../../../consts/altMenuTypes';
import { useAppSelector } from '../../../hooks/useStoreSelectors';
import { MessageInfoDocumentData } from '../../../types/DocumentData';
import AltContextMenu from '../../app/popups/altContextMenu/altContextMenu';


function MessageList(): JSX.Element {
  const {database} = useContext(GContext);
  const chatId = useAppSelector((state) => state.currentRoomInfo.chatId);
  const [messageList, setMessageList] = useState<DocumentData[]>([]);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>();
  const [contextMenuCoords, setContextMenuCoords] = useState<{x: number; y: number}>({x: 0, y: 0});
  const [contextMenuIds, setContextMenuIds] = useState<{messageId: string}>({ messageId: ''});

  useEffect(() => {
    const q = query(collection(database, `chats/${chatId}`, 'messages'), orderBy('createdAt'));
    onSnapshot(q, (querySnapshot) => { //const unsubscribe =
      const currentList: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        currentList.push({...doc.data(), id: doc.id});
      });
      setMessageList(currentList);
    });
  }, [chatId, database]);

  const RMCHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, document: MessageInfoDocumentData) => {
    e.preventDefault();
    setIsContextMenuOpen(true);
    setContextMenuIds({
      messageId: document.id
    });
    setContextMenuCoords({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div className='message-list__wrapper'>
      <ul className="chat__message-list">
        {messageList.map((document) => (
          <li key={document.id as string} onContextMenu={(e) => RMCHandler(e, document as MessageInfoDocumentData)} className="message self-message">
            <img src={document.profilePicture as string} alt="avatar" className="message__avatar"/>
            <div className="message__body">
              <div className="body__user-name">{document.username}</div>
              <div className="body__text">{document.message}</div>
            </div>
            {isContextMenuOpen ?
              <AltContextMenu
                contextMenuType={ALT_MENU_TYPES.messageContextMenu}
                contextMenuCoords={contextMenuCoords}
                messageId={contextMenuIds.messageId}
                chatId={chatId}
                closeContextMenu={() => setIsContextMenuOpen(false)}
              />
              : false}
          </li>
        ))}
      </ul>
    </div>

  );
}

export default MessageList;
