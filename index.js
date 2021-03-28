const express = require('express');
const path = require('path');
const { isBuffer } = require('util');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//         // Middleware 1
// app.use(function(req,res,next){
//     console.log('mW1 is called');
//     next();
// });
//         //  Middleware 2
// app.use((req,res,next)=>{
//     console.log("mw2 is called");
//     next();
// });


var contactList = [
    {
        name: "Kunal",
        phone: "7526838567"
    },
    {
        name: "Riya",
        phone: "9038810813"
    },
    {
        name: "bjnkink",
        phone: "1234567890"
    }
]

app.get('/', function (req, res) {
    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log("Error in fetching contacts from db", err);
            return;
        } return res.render('home', {
            title: "My Contacts List",
            contact_list: contacts
        });

    })


})

app.get('/practice', (req, res) => {
    return res.render('practice', { title: 'I play' });
});

app.post('/create-contact', (req, res) => {
    // contactList.push(
    //     {
    //         name: req.body.name,
    //         phone: req.body.phone
    //     });

    // contactList.push(req.body);
    // return res.redirect('back');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log('There is some issue in creating new Contact', err);
            return;
        }
        console.log('**********', newContact);
        return res.redirect('back');
    });

});
// for deleting contact
app.get('/delete-contact', function (req, res) {
    // get id from the query in the url
    console.log(req.query);
    let id = req.query.id;

    // find the contact in db using id and delete
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("error in deleting a object from db", err);
            return;
        }
        return res.redirect('back');
    });
   
    
});


app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Yup! my express server is running on Port:", port);
    }
});