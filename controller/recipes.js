const superagent = require('superagent')


class Food {
    constructor(data) {
        this.label = data.label;
       this.calories=data.calories
        this.img = data.image
        this.ingridients=data.ingredientLines
    }
}

function recipesGet(req, res) {
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
}

module.exports = recipesGet;