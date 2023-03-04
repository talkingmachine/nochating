import Rooms from '../../pages/rooms/rooms';
import Header from '../header/header';

function App(): JSX.Element {

  return (
    <>
      <Header/>
      <aside className="sidebar">
      </aside>
      <Rooms/>
    </>
  );
}

export default App;
