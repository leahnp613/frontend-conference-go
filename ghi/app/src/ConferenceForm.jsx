import React, { useEffect, useState } from "react";

export default function ConferenceForm() {
  const [locations, setLocations] = useState([]);

  const [conferenceName, setConferenceName] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [description, setDescription] = useState("");
  const [maxPresentations, setMaxPresentations] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [location, setLocation] = useState("");

  const handleConferenceNameChange = (event) => {
    const value = event.target.value;
    setConferenceName(value);
  };

  const handleStartsChange = (event) => {
    const value = event.target.value;
    setStarts(value);
  };

  const handleEndsChange = (event) => {
    const value = event.target.value;
    setEnds(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleMaxPresentationsChange = (event) => {
    const value = event.target.value;
    setMaxPresentations(value);
  };

  const handleMaxAttendeesChange = (event) => {
    const value = event.target.value;
    setMaxAttendees(value);
  };
  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = conferenceName;
    data.starts = starts;
    data.ends = ends;
    data.description = description;
    data.max_presentations = maxPresentations;
    data.max_attendees = maxAttendees;
    data.location = location;
    console.log(data);

    const locationUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);

      setConferenceName("");
      setStarts("");
      setEnds("");
      setDescription("");
      setMaxPresentations("");
      setMaxAttendees("");
      setLocation("");
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:8000/api/locations/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleConferenceNameChange}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={conferenceName}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleStartsChange}
                  placeholder="Starts"
                  required
                  type="date"
                  name="starts"
                  id="starts"
                  className="form-control"
                  value={starts}
                />
                <label htmlFor="starts">Start Date</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleEndsChange}
                  placeholder="Ends"
                  required
                  type="date"
                  name="ends"
                  id="ends"
                  className="form-control"
                  value={ends}
                />
                <label htmlFor="ends">End Date</label>
              </div>
              <div className="mb-3">
                <label htmlFor="description" class="form-label">
                  Description
                </label>
                <textarea
                  onChange={handleDescriptionChange}
                  className="form-control"
                  name="description"
                  id="description"
                  rows="3"
                  value={description}
                ></textarea>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleMaxPresentationsChange}
                  placeholder="Max presentations"
                  required
                  type="number"
                  name="max_presentations"
                  id="max_presentations"
                  className="form-control"
                  value={maxPresentations}
                />
                <label htmlFor="max_presentations">Maximum Presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleMaxAttendeesChange}
                  placeholder="Max attendees"
                  required
                  type="number"
                  name="max_attendees"
                  id="max_attendees"
                  className="form-control"
                  value={maxAttendees}
                />
                <label htmlFor="max_attendees">Maximum Attendees</label>
              </div>

              <div className="mb-3">
                <select
                  onChange={handleLocationChange}
                  required
                  id="location"
                  name="location"
                  className="form-select"
                  value={location}
                >
                  <option value="">Choose a location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-info">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}