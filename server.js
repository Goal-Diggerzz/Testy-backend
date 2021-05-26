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
const BlogUser = require('./Model/blogModel');
app.use(express.json());
const Cheff = require('./Model/userModel');
const getBlog =require('./controller/addBlog')

mongoose.connect('mongodb://localhost:27017/cheff', { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});


app.get('/', function (req, res) {
    res.send('homepage')
})

app.get('/nute', recipesGet)



app.post('/cheff', userRecipes.addFavRecipe);
app.get('/cheff',  userRecipes.getMyRecipes);

app.delete('/cheff/:index', deletRecipesFunc);

function deletRecipesFunc(req, res) {
    const index = Number(req.params.index);
    console.log('this is the index', req.params.index);
    const { label} = req.body;
    // console.log('this is the email ', label);
    Cheff.find({ label: label }, (err, userRecipe) => {
        const newRecipeArr = userRecipe[0].myRecipes.filter((b, idx) => {
            return idx !== index;
        });
        userRecipe[0].myRecipes = newRecipeArr;
        userRecipe[0].save();
        res.send('The Recipe has been deleted!');



    });


}

app.get('/blog',getBlog)
app.post('/blog', addBlogFunc);



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
    const { email,title, text, userName, Image } = req.body;
    BlogUser.find({ email: email }, (err, blogData) => {
        if(blogData.length===0){
        let blogCollection = new BlogUser({
            email:email,
            blog:
            [{title: title,
            text: text,
            userName: userName,
            Image: Image}]
        })
        blogCollection.save();
        res.send(blogCollection)
        }
        else {
            blogData[0].blog.push({
                title: title,
                text: text,
                userName: userName,
                Image: Image,
            })
            console.log(blogData);
            blogData[0].save();
            res.send(blogData[0].blog)
        }
    })
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});