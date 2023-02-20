import { TwitterContextProvider } from './hooks';

const App = (): JSX.Element => {
  return (
    <TwitterContextProvider>
      <div>Hello world!</div>
    </TwitterContextProvider>
  );
};

export default App;
