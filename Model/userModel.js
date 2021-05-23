const mongoose = require('mongoose');
const { Schema } = mongoose;



const recipesSchema = new Schema({
    recipeName: String,
    recipe: String,
    calories: Number,
    ingredients: [],
});
const userSchema = new Schema({
    email: String,
    name: String,
    myRecipes: [recipesSchema],
});


const Cheff = mongoose.model('Cheff', userSchema);

module.exports = Cheff;



// userModel{
// 	email: ""
// 	name:""
// 	myRecipes:[]
// }

// blogModel{
// 	title: ""
// 	text: ""
// 	userName:""
// 	Image:""
// }
// recipesModel{
// 	recipeName:""
// 	recipe:""
// 	calories:
// 	ingredients:	
// }