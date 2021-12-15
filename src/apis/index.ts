import axios from 'axios';
import { privateAPPID } from '../configvars';
const APPID = privateAPPID;

const api = axios.create({
  baseURL: 'http://api.openweathermap.org/',
  params: {
    appid: APPID,
  },
});
export default api;
