const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/contactFormDB";

const ContactQuery = require('./models/contact');

app.set('view engine', 'ejs');
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/contact-page", (req, res, next) => {
    res.render("contact-page.ejs");
});

app.get("/query-list", (req, res, next) => {
    ContactQuery.find()
        .then(queries => {
            res.render("query-list.ejs", {
                queries: queries
            });
        })
        .catch(err => console.log(err));
    
});

app.post("/contact-page", (req, res, next) => {
    const name = req.body.name;
    const email = String(req.body.email);
    const mobileNumber = req.body.mobileNumber;
    const subject = req.body.subject;
    const description = req.body.description;

    const query = new ContactQuery({
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        subject: subject,
        description: description
    });

    query.save()
        .then(result => {
            console.log(result);
            console.log("Query Submitted");
            res.redirect("/query-list");
        })
        .catch(err =>{
            console.log(err);
            res.redirect("/contact-page");
        });
    
});

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(8080, () => {
            console.log("Server Started, Connection Successful");
        })
    })
    .catch((err) => {
        console.log("Unable to Connect With Database");
        console.log(err);
    })