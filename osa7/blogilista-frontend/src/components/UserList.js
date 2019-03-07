import React, { useEffect } from 'react'
import { initUsers } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from './User'
import { Table } from 'semantic-ui-react'

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
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell># of posts</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {props.users.map(u =>
                <Table.Row key={u.id}>
                  <Table.Cell><Link id={u.username} to={`/api/users/${u.id}`}>{u.username}</Link></Table.Cell>
                  <Table.Cell>{u.blogs.length}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
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