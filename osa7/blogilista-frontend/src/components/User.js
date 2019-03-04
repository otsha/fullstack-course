import React from 'react'

const User = ({ user }) => {
  if (user === undefined) {
    return null
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h5>{user.name}</h5>
      <h3>Blogs created by this user:</h3>
      <ul>
        {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default User