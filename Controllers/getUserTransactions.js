const getClient = require('../Database/database.js')
const jwt = require('jsonwebtoken')


const getUserTransaction = async (request, response) => {
    let uname = ""
    console.log(request.cookies)
    const cookie = request.cookies.token;
    console.log("cookie",cookie)

    if(cookie) {
        const token = cookie
        console.log("token", token)
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            uname = user.user
            console.log(user.user)
            
        });
    
    console.log("uname", uname)
    let date = request.query.date;
    const client = getClient();
    client.connect(err =>{
        const queryCollection = client.db("Ecommerce").collection("Transaction");
        queryCollection.find( { $and: [ { 'username': uname},{ 'date': date} ] }).toArray((err, result) => {
        if(err)
        {
            response.send(err)
        }
        else
        {
            console.log(result);
            if (result.length == 0)
            response.status(404).send("No data found");
            else 
            response.status(200).send(result);
        }
    });
});     
}
else 
    {
        response.status(401).send("Unauthorized!")
        console.log("You need to login")
        response.end()
    }
}

module.exports = getUserTransaction;