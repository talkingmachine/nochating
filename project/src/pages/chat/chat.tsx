import { memo } from 'react';
import InputForm from '../../components/chat/input-form/inputForm';
import MessageList from '../../components/chat/message-list/messageList';
import NoData from '../../components/chat/no-data/noData';
import { useAppSelector } from '../../hooks/useStoreSelectors';


function Chat(): JSX.Element {
  const chatId = useAppSelector((state) => state.currentRoomInfo.chatId);
  return (
    <section className="content__chat">
      {chatId ?
        <>
          <MessageList/>
          <InputForm/>
        </>
        :
        <NoData/>}
    </section>
  );
}

export default memo(Chat);
