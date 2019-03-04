import React, { useEffect } from 'react'
import { initUsers } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from './User'

const UserList = (props) => {
  useEffect(() => {
    props.initUsers()
  }, [])

  const findOneUser = (id) => {
    return props.users.find(u => u.id === id)
  }

  return (
    <div>
      <h1>Users</h1>
      <Router>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Username</th>
                <th># of posts</th>
              </tr>
              {props.users.map(u =>
                <tr key={u.id}>
                  <td><Link to={`/api/users/${u.id}`}>{u.username}</Link></td>
                  <td>{u.blogs.length}</td>
                </tr>
              )}
            </tbody>
          </table>
          <Route exact path='/api/users/:id' render={({ match }) => <User user={findOneUser(match.params.id)} />} />
        </div>
      </Router>
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