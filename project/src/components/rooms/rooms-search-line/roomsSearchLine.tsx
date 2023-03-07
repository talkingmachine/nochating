import { useRef, FocusEvent } from 'react';
import NewRoom from '../new-room/newRoom';


function RoomsSearchLine(): JSX.Element {


  const input = useRef<HTMLInputElement>(null);


  //-------------Handleres---
  const messageFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
    e.target.addEventListener('keydown', enterClickHandler);
  };
  const messageBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    e.target.removeEventListener('keydown', enterClickHandler);
  };
  //-------------Actions---
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const searchClickHandler = () => {
  };
  //-------------EventListeners---
  const enterClickHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchClickHandler();
    }
  };

  return (
    <>
      <div className="rooms__search-line">
        <input onFocus={messageFocusHandler} onBlur={messageBlurHandler} className="search-line__input" ref={input}/>
        <button onClick={searchClickHandler} className="search-line__new-room">+new</button>
      </div>
      <NewRoom/>
    </>
  );
}

export default RoomsSearchLine;
