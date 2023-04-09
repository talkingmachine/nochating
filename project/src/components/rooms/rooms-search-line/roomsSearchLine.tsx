import { useRef, useState, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStoreSelectors';
import { setNewRoomInfo } from '../../../store/actions';
import RoomsList from '../rooms-list/roomsList';


function RoomsSearchLine(): JSX.Element {

  const input = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const newRoomInfo = useAppSelector((state) => state.newRoomInfo);
  const [filterWord, setFilterWord] = useState<string>('');

  const showNewRoomHandler = () => {
    dispatch(setNewRoomInfo({...newRoomInfo, isOpen: true}));
  };

  const changeFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterWord(e.target.value);
  };

  return (
    <>
      <div className="rooms__search-line">
        <input onChange={changeFilterHandler} className="search-line__input" ref={input}/>
        <button onClick={showNewRoomHandler} className="search-line__new-room">+</button>
      </div>
      <RoomsList filterWord={filterWord}/>
    </>
  );
}

export default RoomsSearchLine;
