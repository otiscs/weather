import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppEffect, useAppNavigate } from '../../app/hooks';
import { fetchForecastAsync } from '../../features/forecasts/forecastsSlice';
import { useCookies } from 'react-cookie';

interface Props {}

function Home(props: Props) {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const [cookies, setCookie] = useCookies(['mostRecentLocation']);

  const defaultLocation = {
    city: 'London',
    country: 'GB',
    latitude: 51.5074,
    longitude: 0.1278,
  };

  useAppEffect(() => {
    const { mostRecentLocation } = cookies;

    if (mostRecentLocation === undefined) {
      setCookie('mostRecentLocation', defaultLocation, { path: '/' });
    }
    if (mostRecentLocation !== undefined) {
      const { city, country, latitude, longitude } = mostRecentLocation;
      dispatch(fetchForecastAsync(mostRecentLocation)).then(() => {
        navigate(`/forecast/${city}/${country}/${latitude}/${longitude}`);
      });
    }
  }, [dispatch, cookies, navigate]);

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
