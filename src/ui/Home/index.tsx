import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppEffect, useAppNavigate } from '../../app/hooks';
import { fetchForecastAsync } from '../../features/forecasts/forecastsSlice';
import { useCookies } from 'react-cookie';

interface Props {}

function Home(props: Props) {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const [cookies, setCookie] = useCookies(['mostRecentLocation']);

  let location = { city: 'London', country: 'GB', latitude: 51.5073219, longitude: 0.1276474 };

  useAppEffect(() => {
    if (cookies.mostRecentLocation) {
      dispatch(fetchForecastAsync(cookies.mostRecentLocation));
      navigate(`/forecast/${cookies.mostRecentLocation.city}/${cookies.mostRecentLocation.country}`);
    } else {
      setCookie('mostRecentLocation', location, { path: '/' });
    }

    const { mostRecentLocation } = cookies;

    dispatch(fetchForecastAsync(cookies.mostRecentLocation)).then(() =>
      navigate(
        `/forecast/${mostRecentLocation.city}/${mostRecentLocation.country}/${mostRecentLocation.latitude}/${mostRecentLocation.longitude}`
      )
    );
  }, [dispatch, cookies, location]);

  return (
    <>
      <div>
        <h1>HomePlaceholder</h1>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
