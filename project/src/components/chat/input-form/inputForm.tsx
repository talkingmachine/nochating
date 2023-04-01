import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useContext, useRef, FocusEvent } from 'react';
import { GContext } from '../../..';
import { useAppSelector } from '../../../hooks/useStoreSelectors';

function InputForm(): JSX.Element {

  const {database} = useContext(GContext);
  const chatId = useAppSelector((state) => state.currentRoomInfo.chatId);
  const input = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.user);

  const sendMessage = async (message:string) => {
    try {
      await addDoc(collection(database, `chats/${chatId}`, 'messages'), {
        username: user.displayName,
        email: 'test-email',
        profilePicture: user.photoURL,
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
      <button onClick={sendMessageClickHandler} className="buttons-section__clip">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.957 11.5048L11.9116 18.5503C9.99398 20.4679 7.11804 20.6943 5.16289 18.7392C3.24527 16.8216 3.4945 14.0435 5.44965 12.0883L13.3695 4.1685C14.5816 2.95638 16.533 2.95638 17.7451 4.16849C18.9572 5.38061 18.9572 7.33201 17.7451 8.54413L9.68621 16.603C9.08206 17.2072 8.10255 17.2072 7.4984 16.603C6.89425 15.9989 6.89425 15.0193 7.4984 14.4152L14.6829 7.23069" stroke="#CCCCCC" strokeWidth={2} strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}

export default InputForm;
