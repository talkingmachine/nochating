import { BrowserRouter} from 'react-router-dom';
import Chat from '../../pages/chat/chat';
import Rooms from '../../pages/rooms/rooms';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <aside className="sidebar">
        <Rooms/>
      </aside>
      <section className="content">
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
