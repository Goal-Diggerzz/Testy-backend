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
});
const blogUserSchema =new Schema ({
    email:String,
    blog:[blogSchema]
})

const Blog = mongoose.model('Blog', blogSchema);
const BlogUser = mongoose.model('BlogUser', blogUserSchema);

module.exports = BlogUser;