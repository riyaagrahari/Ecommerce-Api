const MongoClient = require('mongodb').MongoClient;
const MongoDBUser = process.env.MONGO_DB_ATLAS_USERNAME;
const MongoDBPassword = process.env.MONGO_DB_ATLAS_PASSWORD;
const Database = process.env.DATABASE_NAME;

const uri = `mongodb+srv://${MongoDBUser}:${MongoDBPassword}@cluster0.iqy5l.mongodb.net/${Database}?retryWrites=true&w=majority`;

const getClient = () => {
    const client = new MongoClient(uri, { useNewUrlParser: true ,  useUnifiedTopology: true });
    return client;
}

module.exports = getClient;