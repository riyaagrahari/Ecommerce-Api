require('dotenv').config();
const Express = require('express');
const BodyParser = require('body-parser');
const { request, response } = require('express');

const addTransaction = require('./Controllers/postNewPurchase')
const getUserTransaction = require('./Controllers/getUserTransactions')
const postLogin = require('./Controllers/postLogin')
const logout = require('./Controllers/logout')
const signup = require('./Controllers/signup')

const cookieParser = require("cookie-parser");
const { sign } = require('jsonwebtoken');
const app = Express();
const port = 5003

app.use(cookieParser());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
const authRoute = require('./Routes/authentication.js');
const itemsBoughtRoute = require('./Routes/itemsBought.js');

app.listen(port, () => { 
    console.log(`Server started at port ${port}!`)
})



app.get("/", (request, response) => {
    console.log("Get request Accepted")
    
});

app.use("/auth", authRoute)

//const generateJWTToken = (getLogin.user)
app.use("/itemsBought", itemsBoughtRoute);

app.post("/newPurchase",addTransaction);



