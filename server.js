
var express = require('express');
var app = express();
var mongojs = require('mongojs');
//var db = mongojs('addresslist', ['addresslist']);
var db = mongojs('AddressBook', ['AddressBook']);
var bodyParser = require('body-parser');


/*app.get('/', function (req, res) {
    res.send("Hello world form server.js")
});*/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//app.get('/addresslist', function (req, res) {
app.get('/AddressBook', function (req, res) {
    console.log("This just received a GET request");

    db.AddressBook.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });

    //Hard coded entries for the people's addresses without using mongodb
    //person1 = {
    //    name: 'Anna',
    //    street: '111 Main st. apt 11',
    //    zip: '11111'
    //};
    //
    //person2 = {
    //    name: 'Sana',
    //    street: '112 Main st. apt 11',
    //    zip: '11211'
    //};
    //
    //person3 = {
    //    name: 'Sara',
    //    street: '131 Main st. apt 11',
    //    zip: '11211'
    //};
    //
    //person4 = {
    //    name: 'Jese',
    //    street: '114 Main st. apt 11',
    //    zip: '11131'
    //};
    //
    //var addresslist =[person1, person2, person3, person4];
    //res.json(addresslist);

});

app.post('/AddressBook', function (req, res) {
    console.log(req.body);
    db.AddressBook.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.delete('/AddressBook/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.AddressBook.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/AddressBook/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.AddressBook.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.put('/AddressBook/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.id);
    db.AddressBook.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {name: req.body.name, address: req.body.address, zip: req.body.zip}},
            new: true}, function (err, doc) {
            res.json(doc);
        }
    );
});

app.listen(3000);
console.log("Server running on port 3000");