const { MongoClient } = require('mongodb');
var express = require('express');
var multer = require('multer');
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var dbName = "CURD";
var blogCollection = "blog"
var commentCollection = "comment"
//mongoDB configurations
const uri = "mongodb+srv://harinath1314:harinath1314@cluster0.md1bc.mongodb.net/CURD?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect();

var upload=multer({dest:"uploads/"});

app.post("/upload",upload.single("file"),function(req,res){
    res.send(req.file.filename);
});

app.post('/blogCreate', (req, res) => {
    console.log("hello post is ")
    console.log(req.body)
    blogCreateOperation(client, req.body)
    res.send("sucess")
})
app.post('/blogUpdate', (req, res) => {
    console.log(req.body)
    blogUpdateOperation(client, req.query.name, req.body);
    res.send("sucess")
})
app.get('/blogRead', (req, res) => {
    console.log("blog Read")
    blogReadOperation(client, req.query.name);
    res.send("sucess")
})
app.get('/blogDelete', (req, res) => {
    console.log(req.body)
    blogDeleteOperation(client, req.query.name);
    res.send("sucess")
})

app.post('/commentCreate', (req, res) => {
    commentCreateOperation(client, req.body);
    res.send("sucess");
})
app.post('/commentUpdate', (req, res) => {
    commentUpdateOperation(client, req.query.name, req.body);
    res.send("sucess");
})
app.get('/commentRead', (req, res) => {
    commentReadOperation(client, req.query.name);
    res.send("sucess")
})
app.get('/commentDelete', (req, res) => {
    commentDeleteOperation(client, req.query.name);
    res.send("sucess")
})


async function blogCreateOperation(client, newListing) {

    const result = await client.db(dbName).collection(blogCollection).insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
};

async function blogReadOperation(client, nameOfListing) {
    result = await client.db(dbName).collection(blogCollection)
        .findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function blogUpdateOperation(client, nameOfListing, updatedListing) {
    result = await client.db(dbName).collection(blogCollection)
        .updateOne({ name: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function blogDeleteOperation(client, nameOfListing) {
    result = await client.db(dbName).collection(blogCollection)
        .deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}



async function commentCreateOperation(client, newListing) {

    const result = await client.db(dbName).collection(commentCollection).insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
};

async function commentReadOperation(client, nameOfListing) {
    result = await client.db(dbName).collection(commentCollection)
        .findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function commentUpdateOperation(client, nameOfListing, updatedListing) {
    result = await client.db(dbName).collection(commentCollection)
        .updateOne({ name: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function commentDeleteOperation(client, nameOfListing) {
    result = await client.db(dbName).collection(commentCollection)
        .deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

app.listen(port, () => {
    console.log("port is startd",port)
})