const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, next) => {
        return sum + next
    }

    return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else if (blogs.length === 1) {
        return blogs[0]
    } else {
        let favourite = blogs[0]

        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].likes > favourite.likes) {
                favourite = blogs[i]
            }
        }

        return favourite
    }
}

module.exports = { dummy, totalLikes, favouriteBlog }