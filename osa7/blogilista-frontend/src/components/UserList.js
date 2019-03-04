import React, { useEffect } from 'react'
import { initUsers } from '../reducers/userReducer'
import { connect } from 'react-redux'

const UserList = (props) => {
  useEffect(() => {
    props.initUsers()
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <th>Username</th>
          <th># of posts</th>
        </tr>
        {props.users.map(u =>
          <tr key={u.id}>
            <td>{u.username}</td>
            <td>{u.blogs.length}</td>
          </tr>)}
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.allUsers
  }
}

const mapDispatchToProps = {
  initUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)