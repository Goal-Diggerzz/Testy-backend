const Cheff = require('../Model/userModel');


function getMyRecipes(req, res) {
    const { email } = req.query;
    // console.log(`this is q`,email);
    Cheff.find({ email: email }, function (err, result) {
        if (err) res.send('didnt work');
        // console.log(`am here`,result[0].myRecipes);
        res.send(result[0].myRecipes);
    });
}
function addFavRecipe(req, res) {
    const { img, calories, label, ingredients,email } = req.body;

    Cheff.find({ email: email }, (err, result) => {
        if (result.length == 0) {
            let newUser = new Cheff(
                {

                    email: email,
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

}

module.exports = {addFavRecipe,getMyRecipes};