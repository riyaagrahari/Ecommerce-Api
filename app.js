require('dotenv').config();
const Express = require("express");
const BodyParser = require("body-parser");
const { request, response } = require("express");
const addTransaction = require("./Controllers/postNewPurchase")
const getUserTransaction = require("./Controllers/getUserTransactions")
const postLogin = require("./Controllers/postLogin")
const logout = require('./Controllers/logout')
const cookieParser = require("cookie-parser")
const app = Express();
const port = 5000

app.use(cookieParser());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

app.listen(port, () => { 
    console.log(`Server started at port ${port}!`)
})



app.get("/", (request, response) => {
    console.log("Get request Accepted")
    
});

app.post("/login", postLogin)

//const generateJWTToken = (getLogin.user)
app.get("/itemsBought", getUserTransaction);

app.post("/newPurchase",addTransaction);

app.get("/logout", logout);


