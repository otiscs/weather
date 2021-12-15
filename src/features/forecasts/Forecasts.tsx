import React from 'react';
import { useAppSelector, useAppNavigate, useAppEffect } from '../../app/hooks';
import { selectForecast } from '../forecasts/forecastsSlice';
import Forecast from './forecast';
import styles from './Forecasts.module.css';

// interface Props {}

export const temparatureToHue = (temparature: number) => {
  return {
    backgroundColor:
      210 - temparature * 6 ? `hsl(${210 - Math.round(temparature) * 6}, 100%, 50%)` : 'hsl(210, 100%, 0%)',
  };
};

const Forecasts = (props: any) => {
  const forecastState = useAppSelector(selectForecast);
  const navigate = useAppNavigate();
  const { forecast } = forecastState;

  useAppEffect(() => {
    if (!forecast.daily) {
      navigate(`/`);
    }
  }, [navigate]);

  return (
    <div>
      <h2>
        Weather {forecast.city}, {forecast.country}
      </h2>
      <div className={styles.daily_forecast}>
        <div className={styles.container}>
          {forecast.daily
            ? forecast.daily.map((item: any) => {
                return (
                  <div className={styles.grid_item} key={item.dt}>
                    <Forecast key={item.dt} daily={item} temperatureToHue={temparatureToHue} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Forecasts;
