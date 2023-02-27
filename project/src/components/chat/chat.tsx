import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ChangeEvent, FocusEvent, FormEvent, memo, useContext, useState } from 'react';
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
        message: message,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Error adding document: ', e);
    }
  };

  //-------------Handleres---
  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const messageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputLine(e.target.value);
    console.log(inputLine);
  };
  const messageFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
    e.target.addEventListener('keydown', enterClickHandler);
  };
  const messageBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    e.target.removeEventListener('keydown', enterClickHandler);
  };
  //-------------Actions---
  const sendMessageClickHandler = () => {
    console.log(inputLine);
    if (inputLine !== '') {
      sendMessage(inputLine);
      setInputLine('');
    }
  };
  //-------------EventListenerExpr---
  const enterClickHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessageClickHandler();
    }
  };

  return (
    <section className="chat wrapper">
      <MessageList/>
      <div className="chat__input-line">
        <form onSubmit={formSubmitHandler} className="input-line__form">
          <input onChange={messageChangeHandler} onFocus={messageFocusHandler} onBlur={messageBlurHandler} className="form__message" value={inputLine}/>
        </form>
        <button onClick={sendMessageClickHandler} className="buttons-section__send">Send</button>
      </div>

    </section>
  );
}

export default memo(Chat);
