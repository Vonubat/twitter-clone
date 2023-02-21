import { Header } from './components';
import { TwitterContextProvider } from './hooks';

const App = (): JSX.Element => {
  return (
    <TwitterContextProvider>
      <Header />
    </TwitterContextProvider>
  );
};

export default App;
