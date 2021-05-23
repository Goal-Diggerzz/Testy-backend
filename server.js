const express = require('express')
const app = express()
const superagent = require('superagent')
require('dotenv').config();
// const mongoose = require('mongoose');
let newArr = [];
let foodArr2 = [];
const cors =require ('cors');
const { query } = require('express');
app.use(cors())
const PORT = process.env.PORT || 3001
const Cheff = require('./Model/userModel');

// // mongoose.connect('mongodb://localhost:27017/cheff', { useNewUrlParser: true, useUnifiedTopology: true });
// // const db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'connection error:'));
// // db.once('open', () => console.log('mongodb is connected!'));


// recipeName: String,
// recipe: String,
// calories: Number,
// ingredients: String,



//   use save when you seed the database, comment out when you finish seeding the database 
//   guest.save(function (err) {
//   if (err) console.err(err);
//   else console.log('saved successfully!');
// });


app.get('/', function (req, res) {
    res.send('homepage')
})

app.get('/nute', function (req, res) {
    query=req.query
    try {
        const testApi2 = `https://api.edamam.com/search?app_key=${process.env.API_KEI}&app_id=${process.env.API_ID}&q=${query}`;
        superagent.get(testApi2).then(foodData => {
const newArr= foodData.body.hits.map(data=> new Food(data.recipe)
    
)
           console.log(newArr);
            res.send(newArr);
        })

    } catch (error) {
        res.send = ('not working')
    }
})

app.post('/cheff',addFavRecipe );
class Food {
    constructor(data) {
        this.label = data.label;
       this.calories=data.calories
        this.img = data.image
        this.ingridients=data.ingredientLines
    }
}
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});