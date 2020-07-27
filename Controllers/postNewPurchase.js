const getClient = require('../Database/database.js')

const postNewPurchase =  (request, response) => {
    const trans = request.body;

    // transactions.push(trans);

    const client = getClient();

    client.connect(err => {
        const queryCollection = client.db("Ecommerce").collection("Transaction");
        queryCollection.insertOne(request.body, (error,result) => {
            if(error){
                return response.status(500).send(error);
            }
            response.status(200).send("Added Successfully");
        })   
        
    });
};

module.exports = postNewPurchase;