import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import ptbr from 'dayjs/locale/pt-br';
import { RecoilRoot } from 'recoil';
import axios from 'axios';
dayjs.locale(ptbr);
dayjs.extend(utc);

axios.defaults.headers.patch['Content-Type'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RecoilRoot>
    <App />
  </RecoilRoot>
)
