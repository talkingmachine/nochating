import { useRef, FocusEvent } from 'react';


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
  const searchClickHandler = () => {
  };
  //-------------EventListeners---
  const enterClickHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchClickHandler();
    }
  };

  return (
    <div className="rooms__search-line">
      <input onFocus={messageFocusHandler} onBlur={messageBlurHandler} className="search-line__input" ref={input}/>
      <button onClick={searchClickHandler} className="search-line__button">search</button>
      <button onClick={searchClickHandler} className="search-line__new-room">+new</button>
    </div>
  );
}

export default RoomsSearchLine;
