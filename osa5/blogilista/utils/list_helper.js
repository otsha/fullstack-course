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

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else if (blogs.length === 1) {
        return {
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    } else {
        let authorsAndLikes = new Map()

        blogs.map(blog => [blog.author, blog.likes]).forEach(post => {
            const author = post[0]
            const likes = post[1]

            if (!authorsAndLikes.has(author)) {
                authorsAndLikes.set(author, likes)
            } else {
                authorsAndLikes.set(author, authorsAndLikes.get(author) + likes)
            }
        })

        let authorKeys = Array.from(authorsAndLikes.keys())
        let most = authorKeys[0]
        for (let i = 0; i < authorKeys.length; i++) {
            const current = authorKeys[i]
            if (authorsAndLikes.get(current) > authorsAndLikes.get(most)) {
                most = current
            }
        }

        return {
            author: most,
            likes: authorsAndLikes.get(most)
        }
    }
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }