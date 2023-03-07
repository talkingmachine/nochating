import { memo } from 'react';

function NewRoom(): JSX.Element {
  return (
    <div className="room__new-room">
      <form className="new-room__form">
        <input type="image" alt ="insert picture" className="form__picture" />
        <div className="form__wrapper">
          <label>
            <input type="text" className="form__title" />
          </label>
          <label>
            <input type="password" className="form__password" placeholder="Password:"/>
          </label>
        </div>
      </form>
      <button className="new-room__accept"><u>Accept</u></button>
    </div>
  );
}

export default memo(NewRoom);
