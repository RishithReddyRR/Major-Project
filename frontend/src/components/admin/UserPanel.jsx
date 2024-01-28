import React from 'react'
import SideBar from './SideBar'
import "./UserPanel.scss"
const UserPanel = () => {
  return (
    <div className='dashboard'>
        <SideBar/>
        <div>
            <div className="row">
                <h2>S.no</h2>
                <h2>Name</h2>
                <h2>Email</h2>
                <h2>Role</h2>
            </div>
        </div>

    </div>
  )
}

export default UserPanel