const express = require('express')
const app = express()
require('dotenv').config();
const mongoose = require('mongoose');
const cors =require ('cors');
app.use(cors())
const PORT = process.env.PORT || 3001
const addFavRecipe = require('./controller/userRecipes');
const recipesGet = require('./controller/recipes');
const blogModel = require('./Model/blogModel');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cheff', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', function (req, res) {
    res.send('homepage')
})

app.get('/nute', recipesGet )


app.post('/cheff', addFavRecipe );
app.get('/cheff', addFavRecipe );


app.post('/blogs', addBlogFunc)

function addBlogFunc(req, res){
    const {title, text, userName, Image} = req.body;
    blogModel.find({userName : userName}, (err, blogData) => {
        const blogCollection = new blogModel ({
            title: title,
            text: text,
            userName: userName, 
            Image: Image,
        })
        blogData.save();
        res.send(blogData); 
    })
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});