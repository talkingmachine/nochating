import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Chat from '../../pages/chat/chat';
import Rooms from '../../pages/rooms/rooms';
import ContentHeader from '../content-header/contentHeader';
import Login from '../../pages/login/login';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <aside className="sidebar">
        <Rooms/>
      </aside>
      <section className="content">
        <ContentHeader/>
        <Routes>
          <Route
            path='/'
            element={<Login/>}
          />
          <Route
            path='/chat'
            element={<Chat/>}
          />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
