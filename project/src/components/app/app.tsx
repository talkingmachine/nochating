import { BrowserRouter} from 'react-router-dom';
import Chat from '../../pages/chat/chat';
import Rooms from '../../pages/rooms/rooms';
import ContentHeader from '../content-header/contentHeeader';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <aside className="sidebar">
        <Rooms/>
      </aside>
      <section className="content">
        <ContentHeader/>
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
      </section>
    </BrowserRouter>
  );
}

export default App;
