const superagent = require('superagent')
const BlogUser=require('../Model/blogModel')



function getBlog(req, res) {
    // console.log('query',req.query);
    BlogUser.find( function (err, User) {
        if (err) return console.error(err);
        // console.log(User);
        res.send(User);
      });
    }

        function deleteBLog  (req, res)  {
        const index = Number(req.params.index);
        // console.log('params',req.params);
        const { email } = req.query;
        // console.log('index',index);
        BlogUser.find({ email: email }, (err, data) => {
      
          const newBlogsData = data.map((arr) =>arr.blog.filter((blog,idx)=>{
            // console.log('blog',blog);
            return idx !== index;
            })
          );
          // console.log('before',(newBlogsData[0]));
          data[0].blog = newBlogsData[0];
          // console.log('data',data);
           data[0].save();
      
          
        });
      }


module.exports = {deleteBLog,getBlog};
