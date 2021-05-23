const mongoose = require('mongoose');
const { Schema } = mongoose;



const recipesSchema = new Schema({
    recipeName: String,
    img: String,
    calories: Number,
    ingredients: [],
});
const userSchema = new Schema({
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

addFavRecipe= (req, res) => {
    const {name,img,calories,label,ingredients}=req.body
    Cheff.find({ name: name }, (err, result) => {
        if (result===undefined) {
           const newUser= (
               {
                   name:name,
                   myRecipes:
                   [
                       {
                           label:label,
                           img:img,
                           calories:calories,
                           ingredients:ingredients,
                       }
                   ]
               }
           )
       newUser[0].save();
        }
     else {
            result[0].myRecipes.push({
                label:label,
                img:img,
                calories:calories,
                ingredients:ingredients,
            });
            newUser[0].save();
          
        }
    });
}