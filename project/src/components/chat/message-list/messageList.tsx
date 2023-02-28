import { collection,DocumentData,onSnapshot, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { GContext } from '../../..';
import { useAppSelector } from '../../../hooks/useStoreSelectors';

function MessageList(): JSX.Element {
  const {database} = useContext(GContext);
  const [messageList, setMessageList] = useState<DocumentData[]>([]);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const q = query(collection(database, 'messages'), orderBy('createdAt'));
    onSnapshot(q, (querySnapshot) => { //const unsubscribe =
      const currentList: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        currentList.push({...doc.data(), id: doc.id});
        //console.log({...doc.data(), id: doc.id});
      });
      setMessageList(currentList);
    });
  }, [database]);

  return (
    <div className="chat__message-list">
      {messageList.map((document) => (
        <div key={document.id as string} className="message self-message">
          <img src={document.profilePicture} alt="avatar" className="message__avatar" />
          <div className="message__body">
            <div className="body__user-name">{document.username}</div>
            <div className="body__text">{document.message}</div>
          </div>

        </div>
      ))}
    </div>
  );
}

export default MessageList;
