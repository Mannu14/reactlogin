import React from 'react';
import '../styles/Mainprofile.css';

function MainProfile({ user, users, user_Quiz }) {
  return (
    <>
      <header className="header">
        <section className="flex">
          <a href="home.html" className="logo">Manish.</a>
          <form action="search.html" method="post" className="search-form">
            <input type="text" name="search_box" required placeholder="search courses..." maxLength="100" />
            <button type="submit" className="fas fa-search"></button>
          </form>
          <div className="icons">
            <div id="menu-btn" className="fas fa-bars"></div>
            <div id="search-btn" className="fas fa-search"></div>
            <div id="user-btn" className="fas fa-user"></div>
            <div id="toggle-btn" className="fas fa-sun"></div>
          </div>
          <div className="profile">
            <img id="profile-img-preview-header" src={user.image} className="image" alt="" />
            <h3 className="name">{user.firstname} {user.lastname}</h3>
            <p className="role">student</p>
            <a href="profile.html" className="btn">view profile</a>
            <div className="flex-btn">
              <a href="login.html" className="option-btn">login</a>
              <a href="register.html" className="option-btn">register</a>
            </div>
          </div>
        </section>
      </header>

      <div className="container">
        <div className="left-container side-bar">
          <div id="close-btn">
            <i className="fas fa-times"></i>
          </div>
          <div className="profile">
            <img id="profile-img-preview" src={user.image} className="image" alt="" />
            <h3 className="name">{user.firstname} {user.lastname}</h3>
            <p className="role">student</p>
            <button className="btn">User profile</button>
          </div>
          <nav className="navbar">
            <a href="index.html"><i className="fas fa-home"></i><span>home</span></a>
            <a href="project.html"><i className="fas fa-w"></i><span>project</span></a>
            <a href="courses.html"><i className="fas fa-graduation-cap"></i><span>courses</span></a>
            <a href="teachers.html"><i className="fas fa-chalkboard-user"></i><span>teachers</span></a>
            <a href="contact.html"><i className="fas fa-headset"></i><span>contact us</span></a>
          </nav>
        </div>

        <div className="right-container">
          <section className="about">
            {/* Rest of your JSX content */}
          </section>
        </div>
      </div>

      <footer className="footer">
        {
          Array.from({ length: 22 }, (_, index) => (
            <React.Fragment key={index}>&copy; copyright @ 2022 by <span>mr. web designer</span> | all rights reserved!</React.Fragment>
          ))
        }
      </footer>
    </>
  );
}

export default MainProfile;
