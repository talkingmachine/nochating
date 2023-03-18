import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { FormEvent, memo, useContext, useState } from 'react';
import { GContext } from '../../..';
import { useAppSelector } from '../../../hooks/useStoreSelectors';

function NewRoom(): JSX.Element {

  const {database} = useContext(GContext);
  const user = useAppSelector((state) => state.user);
  type FormDataType = {
    [field: string]: string;
  }
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    picture : '/image.jpg', // TODO Mockpicture add
    password: '',
    passwordView: ''
  });

  const addRoom = async (chatId:string) => {
    try {
      await addDoc(collection(database, 'rooms'), {
        title: formData.title,
        password: formData.password,
        picture : formData.picture,
        owner: user.uid,
        chatId: chatId,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Error adding room: ', e);
    }
  };

  const addChat = async (chatId: string) => {
    try {
      await setDoc(doc(database, 'chats', chatId), {});
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Error adding message: ', e);
    }
  };


  const titleChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const {value} = e.target as HTMLInputElement;
    setFormData({...formData, title: value});
  };
  const passwordChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const {value} = e.target as HTMLInputElement;
    setFormData({...formData, password: value});
  };

  const newRoomCreateHandler = () => {
    const currentRoomId = nanoid();
    addRoom(currentRoomId);
    addChat(currentRoomId); // TODO - add toast if success
  };

  return (
    <div className="room__new-room">
      <form className="new-room__form" autoComplete='Off'>
        <input type="image" alt ="insert picture" className="form__picture" />
        <div className="form__wrapper">
          <label className="form__title" >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8 19.5514H19.8M4.20007 19.5514L8.56606 18.6717C8.79784 18.625 9.01065 18.5109 9.17779 18.3437L18.9515 8.56461C19.4201 8.09576 19.4197 7.33577 18.9508 6.86731L16.8803 4.79923C16.4115 4.33097 15.6519 4.33129 15.1835 4.79995L5.40884 14.58C5.24202 14.7469 5.12812 14.9593 5.08138 15.1906L4.20007 19.5514Z" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
            <input onChange={titleChangeHandler} type="text" placeholder="Title:" value={formData.title} />
          </label>
          <label className="form__password">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.60005 8.7999V7.88562C6.60005 4.84671 9.00862 2.3999 12 2.3999C14.9915 2.3999 17.4001 4.84671 17.4001 7.88562V8.7999M6.60005 8.7999C5.61005 8.7999 4.80005 9.62276 4.80005 10.6285V19.7713C4.80005 20.777 5.61005 21.5999 6.60005 21.5999H17.4001C18.3901 21.5999 19.2001 20.777 19.2001 19.7713V10.6285C19.2001 9.62276 18.3901 8.7999 17.4001 8.7999M6.60005 8.7999H17.4001M12 16.1999V13.7999" stroke="white" strokeWidth={2} strokeLinecap="round" /></svg>
            <input onChange={passwordChangeHandler} type="text" placeholder="Password:" value={formData.password} />
          </label>
        </div>
      </form>
      <button onClick={newRoomCreateHandler} className="new-room__accept"><u>Create</u></button>
    </div>
  );
}

export default memo(NewRoom);
