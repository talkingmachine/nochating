import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Chat from '../../pages/chat/chat';
import Rooms from '../../pages/rooms/rooms';
import ContentHeader from '../content-header/contentHeader';
import Login from '../../pages/login/login';
import { useAppDispatch } from '../../hooks/useStoreSelectors';
import { setUser } from '../../store/actions';
import { uploadStorageInfo } from '../../utils/uploadStorageInfo';


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(setUser(uploadStorageInfo()));

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
