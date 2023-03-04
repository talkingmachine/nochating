import { memo, } from 'react';
import RoomsList from '../../components/rooms/rooms-list/roomsList';
import RoomsSearchLine from '../../components/rooms/rooms-search-line/roomsSearchLine';

function Chat(): JSX.Element {
  return (
    <section className="rooms wrapper">
      <RoomsSearchLine/>
      <RoomsList/>
    </section>
  );
}

export default memo(Chat);
