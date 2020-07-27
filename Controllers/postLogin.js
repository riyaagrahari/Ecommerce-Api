const jwt = require("jsonwebtoken")

const jwtKey = process.env.SECRET_KEY
const jwtExpirySeconds = 1000

const postLogin = (request, response) => {
    const user = request.body.username;

    const token = jwt.sign({user}, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    } )

    response.cookie("token", token, { maxAge: jwtExpirySeconds * 3600})
    response.end()    
}


module.exports = postLogin;