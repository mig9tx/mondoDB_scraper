const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

//Our scraping tools
//Axios is a promised-based http library, similar to jQuery's Ajax method
//It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

//Require all models
const db = require("./models");

const PORT = 3000;

//Initialize Express
const app = express();

//Configue middleware

//Use morgan logger for logging requests
app.use(logger("dev"));
//Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
//Make public static folder
app.use(express.static("public"));

//Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoDB_scraper", {
    useNewUrlParser: true
});

//Routes

//A GET route for scraping the "_______" website
app.get("/scrape", function (req, res) {
    //First, we grab the body of the html with axios
    axios.get("https://www.goodnewsnetwork.org/").then(function (response) {
        //Then, we load that into cheerio and save it to $ for a shorthand selector
        let $ = cheerio.load(response.data);

        //Now, we grab every h3 within an article tag, and do the following:
        $("h3").each(function (i, element) {
            //save an empty result object
            let result = {};

            // Add the text and href of every link, and save them
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            //Create a new article using the 'result' object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    //If an error occurred, log it
                    console.log(err);
                });
        });

        //send a message to the client
        res.send("Scrape Complete");
    });
});

//Route for getting all Articles from the db
app.get("/articles", function (req, res) {
    //TODO: Finish the route so it grabs all of the articles
    db.Article.find({})
        .populate("articles")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
    //TODO
    //====
    db.Article.findOne({
            _id: req.params.id
        })
        // and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            //if we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            //if error occurred, send it to the client
            res.json(err);
        });
});


//Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
    // create a new note and pas the req.body to the entry
    db.Note.create(req.body)
        .then(function (dbNote) {
            //if a note was created successfully, find on Article with an `_id` equal to `req.params.id`. Update the Article
            //{ new: true} tells the query that we want it to return the updated User -- it returns the original by deafault
            // Since our mongoose query returns a promise, we can chain another '.then' which receives the result of the query
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbNote._id
            }, {
                new: true
            });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});