import { getDownloadURL, ref } from 'firebase/storage';
import { useContext, useState } from 'react';
import { GContext } from '../../../..';

type RoomImageProps = {
  chatId: string;
}
function RoomMiddleRow({chatId}: RoomImageProps): JSX.Element {

  const [imageUrl, setImageUrl] = useState<string>();
  const {storage} = useContext(GContext);

  getDownloadURL(ref(storage, `img/room-image/${chatId}`))
    .then((url) => {
      setImageUrl(url);
    });

  return (
    <>
      {imageUrl ? <img src={imageUrl} alt="room preview" className="room__picture" />
        :
        <img src='img/course-preview.jpg' alt="room preview" className="room__picture" />}
      <ul className="room__users-list">
        <li className="users-list__item">
          <img src="img/user-avatar1.jpg" alt="user avatar"/>
        </li>
        <li className="users-list__item">
          <img src="img/user-avatar1.jpg" alt="user avatar" />
        </li>
      </ul>
    </>
  );
}

export default RoomMiddleRow;

