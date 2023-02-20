import { useContext, useState } from 'react';
import { GContext } from '../..';

export function Chat(): JSX.Element {

  const {database} = useContext(GContext);
  const [inputLine, setInputLine] = useState<string>('');

  const sendMessageClickHandler = () => {
    console.log(database);
  };

  return (
    <section className="messenger wrapper">
      <div className="messenger__message-list">
        <div className="message">
        Hello Ether!
        </div>
      </div>
      <div className="messenger__input-line">
        <form action='' className="input-line__form">
          <input className="form__message" defaultValue={''} />
        </form>
      </div>
      <div className="messenger__buttons-section">
        <button onClick={sendMessageClickHandler} className="buttons-section__send">Send</button>
      </div>
    </section>
  );
}
