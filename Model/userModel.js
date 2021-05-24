const mongoose = require('mongoose');
const { Schema } = mongoose;



const recipesSchema = new Schema({
    label: String,
    img: String,
    calories: Number,
    ingredients: [],
});
const userSchema = new Schema({
    email: String,
    myRecipes: [recipesSchema],
});


const Cheff = mongoose.model('Cheff', userSchema);

module.exports = Cheff;
