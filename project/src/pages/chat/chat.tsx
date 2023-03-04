import { memo, } from 'react';
import InputForm from '../../components/chat/input-form/inputForm';
import MessageList from '../../components/chat/message-list/messageList';


function Chat(): JSX.Element {
  return (
    <section className="chat wrapper">
      <MessageList/>
      <InputForm/>
    </section>
  );
}

export default memo(Chat);
