import { getDownloadURL, ref } from 'firebase/storage';
import { useContext, useState } from 'react';
import { GContext } from '../../../..';

type RoomImageProps = {
  chatId: string;
}
function RoomImage({chatId}: RoomImageProps): JSX.Element {

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
      {}
    </>
  );
}

export default RoomImage;

