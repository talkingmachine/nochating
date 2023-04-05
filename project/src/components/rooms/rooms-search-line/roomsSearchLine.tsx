import { useRef, FocusEvent, useState, ChangeEvent } from 'react';
import NewRoom from '../../app/popups/new-room/newRoom';
import RoomsList from '../rooms-list/roomsList';


function RoomsSearchLine(): JSX.Element {

  const input = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterWord, setFilterWord] = useState<string>('');

  // Add Remove Event listeners
  const messageFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
    e.target.addEventListener('keydown', enterClickHandler);
  };
  const messageBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    e.target.removeEventListener('keydown', enterClickHandler);
  };
  const showNewRoomToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const enterClickHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      showNewRoomToggle();
    }
  };

  const changeFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterWord(e.target.value);
  };

  return (
    <>
      <div className="rooms__search-line">
        <input onFocus={messageFocusHandler} onBlur={messageBlurHandler} onChange={changeFilterHandler} className="search-line__input" ref={input}/>
        <button onClick={showNewRoomToggle} className="search-line__new-room">+</button>
      </div>
      <NewRoom
        isOpen={isOpen}
        closeNewRoomMenu={() => setIsOpen(false)}
      />
      <RoomsList filterWord={filterWord}/>
    </>
  );
}

export default RoomsSearchLine;
