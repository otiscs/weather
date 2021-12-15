import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Locations from './features/locations/Locations';
import Forecasts from './features/forecasts/Forecasts';
import NavBar from './features/NavBar';
import Home from './ui/Home/index';

export type RouteConfig = {
  id: string;
  path: string;
  name: string;
  exact?: boolean;
  getPathWithParams?: Function;
  lat?: number;
  lon?: number;
};

const routes: {
  home: RouteConfig;
  locations: RouteConfig;
  forecasts: RouteConfig;
  weather: RouteConfig;
} = {
  home: {
    id: 'home',
    path: '/',
    name: 'Home',
    exact: true,
  },
  locations: {
    id: 'locations',
    path: '/locations/:city',
    name: 'Locations',
    getPathWithParams: (params: { city: string }) => `/locations/${params.city}`,
  },
  forecasts: {
    id: 'forecasts',
    path: '/forecast:city',
    name: 'Forecasts',
    getPathWithParams: (params: { city: string; country: string; lat: number; lon: number }) =>
      `/forecast/${params.lat}/${params.lon}`,
  },
  weather: {
    id: 'weather',
    path: '/weather/:city',
    name: 'Weather',
    getPathWithParams: (params: { city: string }) => `/weather/${params.city}`,
  },
};

class Routing extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find/:city" element={<Locations />} />
          <Route path="/forecast/:city/:country/:lat/:lon" element={<Forecasts />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Routing;
export { routes };

function NoMatch() {
  return (
    <div>
      <h2>Zoinks, it looks like you might be lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
