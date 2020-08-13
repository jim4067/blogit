const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const login_router = require('express').Router();
const User = require('../models/user');

login_router.post('/', async (req, res) => {
    const body = req.body;
    const username = body.username; //this -> debuggind

    const user = await User.findOne({username}); //this -> debugging {username}

    const password_correct = user === null
        ? false
        : await bcrypt.compare(body.password, user.password_hash);

    if (!password_correct) {
        return res.status(401).json({
            error: "incorrect password"
        });
    }

    const user_for_token = {
        username: username,
        id: user._id,
    }

    const token = jwt.sign(user_for_token, process.env.SECRET);

    res
        .status(200)
        .send({ token, username: user.username, name: user.name });
});

module.exports = login_router;