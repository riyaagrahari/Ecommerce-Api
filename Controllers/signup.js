const getClient = require('../Database/database.js')
const signup = (request, response) => {

    const client = getClient();
    client.connect(err => {
        const queryCollection = client.db(process.env.DATABASE_NAME).collection("Users");
        queryCollection.insertOne(request.body, (error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.status(200).send("Signed Up Successfully")
        })
    })

}

module.exports = signup;