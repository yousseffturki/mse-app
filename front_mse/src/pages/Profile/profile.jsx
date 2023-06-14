import React from 'react'
import "./profile.css"

const Profile = () => {
  const user = {
    name: 'John Doe',
    bio: 'Web Developer',
    email: 'johndoe@example.com',
    profilePicture: 'https://example.com/profile-picture.jpg',
  };
  return (
    <div className="profile">
      <img className="profile-picture" src={`${process.env.REACT_APP_BASE_URL}/api/userImages/${localStorage.getItem('image')}`} alt="Profile" />
      <h2 className="profile-name">{localStorage.getItem("first_name")} {localStorage.getItem("last_name")}</h2>
      <p className="profile-bio">{localStorage.getItem("role")}</p>
    </div>
  )
}

export default Profile
