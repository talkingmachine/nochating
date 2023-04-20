import { memo } from 'react';
import RoomsSearchLine from '../../components/rooms/rooms-search-line/roomsSearchLine';

function Chat(): JSX.Element {
  return (
    <section className="rooms wrapper">
      <RoomsSearchLine/>
    </section>
  );
}

export default memo(Chat);
