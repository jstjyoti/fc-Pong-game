//code for reading writing to db and displaying on main.html
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://Jyoti:2hMn4dRSebDqCtxr@users-nbybu.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, db) {

    var cursor = db.collection('Employee').find();

    cursor.each(function(err, doc) {

        console.log(doc);

    });
});