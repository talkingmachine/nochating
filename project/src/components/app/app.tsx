import { BrowserRouter} from 'react-router-dom';
import Chat from '../../pages/chat/chat';
import Rooms from '../../pages/rooms/rooms';
import Header from './header/header';
import Popups from './popups/popups';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Popups/>
      <Header/>
      <aside className="sidebar">
        <Rooms/>
      </aside>
      <Chat/>
      {/* <Routes>
        <Route
          path='/'
          element={<Chat/>}
        />
        <Route
          path='/chat'
          element={<Chat/>}
        />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
