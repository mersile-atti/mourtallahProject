// servers.js
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('addServerForm');
  const serverList = document.getElementById('serverList');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const ipAddress = document.getElementById('ipAddress').value;
    const datacenter = document.getElementById('datacenter').value;

    const newServer = { name, ipAddress, datacenter };

    fetch('/api/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newServer)
    })
    .then(response => {
      if (response.ok) {
        getServers().then(renderServerList);
        form.reset();
      } else {
        console.error('Failed to add server');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  function getServers() {
    return fetch('/api/servers')
      .then(response => response.json());
  }

  function renderServerList(servers) {
    const tbody = serverList.querySelector('tbody');
    tbody.innerHTML = '';

    servers.forEach(server => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = server.name;
      row.appendChild(nameCell);

      const ipAddressCell = document.createElement('td');
      ipAddressCell.textContent = server.ipAddress;
      row.appendChild(ipAddressCell);

      const datacenterCell = document.createElement('td');
      datacenterCell.textContent = server.datacenter;
      row.appendChild(datacenterCell);

      const actionsCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteServer(server._id));
      actionsCell.appendChild(deleteButton);

      row.appendChild(actionsCell);

      tbody.appendChild(row);
    });
  }

  function deleteServer(serverId) {
    fetch(`/api/servers/${serverId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        getServers().then(renderServerList);
      }
    });
  }

  getServers().then(renderServerList);
});
