const getClient = require('../Database/database.js')
const jwt = require('jsonwebtoken')

const postNewPurchase =  (request, response) => {
    
    let uname = ""
    console.log(request.cookies)
    const cookie = request.cookies.token;

    if (cookie) {
        const token = cookie
        console.log("token", token)
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            uname = user.user
            console.log(user.user)

        });

    const trans = request.body;

    const client = getClient();
    request.body.username = uname
    client.connect(err => {
        const queryCollection = client.db(process.env.DATABASE_NAME).collection("Transaction");
        queryCollection.insertOne(request.body, (error,result) => {
            if(error){
                return response.status(500).send(error);
            }
            response.status(200).send("Added Successfully");
        })   
        
    });
}
else
{
    response.status(401).send("Unauthorized!")
    response.end()
}
}
module.exports = postNewPurchase;