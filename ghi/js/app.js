function createCard(name, description, pictureUrl, start, end, location){
  return `
      <img src="${pictureUrl}" class="card-img-top" style="max-width: 320px; max-height: 240px; object-fit: contain;">
      <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle text-muted">${location}</h6>
          <p class="card-text">${description}</p>
          <div class="card-footer">${start} - ${end}</div>
      </div>
      </div>
`;
}
window.addEventListener('DOMContentLoaded', async () => {
  const url = "http://localhost:8000/api/conferences/";
  try {
      const response = await fetch(url);
      if (!response.ok){
      } else {
          const data = await response.json()
          for (let conference of data.conferences){
              const detailUrl = `http://localhost:8000${conference.href}`;
              const detailResponse = await fetch(detailUrl);
              if (detailResponse.ok){
                  const details = await detailResponse.json();
                  const title = details.conference.name;
                  const description = details.conference.description;
                  const pictureUrl = details.conference.location.picture_url;
                  const start = new Date(details.conference.starts).toDateString();
                  const end = new Date(details.conference.ends).toDateString();
                  const location = details.conference.location.name
                  const html = createCard(title, description, pictureUrl, start, end, location);
                  const column = document.querySelector('.col');
                  column.innerHTML += html;
                  const row = document.querySelector('.row');
                  row.appendChild(column);
              }
          }
      }
  } catch (e) {
      console.error("error");
  }
});

