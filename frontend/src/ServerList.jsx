import { useState, useEffect } from 'react';

function ServerList() {
  const [servers, setServers] = useState([]);
  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [dataCenter, setDataCenter] = useState('');
  const [selectedServerId, setSelectedServerId] = useState('');

  useEffect(() => {
    // Fetch servers data from the API
    fetch('/api/servers')
      .then(response => response.json())
      .then(data => setServers(data))
      .catch(error => console.error('Failed to fetch servers', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const newServer = {
      name: name,
      ip: ipAddress,
      dataCenter: dataCenter
    };
  
    console.log('New Server:', newServer); // Log the new server object
  
    fetch('/api/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newServer)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Server created:', data); // Log the API response data
  
        // Update the state or perform any necessary actions
      })
      .catch(error => console.error('Failed to create server:', error)); // Log any fetch errors
  };
  

  const handleDelete = (id) => {
    // Make DELETE request to delete server
    fetch(`/api/servers/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Update servers state by removing the deleted server
          const updatedServers = servers.filter(server => server._id !== id);
          setServers(updatedServers);
        }
      })
      .catch(error => console.error('Failed to delete server', error));
  };

  const handleModify = () => {
    const updatedServer = {
      name: name,
      ipAddress: ipAddress,
      dataCenter: dataCenter
    };
  
    fetch(`/api/servers/${selectedServerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedServer)
    })
      .then(response => response.json())
      .then(data => {
        const updatedServers = servers.map(server =>
          server._id === selectedServerId ? data : server
        );
        setServers(updatedServers);
        setSelectedServerId('');
        setName('');
        setIpAddress('');
        setDataCenter('');
      })
      .catch(error => console.error('Failed to update server', error));
  };
  

  function renderServerList() {
    return servers.map((server) => (
      <tr key={server._id}>
        <td>{server.name}</td>
        <td>{server.ip}</td>
        <td>{server.dataCenter}</td>
        <td>
          {selectedServerId === server._id ? (
            <div>
              <button type="button" onClick={handleModify}>
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedServerId('');
                  setName('');
                  setIpAddress('');
                  setDataCenter('');
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => handleModify(server)}>
              Modify
            </button>
          )}
          <button type="button" onClick={() => handleDelete(server._id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  }
  
  return (
    <div>
      <h1>Server List</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={event => setName(event.target.value)} required />

        <label htmlFor="ipAddress">IP Address:</label>
        <input type="text" id="ipAddress" value={ipAddress} onChange={event => setIpAddress(event.target.value)} required />

        <label htmlFor="datacenter">Datacenter:</label>
        <select id="datacenter" value={dataCenter} onChange={event => setDataCenter(event.target.value)} required>
          <option value="">Select Datacenter</option>
          <option value="CIV">CIV</option>
          <option value="ETIX">ETIX</option>
          <option value="Ikoula">Ikoula</option>
        </select>

        <button type="submit">Add Server</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>IP Address</th>
            <th>Datacenter</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
           {renderServerList()}

        </tbody>
      </table>
    </div>
  );
}

export default ServerList;