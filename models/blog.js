const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const blog_schema = mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    author: {
        type: String
    },
    url: {
        type: String
    },
    likes: {
        type: Number,
        default : 0
    },
    comments: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
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