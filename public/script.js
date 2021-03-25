async function loadLocations() {
  const request = await fetch('/api/dining/');
  const data = await request.json();

  return data;
}

async function populateTable(data) {
  const innerData = data.data;
  const table = document.getElementById('mytable');
  innerData.forEach((diningHall) => {
    console.log(diningHall);
    const newTr = document.createElement('tr');

    const thID = document.createElement('th');
    const contentTextID = document.createTextNode(diningHall.hall_id);
    thID.appendChild(contentTextID);

    const thName = document.createElement('th');
    const contentTextName = document.createTextNode(diningHall.hall_name);
    thName.appendChild(contentTextName);

    const thAddress = document.createElement('th');
    const contentTextAddress = document.createTextNode(diningHall.hall_address);
    thAddress.appendChild(contentTextAddress);

    newTr.appendChild(thID);
    newTr.appendChild(thName);
    newTr.appendChild(thAddress);

    table.appendChild(newTr);
  });
}

async function windowActions() {
  const myData = await loadLocations();
  populateTable(myData);
}

window.onload = windowActions;