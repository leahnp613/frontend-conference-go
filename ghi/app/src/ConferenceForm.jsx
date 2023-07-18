import React, { useState, useEffect } from 'react';

const ConferenceForm = () => {
  const [conferences, setConferences] = useState([]);

  let spinnerClasses = 'd-flex justify-content-center mb-3';
  let dropdownClasses = 'form-select d-none';

  if (conferences.length > 0) {
    spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
    dropdownClasses = 'form-select';
  }

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await fetch('http://example.com/api/conferences');
        if (response.ok) {
          const data = await response.json();
          setConferences(data);
        }
      } catch (error) {
        console.error('Error fetching conferences:', error);
      }
    };

    fetchConferences();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new conference</h1>
          <form id="create-conference-form">
            {/* ... */}
            <div className="form-floating mb-3">
              <input
                placeholder="max_presentations"
                required
                type="number"
                name="max_presentations"
                id="max_presentations"
                className="form-control"
              />
              <label htmlFor="max_presentations">Maximum presentations</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="max_attendees"
                required
                type="number"
                name="max_attendees"
                id="max_attendees"
                className="form-control"
              />
              <label htmlFor="max_attendees">Maximum attendees</label>
            </div>
            <div className="mb-3">
              <select required id="location" name="location" className={dropdownClasses}>
                <option value="">Choose a location</option>
                {conferences.map((conference) => (
                  <option key={conference.id} value={conference.location}>
                    {conference.location}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConferenceForm;
