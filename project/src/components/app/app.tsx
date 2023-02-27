import Chat from '../chat/chat';
import Header from '../header/header';

function App(): JSX.Element {

  return (
    <>
      <Header/>
      <aside className="sidebar">
      </aside>
      <Chat/>
    </>
  );
}

export default App;
