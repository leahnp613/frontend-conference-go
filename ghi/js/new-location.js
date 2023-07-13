window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/states/";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const states = data.states;
        const selectTag = document.getElementById("state");
        for (let state of states) {
          const option = document.createElement("option");
          option.value = state.abbreviation;
          option.innerHTML = state.name;
          selectTag.appendChild(option);
        }
      }
    } catch (e) {
      return `<div class="alert alert-danger" role="alert">
          Something went wrong!
         </div>`;
    }
    //   user creates a location
    const formTag = document.getElementById("create-location-form");
    formTag.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(formTag);
      const json = JSON.stringify(Object.fromEntries(formData));
      const locationUrl = "http://localhost:8000/api/locations/";
      const fetchConfig = {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
          formTag.reset();
          const newLocation = await response.json();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  
  
  
  
  
  