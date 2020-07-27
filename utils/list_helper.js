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


module.exports = {
    dummy,
    total_likes,
    favorite_blog
}

