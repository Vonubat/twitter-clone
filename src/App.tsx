import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { TwitterContextProvider } from './hooks';
import { PageNotFound, UserPage, WelcomePage } from './pages';

const App = (): JSX.Element => {
  return (
    <TwitterContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </TwitterContextProvider>
  );
};

export default App;
