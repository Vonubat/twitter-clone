import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { Path } from './constants';
import { FeedPage, PageNotFound, UserPage, WelcomePage } from './pages';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path={Path.welcomePage} element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path={Path.userPage} element={<UserPage />} />
        <Route path={Path.feedPage} element={<FeedPage />} />
      </Route>
      <Route path={Path.any} element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
