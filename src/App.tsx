import { Layout } from './components/Layout';
import Router from './router';

function App() {
  document.title = import.meta.env.VITE_TITLE;
  return <Router />;
}

export default App;
