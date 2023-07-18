import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import AttendConferenceForm from './AttendConferenceForm';
import ConferenceForm from './ConferenceForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return(   
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="locations">
              <Route path="new" element={<LocationForm />}/>
              </Route>
          <Route path="conferences">
                <Route path="new" element={<ConferenceForm />} />
                </Route>
          <Route path="attendees">
                  <Route path="new" element={<AttendConferenceForm />} />
                  </Route>
          <Route path="attendees">
                    <Route path="" element={<AttendeesList />} />
                    </Route>
        {/* <LocationForm/> */}
        {/* <AttendeesList attendees={props.attendees} /> */}
        {/* {<AttendConferenceForm/>} */}
        {/* {<ConferenceForm/>} */}
        </Routes>
      </div>
    </BrowserRouter>
   
    );
}

export default App;
