import { memo, } from 'react';
import InputForm from './input-form/inputForm';
import MessageList from './message-list/messageList';

function Chat(): JSX.Element {
  return (
    <section className="chat wrapper">
      <MessageList/>
      <InputForm/>
    </section>
  );
}

export default memo(Chat);
