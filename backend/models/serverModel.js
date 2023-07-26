const mongoose = require('mongoose');

const serverSchema = mongoose.Schema(
    {
        name: String,
        ip: String,
        dataCenter: String,
    },
    { timestamps: true }
);

const Server = mongoose.model('Server', serverSchema);

module.exports = Server;