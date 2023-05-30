import './index.css'

const Users = props => {
  const {item, UpdateUserDetails, getUserList} = props

  const EditUser = id => {
    UpdateUserDetails(id)
  }

  const RemoveUser = async id => {
    const url = `http://localhost:3006/users/${id}`
    const options = {
      method: 'DELETE',
    }
    await fetch(url, options)

    getUserList()
  }

  return (
    <ul className="users-list">
      {item.map(each => (
        <li className="each-user" key={each.id}>
          <p className="each-name">{each.name}</p>
          <div className="btn-container">
            <button
              type="button"
              className="edit-btn"
              onClick={() => EditUser(each.id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => RemoveUser(each.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Users
