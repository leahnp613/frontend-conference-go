const [conferences, setConferences] = useConferences(props.conferences);

// ...

let spinnerClasses = // what could go here?
let dropdownClasses = // what could go here?
if (conferences.length > 0) {
  spinnerClasses = // what should be here?
  dropdownClasses = // what should be here?
}

return (
  <div className="my-5">
    <div className="row">
  // ...