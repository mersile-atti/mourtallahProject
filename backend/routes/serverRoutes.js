import express from 'express';
import Server from '../models/serverModel.js';
const router = express.Router();
const app = express();

// GET /api/servers - Get all servers
router.get('/', (req, res) => {
  Server.find()
    .then(servers => {
      res.json(servers);
    })
    .catch(err => {
      console.error('Failed to fetch servers from MongoDB', err);
      res.status(500).send('Server error');
    });
});

// GET /api/servers/:id - Get a specific server by ID
router.get('/:id', (req, res) => {
  const serverId = req.params.id;
  Server.findById(serverId)
    .then(server => {
      if (!server) {
        res.status(404).send('Server not found');
      } else {
        res.json(server);
      }
    })
    .catch(err => {
      console.error('Failed to fetch server from MongoDB', err);
      res.status(500).send('Server error');
    });
});

router.post('/', (req, res) => {
  const newServer = req.body;
  function validateIP(ip) {
    // Regular expression to validate IP address format
    const ipAddressRegex = /^\b(?:\d{1,3}\.){3}\d{1,3}\b$/;
    
    // Check if the IP address is valid
    if (!ipAddressRegex.test(ip)) {
      return { success: false, message: 'Invalid IP address format' };
    }
    return { success: true };
  }

  const validation = validateIP(newServer.ip);
  if (!validation.success) {
    res.status(400).json({ error: validation.message });
    return;
  }

  Server.create(newServer)
    .then(() => {
      res.status(201).json({ message: 'Server created' });
    })
    .catch(err => {
      console.error('Failed to create server in MongoDB', err);
      res.status(500).json({ error: 'Server error' });
    });
});


// PUT /api/servers/:id - Update an existing server
router.put('/:id', (req, res) => {
  const serverId = req.params.id;
  const updatedServer = req.body;
  Server.findByIdAndUpdate(serverId, updatedServer)
    .then(server => {
      if (!server) {
        res.status(404).send('Server not found');
      } else {
        res.send('Server updated');
      }
    })
    .catch(err => {
      console.error('Failed to update server in MongoDB', err);
      res.status(500).send('Server error');
    });
});

// DELETE /api/servers/:id - Delete a server
router.delete('/:id', (req, res) => {
  const serverId = req.params.id;
  Server.findByIdAndRemove(serverId)
    .then(server => {
      if (!server) {
        res.status(404).send('Server not found');
      } else {
        res.send('Server deleted');
      }
    })
    .catch(err => {
      console.error('Failed to delete server in MongoDB', err);
      res.status(500).send('Server error');
    });
});

export default router;
