const Cheff = require('../Model/userModel');


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
}

module.exports = addFavRecipe;