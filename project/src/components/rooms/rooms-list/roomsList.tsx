
function RoomsList(): JSX.Element {


  return (
    <ul className="rooms__list">
      <li className="list__room">
        <div className="room__top-row">
          <div className="top-row__room-header">Room Header</div>
          <button className="top-row__star"></button>
        </div>
        <div className="room__middle-row">
          <img src="img/course-preview.jpg" alt="room preview" className="room__picture" />
          <ul className="room__users-list">
            <li className="users-list__item"></li>
          </ul>
          <button className="room__join">Join</button>
        </div>
      </li>
    </ul>

  );
}

export default RoomsList;
