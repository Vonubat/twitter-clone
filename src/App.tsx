import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { Path } from './constants';
import { PageNotFound, UserPage, WelcomePage } from './pages';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path={Path.welcomePage} element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path={Path.userPage} element={<UserPage />} />
        <Route path={Path.any} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
