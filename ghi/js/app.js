window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      //Figure out what to do when the response is bad
    } else {
      const data = await response.json();

      const conference = data.conferences[1];
      const nameTag = document.querySelector('.card-title');
      nameTag.innerHTML = conference.name;
    //   console.log(conference);

      

      const detailUrl =`http://localhost:8000${conference.href}`;
      const detailResponse = await fetch(detailUrl);
      if (detailResponse.ok) {
        const details = await detailResponse.json();
        const description = details.conference.description;
        const descriptor = document.querySelector('.card-text');
        descriptor.innerHTML = details.conference.description;
        console.log(description)
         console.log(details);
      }
    }
  } catch (e) {
    //Figure out what to do if an error is raised
  }
});
