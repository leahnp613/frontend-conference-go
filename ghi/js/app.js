window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences";
    console.log("hey")
  try {
    const response = await fetch(url);

    if (!response.ok) {
      //Figure out what to do when the response is bad
    } else {
      const data = await response.json();

      const conference = data.conferences[6];
      const nameTag = document.querySelector('.card-title');
      nameTag.innerHTML = conference.name;

      
      console.log(conference);

      

      const detailUrl =`http://localhost:8000${conference.href}`;
      const detailResponse = await fetch(detailUrl);
      console.log(detailResponse)
      if (detailResponse.ok) {
        console.log("here")
        const details = await detailResponse.json();
        console.log(details)
        const description = details.conference.description;
        const descriptor = document.querySelector('.card-text');
        descriptor.innerHTML = details.conference.description;

        console.log("here2")
        const imageTag = document.querySelector('.card-img-top');
        console.log(imageTag);
        imageTag.src = details.conference.location.picture_url;
        console.log(imageTag);
      }
    }
  } catch (e) {
    //Figure out what to do if an error is raised
  }
});
