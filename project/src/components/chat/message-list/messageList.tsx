import { collection,DocumentData,onSnapshot, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { GContext } from '../../..';
import { ALT_MENU_TYPES } from '../../../consts/altMenuTypes';
import { useAppSelector } from '../../../hooks/useStoreSelectors';
import { MessageInfoDocumentData } from '../../../types/DocumentData';
import AltContextMenu from '../../app/popups/altContextMenu/altContextMenu';
import classNames from 'classnames';


function MessageList(): JSX.Element {
  const {database} = useContext(GContext);
  const chatId = useAppSelector((state) => state.currentRoomInfo.chatId);
  const user = useAppSelector((state) => state.user);
  const [messageList, setMessageList] = useState<MessageInfoDocumentData[]>([]);
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
      setMessageList(currentList as MessageInfoDocumentData[]);
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
    <ul className="chat__message-list">
      {messageList.map((document) => (
        <li
          key={document.id}
          onContextMenu={(e) => RMCHandler(e, document)}
          className={classNames('message', {'self-message': user.uid === document.authorID})}
        >
          <img src={document.profilePicture} alt="avatar" className="message__avatar"/>
          <div className="message__body">
            <div className="body__user-name">{document.username}</div>
            <span className="body__text">{document.message}</span>
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
  );
}

export default MessageList;
