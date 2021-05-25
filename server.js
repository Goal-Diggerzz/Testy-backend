const express = require('express')
const app = express()
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors())
const PORT = process.env.PORT || 3001
const userRecipes = require('./controller/userRecipes');
// const getMyRecipes = require('./controller/userRecipes');
const recipesGet = require('./controller/recipes');
const blogModel = require('./Model/blogModel');
app.use(express.json());
const Cheff = require('./Model/userModel');

mongoose.connect('mongodb://localhost:27017/cheff', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', function (req, res) {
    res.send('homepage')
})

app.get('/nute', recipesGet)


app.post('/cheff', userRecipes.addFavRecipe);
app.get('/cheff',  userRecipes.getMyRecipes);
app.delete('/cheff/:index', deletRecipesFunc);

function deletRecipesFunc(req, res) {
    const index = Number(req.params.index);
    // console.log('this is the index', Number(index));
    const { label, calories, img, ingredients } = req.body;
    // console.log('this is the email ', label);
    Cheff.find({ label: label }, (err, userRecipe) => {
        const newRecipeArr = userRecipe.Cheff.filter((b, idx) => {
            return idx !== index;
        });
        userRecipe.Cheff = newRecipeArr;
        userRecipe.save();
        res.send('The blog has been deleted!');



    });


}


// app.post('/blogs', addBlogFunc);



// app.delete('/blogs/:index', deleteBlogFunc);

// function deleteBlogFunc(req, res) {
//     const index = Number(req.params.index);
//     console.log('this is the index', index);
//     const { title, text, userName, Image } = req.body;
//     console.log('this is the email ', title);
//     blogModel.find({ userName: userName }, (err, userBlog) => {
//         const newBlogArr = userBlog[0].blogModel.filter((b, idx) => {
//             return idx !== index;
//         });
//         userBlog[0].blogModel = newBlogArr;
//         userBlog[0].save();
//         res.send('The blog has been deleted!');



//     });


// }


function addBlogFunc(req, res) {
    const { title, text, userName, Image } = req.body;
    blogModel.find({ userName: userName }, (err, blogData) => {
        const blogCollection = new blogModel({
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