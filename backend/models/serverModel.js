import mongoose from 'mongoose';

const serverSchema = mongoose.Schema(
    {
        name: String,
        ip: String,
        dataCenter: String,
    },
    { timestamps: true }
);

const Server = mongoose.model('Server', serverSchema);

export default Server;