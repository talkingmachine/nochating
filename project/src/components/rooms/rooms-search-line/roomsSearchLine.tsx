import { useRef, FocusEvent, useState } from 'react';
import NewRoom from '../new-room/newRoom';


function RoomsSearchLine(): JSX.Element {

  const input = useRef<HTMLInputElement>(null);
  const [isShown, setIsShown] = useState<boolean>(false);

  const messageFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
    e.target.addEventListener('keydown', enterClickHandler);
  };
  const messageBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    e.target.removeEventListener('keydown', enterClickHandler);
  };
  const showNewRoomToggle = () => {
    setIsShown((prev) => !prev);
  };
  const enterClickHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      showNewRoomToggle();
    }
  };

  return (
    <>
      <div className="rooms__search-line">
        <input onFocus={messageFocusHandler} onBlur={messageBlurHandler} className="search-line__input" ref={input}/>
        <button onClick={showNewRoomToggle} className="search-line__new-room">+new</button>
      </div>
      {isShown ? <NewRoom/> : false}
    </>
  );
}

export default RoomsSearchLine;
