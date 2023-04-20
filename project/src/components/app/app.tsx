import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Chat from '../../pages/chat/chat';
import Rooms from '../../pages/rooms/rooms';
import ContentHeader from '../content-header/contentHeader';
import Login from '../../pages/login/login';
import classNames from 'classnames';
import { isAuthorized } from '../../utils/isAuthorized';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreSelectors';
import { useEffect } from 'react';
import { uploadStorageInfo } from '../../utils/uploadStorageInfo';
import { setUser } from '../../store/actions';
import Popups from './popups/popups';


function App(): JSX.Element {

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const onTop = useAppSelector((state) => state.onTop);

  useEffect(() => {
    dispatch(setUser(uploadStorageInfo()));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Popups/>
      <aside className={classNames(
        'sidebar',
        {'--blur' : !isAuthorized(user)},
        {'--aside-on-top' : onTop})}
      >
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
