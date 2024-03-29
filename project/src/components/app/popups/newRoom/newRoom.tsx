import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { GContext } from '../../../..';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useStoreSelectors';
import { ROOM_INFO } from '../../../../consts/constUserInfo';
import { GLOBAL_CONSTS } from '../../../../consts/globalConsts';
import { setNewRoomInfo } from '../../../../store/actions';


function NewRoom(): JSX.Element {

  const {database, storage} = useContext(GContext);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const newRoomInfo = useAppSelector((state) => state.newRoomInfo);
  const [currentRoomImage, setCurrentRoomImage] = useState<File>();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);

  type FormDataType = {
    [field: string]: string;
  }
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    picture : ROOM_INFO.formDefaultPicture, // TODO Mockpicture add
    password: '',
    passwordView: '',
  });

  useEffect(() => {
    const removeNewRoomPlateWhenEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.removeEventListener('keydown', removeNewRoomPlateWhenEsc);
        window.removeEventListener('click', removeNewRoomPlateClick);
        dispatch(setNewRoomInfo({...newRoomInfo, isOpen: false}));
      }
    };
    const removeNewRoomPlateClick = (e: MouseEvent) => {
      if (e.target === backgroundRef.current) { // click outside the plate
        window.removeEventListener('keydown', removeNewRoomPlateWhenEsc);
        window.removeEventListener('click', removeNewRoomPlateClick);
        dispatch(setNewRoomInfo({...newRoomInfo, isOpen: false}));
      }
    };

    if (newRoomInfo.isOpen) {
      window.addEventListener('keydown', removeNewRoomPlateWhenEsc);
      window.addEventListener('click', removeNewRoomPlateClick); // otherwise closes immediately
    }
    if (!newRoomInfo.isOpen) {
      window.removeEventListener('click', removeNewRoomPlateClick);
      window.removeEventListener('keydown', removeNewRoomPlateWhenEsc);
      resetForm();
    }
  }, [dispatch, newRoomInfo, newRoomInfo.isOpen]);

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
      // TODO say something
    }
  };
  const addChat = async (chatId: string) => {
    try {
      await setDoc(doc(database, 'chats', chatId), {});
    } catch (e) {
      // TODO say something
    }
  };

  const titleChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const {value} = e.target as HTMLInputElement;
    if (value && titleInput.current?.classList.contains('--input-red')) {
      titleInput.current?.classList.remove('--input-red');
    }
    setFormData({...formData, title: value});
  };
  const passwordChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const {value} = e.target as HTMLInputElement;
    setFormData({...formData, password: value});
  };
  const imageChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setCurrentRoomImage(e.currentTarget.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      picture : ROOM_INFO.formDefaultPicture,
      password: '',
      passwordView: '',
    });
    setCurrentRoomImage(undefined);
  };

  const newRoomCreateHandler = () => {
    if (!formData.title) {
      titleInput.current?.classList.add('--input-red');
      return;
    }
    if (currentRoomImage && currentRoomImage.size > GLOBAL_CONSTS.maxRoomImageSize) { // reject if file too big
      // TODO say something
      return;
    }

    const currentRoomId = nanoid();
    if (currentRoomImage) {
      const storageRef = ref(storage, `img/room-image/${currentRoomId}`);
      uploadBytes(storageRef, currentRoomImage);
    }
    addRoom(currentRoomId);
    addChat(currentRoomId); // TODO - add toast if success

    dispatch(setNewRoomInfo({...newRoomInfo, isOpen: false}));
    resetForm();
  };

  return (
    <div className="blur-wrapper" ref={backgroundRef} hidden={!newRoomInfo.isOpen}>
      <div className="popups__new-room">
        <form onSubmit={newRoomCreateHandler} className="new-room__form" autoComplete='Off'>
          <label className="form__picture" htmlFor='form__picture'>
            <img src={currentRoomImage ? URL.createObjectURL(currentRoomImage) : ROOM_INFO.formDefaultPicture} alt="preview" />
          </label>
          <input onChange={imageChangeHandler} type="file" accept=".png, .jpg, .jpeg" alt="insert picture" id='form__picture' hidden/>
          <div className="form__wrapper">
            <label className="form__title" >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8 19.5514H19.8M4.20007 19.5514L8.56606 18.6717C8.79784 18.625 9.01065 18.5109 9.17779 18.3437L18.9515 8.56461C19.4201 8.09576 19.4197 7.33577 18.9508 6.86731L16.8803 4.79923C16.4115 4.33097 15.6519 4.33129 15.1835 4.79995L5.40884 14.58C5.24202 14.7469 5.12812 14.9593 5.08138 15.1906L4.20007 19.5514Z" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
              <input onChange={titleChangeHandler} type="text" placeholder="Title:" autoFocus value={formData.title} ref={titleInput}/>
            </label>
            <label className="form__password">
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.60005 8.7999V7.88562C6.60005 4.84671 9.00862 2.3999 12 2.3999C14.9915 2.3999 17.4001 4.84671 17.4001 7.88562V8.7999M6.60005 8.7999C5.61005 8.7999 4.80005 9.62276 4.80005 10.6285V19.7713C4.80005 20.777 5.61005 21.5999 6.60005 21.5999H17.4001C18.3901 21.5999 19.2001 20.777 19.2001 19.7713V10.6285C19.2001 9.62276 18.3901 8.7999 17.4001 8.7999M6.60005 8.7999H17.4001M12 16.1999V13.7999" stroke="white" strokeWidth={2} strokeLinecap="round" /></svg>
              <input onChange={passwordChangeHandler} type="text" placeholder="Password:" value={formData.password} />
            </label>
          </div>
        </form>
        <button onClick={newRoomCreateHandler} className="new-room__accept">Create</button>
      </div>
    </div>

  );
}

export default NewRoom;
