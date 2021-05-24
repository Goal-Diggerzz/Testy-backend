const Cheff = require('../Model/userModel');


<<<<<<< HEAD
function addFavRecipe(req, res){
    const {email,img,calories,label,ingredients} = req.body;
    Cheff.find({ email: email }, (err, result) => {
        if (result.length == 0) {
            let newUser = new Cheff(
                {
                   email:email,
                   myRecipes:
                   [
                       {
                           label:label,
                           img:img,
                           calories:calories,
                           ingredients: ingredients,
                        }
                    ]
                }
                )
                // console.log(`newUser:${newUser[0]}`)
                newUser.save();
                res.send(newUser[newUser.length-1]);
    }
    else {
        // console.log(result)
        result[0].myRecipes.push({
            label:label,
            img:img,
            calories:calories,
            ingredients:ingredients,
        });
        // console.log(result)
        result[0].save();
        res.send(result[0]);
    }
});
=======
function addFavRecipe(req, res) {


    const { name, img, calories, label, ingredients } = req.body;
    Cheff.find({ name: name }, (err, result) => {
        if (result.length == 0) {
            let newUser = new Cheff(
                {
                    name: name,
                    myRecipes:
                        [
                            {
                                label: label,
                                img: img,
                                calories: calories,
                                ingredients: ingredients,
                            }
                        ]
                }
            )
            // console.log(`newUser:${newUser[0]}`)
            newUser.save();
            res.send(newUser);
        }
        else {
            // console.log(result)
            result[0].myRecipes.push({
                label: label,
                img: img,
                calories: calories,
                ingredients: ingredients,
            });
            // console.log(result)
            result[0].save();
            res.send(result[0]);
        }
    });
>>>>>>> 05be4b0f85101a26e4eeecdd85560db253cfbccb
}

module.exports = addFavRecipe;