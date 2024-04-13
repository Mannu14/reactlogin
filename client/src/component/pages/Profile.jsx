import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:4000/profile'
          // Send cookies for authentication check
        );
        console.log(response);
        // setUser(response.data.user);
      } catch (error) {
        console.log("error a rahe ha");
        console.error(error);
        setError('Failed to fetch profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  
  return (
    <div>
      <h1>Profile</h1>
      {/* <p>ID: {user._id}</p> */}
      {/* <p>Email: {user.email}</p> */}
      {/* Add more user details here */}
    </div>
  );
}

export default Profile;
