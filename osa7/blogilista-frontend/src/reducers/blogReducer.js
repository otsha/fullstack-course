import blogService from '../services/blogs'

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITBLOGS',
      data: blogs
    })
  }
}

export const postBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.postNew(blogObject)

    dispatch({
      type: 'NEWBLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'DELETEBLOG',
      data: blog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    blog.likes = blog.likes + 1
    const likedBlog = await blogService.update(blog)
    dispatch({
      type: 'LIKEBLOG',
      data: likedBlog
    })
  }
}

export const commentBlog = (comment) => {
  return async dispatch => {
    const sentComment = await blogService.postComment(comment)
    console.log(sentComment)
    const blogs = await blogService.getAll()
    console.log(blogs)
    dispatch({
      type: 'INITBLOGS',
      data: blogs
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEWBLOG':
      return state.concat(action.data)
    case 'DELETEBLOG':
      return state.filter(b => b.id !== action.data.id)
    case 'LIKEBLOG':
      return state.map(b => b.id === action.data.id ? action.data : b)
    case 'INITBLOGS':
      return action.data
    default:
      return state
  }
}

export default reducer