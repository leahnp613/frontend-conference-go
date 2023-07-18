import React, { useState, useEffect } from "react";

export default function AttendConferenceForm() {
  const [conferences, setConferences] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [conference, setConference] = useState("");
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleConferenceChange = (event) => {
    const value = event.target.value;
    setConference(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.email = email;
    data.conference = conference;
    console.log(data);

    const url = "http://localhost:8001/api/attendees/";
    const fetchConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newAttendee = await response.json();
      console.log(newAttendee);

      setName("");
      setEmail("");
      setConference("");
      setHasSignedUp(true);
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:8000/api/conferences/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setConferences(data.conferences);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let spinnerClasses = "d-flex justify-content-center mb-3";
  let dropdownClasses = "form-select d-none";
  if (conferences.length > 0) {
    spinnerClasses = "d-flex justify-content-center mb-3 d-none";
    dropdownClasses = "form-select";
  }

  let messageClasses = "alert alert-success d-none mb-0";
  let formClasses = "";
  if (hasSignedUp) {
    messageClasses = "alert alert-success mb-0";
    formClasses = "d-none";
  }

  return (
    <div className="container">
      <div className="my-5">
        <div className="row">
          <div className="col col-sm-auto">
            <img
              width="300"
              className="bg-white rounded shadow d-block mx-auto mb-4"
              src="/logo.svg"
            />
          </div>
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} id="create-attendee-form">
                  <h1 className="card-title">It's Conference Time!</h1>
                  <p className="mb-3">
                    Please choose which conference you'd like to attend.
                  </p>
                  <div
                    className={spinnerClasses}
                    id="loading-conference-spinner"
                  >
                    <div className="spinner-grow text-secondary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <select
                      onChange={handleConferenceChange}
                      name="conference"
                      id="conference"
                      className={dropdownClasses}
                      required
                    >
                      <option value="">Choose a conference</option>
                      {conferences.map((conference) => {
                        return (
                          <option key={conference.href} value={conference.href}>
                            {conference.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <p className="mb-3">Now, tell us about yourself.</p>
                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          onChange={handleNameChange}
                          required
                          placeholder="Your full name"
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          value={name}
                        />
                        <label htmlFor="name">Your full name</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          onChange={handleEmailChange}
                          required
                          placeholder="Your email address"
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={email}
                        />
                        <label htmlFor="email">Your email address</label>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-info">I'm going!</button>
                </form>
                <div className={messageClasses} id="success-message">
                  Congratulations! You'r signed up!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}