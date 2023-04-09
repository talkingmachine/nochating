import classNames from 'classnames';
import { collection,DocumentData,onSnapshot, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect, useRef, useState } from 'react';
import { GContext } from '../../..';
import { ALT_MENU_TYPES } from '../../../consts/altMenuTypes';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStoreSelectors';
import { setContextMenuInfo } from '../../../store/actions';
import { MessageInfoDocumentData } from '../../../types/DocumentData';


function MessageList(): JSX.Element {
  const {database} = useContext(GContext);
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLUListElement>(null);
  const chatId = useAppSelector((state) => state.currentRoomInfo.chatId);
  const user = useAppSelector((state) => state.user);
  const contextMenuInfo = useAppSelector((state) => state.contextMenuInfo);
  const [messageList, setMessageList] = useState<MessageInfoDocumentData[]>([]);

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

  useEffect(() => {
    if (listRef.current) { // scroll to bottom when redraw
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messageList]);

  const RMCHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, document: MessageInfoDocumentData) => {
    e.preventDefault();
    dispatch(setContextMenuInfo({
      ...contextMenuInfo,
      isOpen: true,
      contextMenuType: ALT_MENU_TYPES.messageContextMenu,
      messageId: document.id,
      chatId: chatId,
      contextMenuCoords: {
        x: e.clientX,
        y: e.clientY
      }
    }));
  };


  return (
    <ul className="chat__message-list" ref={listRef}>
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
        </li>
      ))}
    </ul>
  );
}

export default MessageList;
