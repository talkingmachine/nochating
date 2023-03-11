import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useContext, useRef, FocusEvent } from 'react';
import { GContext } from '../../..';
import { useAppSelector } from '../../../hooks/useStoreSelectors';

function InputForm(): JSX.Element {

  const {database} = useContext(GContext);
  const input = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.user);

  const sendMessage = async (message:string) => {
    try {
      await addDoc(collection(database, 'chat/123', 'messages'), { // TODO change 123
        username: user.displayName,
        email: 'test-email',
        profilePicture : user.photoURL,
        message: message,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Error adding message: ', e);
    }
  };

  //-------------Handleres---
  const messageFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
    e.target.addEventListener('keydown', enterClickHandler);
  };
  const messageBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    e.target.removeEventListener('keydown', enterClickHandler);
  };
  //-------------Actions---
  const sendMessageClickHandler = () => {
    if (input.current && input.current.value !== '') {
      sendMessage(input.current.value);
      input.current.value = '';
    }
  };
  //-------------EventListeners---
  const enterClickHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessageClickHandler();
    }
  };

  return (
    <div className="chat__input-line">
      <input onFocus={messageFocusHandler} onBlur={messageBlurHandler} className="form__message" ref={input}/>
      <button onClick={sendMessageClickHandler} className="buttons-section__send">Send</button>
    </div>
  );
}

export default InputForm;
