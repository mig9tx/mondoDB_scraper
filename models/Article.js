const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

//Using the Schema constructor, create a new UserSchema object
//Similar to the Sequelize model

const ArticleSchema = new Schema({
    // `title` is required and of type String
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    //`note` is an object tht stores a Note id
    //the ref property links the ObjectId to the Note model
    //This allows us to populate the article with an associated Note
    note: 
        {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }

});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;