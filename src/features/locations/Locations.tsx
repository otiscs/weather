import React, { MouseEvent } from 'react';
import { fetchForecastAsync } from '../forecasts/forecastsSlice';
import { useAppSelector, useAppDispatch, useAppNavigate } from '../../app/hooks';
import { selectLocations } from './locationSlice';
import { useCookies } from 'react-cookie';

const Locations = () => {
  const [cookies, setCookie] = useCookies(['mostRecentLocation']);

  const locationsState = useAppSelector(selectLocations);
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();

  const formattedLoc = (loc: number) => {
    return loc.toFixed(2);
  };

  const locationHelper = (
    latitude: number,
    longitude: number,
    city: string,
    country: string,
    e: MouseEvent<HTMLAnchorElement>
  ) => {
    let location = { city: city, country: country, latitude: latitude, longitude: longitude };
    e.preventDefault();
    dispatch(fetchForecastAsync(location)).then(() => {
      setCookie('mostRecentLocation', location, { path: '/' });
      return navigate(`/forecast/${city}/${country}/${latitude}/${longitude}`);
    });
  };

  return (
    <div>
      <p>List of Locations</p>
      <>
        <ul className="list geoList">
          {locationsState.locations.length >= 1 ? (
            locationsState.locations.map((location: any) => (
              <li key={location.name}>
                <a
                  onClick={(e) => locationHelper(location.lat, location.lon, location.name, location.country, e)}
                  href={`forecast/${location.name}${location.country}`}
                >
                  <label className="">
                    {location.name}, {location.country}
                  </label>
                </a>
                &nbsp;
                <span className="locationlabel">
                  Geo coords [{formattedLoc(location.lat)}, {formattedLoc(location.lon)}]
                </span>
              </li>
            ))
          ) : (
            <li>No match found</li>
          )}
        </ul>
      </>
    </div>
  );
};

export default Locations;
