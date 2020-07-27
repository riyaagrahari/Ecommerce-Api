const jwt = require("jsonwebtoken")
const getClient = require('../Database/database.js')
const { query } = require("express")

const jwtKey = process.env.SECRET_KEY
const jwtExpirySeconds = 1000

const postLogin = (request, response) => {
    const user = request.body.username;
    const client = getClient();
    let result = 0;

    client.connect(err => {
        const queryCollection = client.db(process.env.DATABASE_NAME).collection("Users");
        queryCollection.findOne({'username': user})
        .then(
            result => {
                if(result)
                {
                        const token = jwt.sign({user}, jwtKey, {
                        algorithm: "HS256",
                        expiresIn: jwtExpirySeconds,
                    })
                    console.log(result)
                    response.cookie("token", token, { maxAge: jwtExpirySeconds * 3600})
                    response.status(200).send("Login successful")
                    response.end()
                }
                else{
                    response.status(401).send("No account exists. Please create an account and login again")
                }
        })
        .catch(
            err => {
                response.status(500).send("DB error")
            }
        )
})
}

module.exports = postLogin;