import { ReactElement } from 'react';
import styles from './forecast.module.css';

export interface IForecast {
  name: string;
  lat: number;
  long: number;
  country: string;
  state: string;
}

export interface ForecastState {
  loading: boolean;
  error: any;
  locations: Location[];
}

function formattedDate(dt: number) {
  let date = new Date(dt * 1000);
  let today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (date.getDate() === today.getDate()) {
    return `Today`;
  } else if (date.getDate() === tomorrow.getDate()) {
    return `Tomorrow`;
  } else {
    return `${date.getDate()}-${date.getMonth() + 1}`;
  }
}

function formattedTemp(temp: number, unit: string) {
  return `${Math.round(temp)}°${unit}`;
}

function windDirRotate(wind_deg: number) {
  return <div style={{ transform: `rotate(${wind_deg}deg)` }}>↑</div>;
}

function windDirection(deg: number) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const dir = Math.round(deg / 45);
  return directions[dir % 8];
}

function getDayName(dt: number) {
  var date = new Date(dt * 1000);
  return date.toLocaleDateString('en-GB', { weekday: 'short' });
}

const Forecast = (props: any): ReactElement => {
  const { daily, temperatureToHue } = props;
  const { dt, temp, wind_deg, wind_speed } = daily;

  return (
    <>
      <table className={styles.daily_table}>
        <th>
          <h4>{getDayName(dt)}</h4>
          <h5>{formattedDate(dt)}</h5>
        </th>
        <tr className={styles.dailyImg}>
          <img src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`} alt="days weather icon" />
        </tr>
        <tr>
          <td>{daily.weather[0].description}</td>
        </tr>
        <tr className={styles.forecastDay} style={temperatureToHue(temp.min)}>
          {formattedTemp(temp.min, 'C')}
        </tr>
        <tr style={temperatureToHue(temp.max)}>{formattedTemp(temp.max, 'C')}</tr>
        <tr />
        <tr>
          <td>
            <div style={{ display: 'flex', paddingLeft: '0.1rem' }}>
              <div style={{ paddingRight: '0.2rem' }}>{wind_speed} km/h </div>
              {windDirRotate(wind_deg)}
            </div>
          </td>
        </tr>
        <tr>humidity: {daily.humidity}%</tr>
      </table>
    </>
  );
};

export default Forecast;
