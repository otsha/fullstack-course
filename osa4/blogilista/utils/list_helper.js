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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else if (blogs.length === 1) {
        const res = {
            author: `${blogs[0].author}`,
            blogs: 1
        }

        return res
    } else {
        let authors = new Map()
        blogs.map(blog => blog.author).forEach(author => {
            if (!authors.has(author)) {
                authors.set(author, 1)
            } else {
                authors.set(author, authors.get(author) + 1)
            }
        })

        let authorKeys = Array.from(authors.keys())
        let most = authorKeys[0]
        for (let i = 0; i < authorKeys.length; i++) {
            const current = authorKeys[i]
            if (authors.get(current) > authors.get(most)) {
                most = current
            }
        }

        return {
            author: most,
            blogs: authors.get(most)
        }
    }
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs }