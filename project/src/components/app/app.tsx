import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
      </aside>
      <Routes>
        <Route
          path='/'
          element={<Rooms/>}
        />
        <Route
          path='/chat'
          element={<Chat/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
