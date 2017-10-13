var mongoose = require("mongoose");

//1. Create Schema
var storySchema = mongoose.Schema(
    {
        title: {type: String, unique: true},
        author: String,
        content: String,
        slug: String        
    }
);

//2. Create model (lets also specify collection's name this time)
mongoose.model("storyModel", storySchema, "Stories");
