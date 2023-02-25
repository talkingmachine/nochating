import { collection,DocumentData,onSnapshot, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { GContext } from '../..';

function MessageList(): JSX.Element {

  const {database} = useContext(GContext);
  const [messageList, setMessageList] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = query(collection(database, 'messages'));
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
    <div className="messenger__message-list">
      {messageList.map((document)=> (
        <div key={document.id as string} className="message">
          {document.message}
        </div>
      ))}
    </div>
  );
}

export default MessageList;
