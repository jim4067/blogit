const _ = require('lodash');

const dummy = (blogs) => {
    blogs = 1;
    return blogs;
}

const total_likes = (blogs) => {
    const likes = blogs.map((blog_param) => blog_param.likes);
    return likes.reduce((cur_val, acc) => cur_val + acc )
}

const favorite_blog = (blogs) => {
    const favorite =  blogs.reduce((max, cur_val) => max.likes > cur_val.likes ? max : cur_val, blogs[0]);
    return {
        "title" : favorite.title,
        "author" : favorite.author,
        "likes" :favorite.likes
    };
}

function most_blogs(blogs) {
    const authors = blogs.map(param => param.author);
    const most_blogs = authors.reduce((acc, next) => {
        acc[next] = (acc[next] || 0) + 1;
        return acc
    }, {});

    let max = 0;
    _.forIn(most_blogs, (val, key) => {
        if (val > max) {
            max = val;
        }
    });

    let blog = {};
    _.forIn(most_blogs, (val, key) => {
        if (val === max) {
            blog = {
                "author": `${key}`,
                "blogs": `${val}`
            }
        }
    });
    return blog;
}

module.exports = {
    dummy,
    total_likes,
    favorite_blog,
    most_blogs
}

