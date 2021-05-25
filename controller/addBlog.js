const superagent = require('superagent')
const BlogUser=require('../Model/blogModel')

class Food {
    constructor(data) {
        this.label = data.label;
        this.calories = data.calories
        this.img = data.image
        this.ingridients = data.ingredientLines
    }
}

function getBlog(req, res) {
    console.log('query',req.query);
    const email=req.query.email
    BlogUser.find({email:email}, function (err, User) {
        if (err) return console.error(err);
        console.log(User[0]);
        res.send(User[0].blog);
      });}
    

module.exports = getBlog;