const superagent = require('superagent')


class Food {
    constructor(data) {
        this.label = data.label;
        this.calories = data.calories
        this.img = data.image
        this.ingredients = data.ingredientLines
    }
}

function recipesGet(req, res) {
    query = req.query.q
    try {
        const testApi2 = `https://api.edamam.com/search?app_key=483d48687c5cf962706b9e8f1fe9b82e&app_id=a9a6d2ec&q=${query}`;
        superagent.get(testApi2).then(foodData => {
            const newArr = foodData.body.hits.map(data => new Food(data.recipe)

            )
            // console.log(`this is the new array`,newArr);
            res.send(newArr);
        })

    } catch (error) {
        res.send = ('not working')
    }
}

module.exports = recipesGet;