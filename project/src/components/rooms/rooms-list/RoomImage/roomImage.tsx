import { getDownloadURL, ref } from 'firebase/storage';
import { useContext, useState } from 'react';
import { GContext } from '../../../..';
import { GLOBAL_CONSTS } from '../../../../consts/globalConsts';

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
        <img src={GLOBAL_CONSTS.defaultRoomImage} alt="room preview" className="room__picture" />}
      {}
    </>
  );
}

export default RoomImage;

