const mongoose = require('mongoose');

const blog_schema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

blog_schema.set( 'toJSON', {
    transform: (document, return_object) => {
        return_object.id = return_object._id.toString();
        delete return_object._id;
        delete return_object.__v;
    }
} );

const Blog = mongoose.model('Blog', blog_schema);

module.exports = Blog;