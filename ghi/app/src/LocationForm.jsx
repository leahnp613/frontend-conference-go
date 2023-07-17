import React, { useEffect, useState } from 'react';

function LocationForm(props) {
  const [states, setStates] = useState([]);
  const [name, setName] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [city, setCity ] = useState('');


  const fetchData = async () => {
    const url = 'http://localhost:8000/api/states/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setStates(data.states);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };
  const handleRoomCountChange = (event) => {
    const value = event.target.value;
    setRoomCount(value);
  };
  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);
  };

console.log(states)
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new location</h1>
          <form id="create-location-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input 
                onChange ={handleRoomCountChange}
                placeholder="Room count"
                required
                type="number"
                name="room_count"
                id="room_count"
                className="form-control"
              />
              <label htmlFor="room_count">Room count</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange = {handleCityChange}
                placeholder="City"
                required
                type="text"
                name="city"
                id="city"
                className="form-control"
        />
            <label htmlFor="city">City</label>
            </div>
            <div className="mb-3">
                <select required id="state" name="state" className="form-select">
                <option value="">Choose a state</option>
                {states.map((state) => ( <option key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                </option>
                ))}
                </select>
            </div>
            <button className="btn btn-primary">Create</button>
            </form>
        </div>
        </div>
    </div>
)}

export default LocationForm;