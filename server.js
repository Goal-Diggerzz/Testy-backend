const express = require('express')
const app = express()
const superagent = require('superagent')
require('dotenv').config();
// const mongoose = require('mongoose');
let newArr = [];
let foodArr2 = [];

const PORT = process.env.PORT || 3001
// const Cheff = require('./Model/userModel');

// // mongoose.connect('mongodb://localhost:27017/cheff', { useNewUrlParser: true, useUnifiedTopology: true });
// // const db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'connection error:'));
// // db.once('open', () => console.log('mongodb is connected!'));


// recipeName: String,
// recipe: String,
// calories: Number,
// ingredients: String,

// const guest = new Cheff({
//     email: 'sa3d1994@gmail.com',
//     name: 'saed',
//     myRecipes: [
//         {
//             recipeName: 'Mansaf',
//             recipe: `I dont know how to make Mansaf :P`,
//             calories: 'about 1 million',
//             ingredients: ['rice', 'ghee', 'chicken']
//         },
//         {
//             recipeName: 'Mansaf',
//             recipe: `I dont know how to make Mansaf :P`,
//             calories: 'about 1 million',
//             ingredients: ['rice', 'ghee', 'chicken']
//         },
//         {
//             recipeName: 'Mansaf',
//             recipe: `I dont know how to make Mansaf :P`,
//             calories: 'about 1 million',
//             ingredients: ['rice', 'ghee', 'chicken']
//         }
//     ],
// });

// //   use save when you seed the database, comment out when you finish seeding the database 
// //   guest.save(function (err) {
// //   if (err) console.err(err);
// //   else console.log('saved successfully!');
// // });


app.get('/', function (req, res) {
    res.send('homepage')
})

app.get('/nute', function (req, res) {
    try {
        const testApi2 = `https://api.edamam.com/search?app_key=${process.env.API_KEY}&app_id=${process.env.API_ID}&q=mansaf`;
        superagent.get(testApi2).then(foodData2 => {

            // foodArr2.push(foodData2.body.hits[0].recipe.ingredients.map(index => new Food(index)));
            // console.log(foodArr2);
            // console.log(foodData2.body.hits.length);
            for (let i = 0; i < foodData2.body.hits.length; i++) {
                newArr.push([foodData2.body.hits[i].recipe.label, foodData2.body.hits[i].recipe.image, foodData2.body.hits[i].recipe.ingredientLines, foodData2.body.hits[i].recipe.ingredients, `Total Calories`, foodData2.body.hits[i].recipe.calories, `Total Weight`, foodData2.body.hits[i].recipe.totalWeight, `Total Time`, foodData2.body.hits[i].recipe.totalTime, `Cuisine Type`, foodData2.body.hits[i].recipe.cuisineType, `Meal Type`, foodData2.body.hits[i].recipe.mealType, `Dish Type`, foodData2.body.hits[i].recipe.dishType])
            }
            res.send(newArr);
        })

    } catch (error) {
        res.send = ('not working')
    }
})

// app.post('/cheff', (req, res) => {
//     Cheff.find({ email: req.body.email }, (err, result) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         if (result.length < 1) {
//             res.status(400).send('User does not exist');
//         } else {
//             result.myRecipes.push({
//                 recipeName: req.myRecipes, recipeName,
//                 recipe: req.myRecipes.recipe,
//                 calories: req.myRecipes.calories,
//                 ingredients: req.myRecipes.ingredients
//             });
//             // guest.save();
//             //   .then(result => {
//             //     res.send(result);
//             //   });
//         }
//     });
// });
// class Food {
//     constructor(data) {
//         this.text = data.text;
//         this.weight = data.weight
//         this.foodCategory = data.foodCategory;
//         this.foodId = data.foodId
//         this.img = data.image
//     }
// }
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});