const mongoose = require('mongoose');
const unique_validator = require('mongoose-unique-validator');

mongoose.set('useCreateIndex', true);

const user_schema = mongoose.Schema({
    username: {
        type: String,
        unique : true
    },
    name : String,
    password_hash :{
        required : true,
        type :  String,
    },
    blogs : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Blog'
        }
    ]
});

user_schema.plugin(unique_validator);

user_schema.set('toJSON', {
    transform : (document, returned_object) => {
        returned_object.id = returned_object._id.toString();
        delete returned_object._id;
        delete returned_object.__v;
        delete returned_object.password_hash;
    }
});

const User = mongoose.model('User' , user_schema );

module.exports = User;