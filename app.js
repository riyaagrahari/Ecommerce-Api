const Express = require("express");
const BodyParser = require("body-parser");
const { request, response } = require("express");
require('dotenv').config();

// const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectID;
// const CONNECTION_URL = `${process.env.CONNNECTION_STRING}`;
// const DATABASE_NAME = "Ecommerce"

const app = Express();
const port = 5000

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin123@@cluster0.iqy5l.mongodb.net/Ecommerce?retryWrites=true&w=majority";
const getClient = () => {
    const client = new MongoClient(uri, { useNewUrlParser: true ,  useUnifiedTopology: true });
    return client;
}

app.listen(port, () => { 
    console.log(`Server started at port ${port}!`)
})

let transactions = []
// let a = [
//     {
//     username: 'anand',
//     itemname: 'Cheese Sandwitch',
//     paid : 120,
//     date : '12July2020',
//     billno : 'XYZ456789'
//     }
// ]; 


app.get("/", (request, response) => {
    console.log("Get request Accepted")
    
});


app.get("/itemsBought", (request, response) => {
    let uname = request.query.username;
    let date = request.query.date;
    console.log(uname, date)
    let result = []
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
    // for (i=0; i<transactions.length; i++)    {
    //     console.log(transactions[i])
    //     if(transactions[i].username == uname && transactions[i].date == date)
    //     {
    //         result.push(transactions[i]);
    //     }
    // }
    
    
    
});

app.post("/newPurchase", (request, response) => {
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
});

