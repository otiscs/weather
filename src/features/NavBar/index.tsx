import React, { ReactElement, useState } from 'react';
import { useAppDispatch, useAppNavigate } from '../../app/hooks';
import { fetchLocationsAsync } from '../locations/locationSlice';

function NavBar(): ReactElement {
  const [search, setSearch] = useState('');

  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearch(e.target.value);
  }

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>): any {
    if (search === '') {
      e.preventDefault();
    } else {
      e.preventDefault();
      dispatch(fetchLocationsAsync(search));
      navigate('/find/' + search);
      setSearch('');
    }
  }

  return (
    <div style={{ position: 'absolute', top: '5%', left: '5%' }}>
      <form onSubmit={onFormSubmit}>
        <button className="approximat-btn" type="submit">
          Search
        </button>
        &nbsp;
        <label>
          <input
            className="approximatextfield"
            type="text"
            aria-label="Search for city"
            placeholder=" Location search…"
            value={search}
            onChange={handleChange}
          ></input>
        </label>
      </form>
    </div>
  );
}

export default NavBar;
