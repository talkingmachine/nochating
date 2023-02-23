import { addDoc, collection } from 'firebase/firestore';
import { ChangeEvent, memo, useContext, useState } from 'react';
import { GContext } from '../..';
import MessageList from '../message-list/message-list';

function Chat(): JSX.Element {

  const {database} = useContext(GContext);
  const [inputLine, setInputLine] = useState<string>('');

  const sendMessage = async (message:string) => {
    try {
      await addDoc(collection(database, 'messages'), {
        username: 'test-user',
        email: 'test-email',
        profilePicture : 'text-imageUrl',
        message: message
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Error adding document: ', e);
    }
  };


  const sendMessageClickHandler = () => {
    sendMessage(inputLine);
    setInputLine('');
  };

  const messageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputLine(e.target.value);
  };

  return (
    <section className="messenger wrapper">
      <MessageList/>
      <div className="messenger__input-line">
        <form action='' className="input-line__form">
          <input onChange={messageChangeHandler} className="form__message" value={inputLine}/>
        </form>
      </div>
      <div className="messenger__buttons-section">
        <button onClick={sendMessageClickHandler} className="buttons-section__send">Send</button>
      </div>
    </section>
  );
}

export default memo(Chat);
