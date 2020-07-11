const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blog_router = require('./controllers/blogs')

const app = express();

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology:true} )
        .then( () => {
            logger.info("connected to mongoDB")
        })
        .catch((err) => {
            logger.error("error connecting to mongoDB...", err.message); 
        });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blog_router)

app.use(middleware.request_logger);
app.use(middleware.unknown_endpoint);
app.use(middleware.error_handler);

module.exports = app;