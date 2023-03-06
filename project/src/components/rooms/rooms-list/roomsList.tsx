import { Link } from 'react-router-dom';

function RoomsList(): JSX.Element {


  return (
    <ul className="rooms__list">
      <li className="list__room">
        <div className="room__top-row">
          <div className="top-row__room-header">Room Header</div>
          <button className="top-row__star">
            <svg id="icon-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.82 34.26"><path d="M959.37,524.49a1,1,0,0,1,1.71,0l4.53,9.18a1,1,0,0,0,.72.52l10.13,1.47a1,1,0,0,1,.53,1.63l-7.33,7.14a.94.94,0,0,0-.27.84l1.73,10.09a1,1,0,0,1-1.38,1l-9.06-4.76a.94.94,0,0,0-.89,0l-9.06,4.76a1,1,0,0,1-1.38-1l1.73-10.09a1,1,0,0,0-.27-.84l-7.33-7.14a1,1,0,0,1,.53-1.63l10.13-1.47a1,1,0,0,0,.72-.52Z" transform="translate(-942.32 -523.09)" style={{stroke: '#ccc', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '1.73259997367859px'}} /></svg>
          </button>
        </div>
        <div className="room__middle-row">
          <img src="img/course-preview.jpg" alt="room preview" className="room__picture" />
          <ul className="room__users-list">
            <li className="users-list__item">
              <img src="img/user-avatar1.jpg" alt="user avatar"/>
            </li>
            <li className="users-list__item">
              <img src="img/user-avatar1.jpg" alt="user avatar" />
            </li>
          </ul>
          <Link to="/chat" className="room__join"><u>Join</u>-&#62;</Link>
        </div>
      </li>
    </ul>
  );
}

export default RoomsList;
