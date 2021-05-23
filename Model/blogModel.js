const mongoose = require('mongoose');
const { Schema } = mongoose;


// blogModel{
// 	title: ""
// 	text: ""
// 	userName:""
// 	Image:""
// }

const blogSchema = new Schema ({
    title: String,
    text: String,
    userName: String,
    Image: String,
})

const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;