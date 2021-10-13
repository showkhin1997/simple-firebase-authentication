import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import initializationAuthentication from './Firebase/firebase.init';
import googlePng from '../src/images/google.png';
import gitHubPng from '../src/images/github.png';
import logOutPng from '../src/images/logout.png';
import { useState } from 'react';

initializationAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  // google button sign In
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          image: photoURL
        }

        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }


  // gitHub Button sign In
  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          image: photoURL
        }
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  // Log Out button 
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }

  return (
    <div className="App mt-5">
      <h1>Please Sign In</h1>
      {
        !user.email ?
          <div>
            <button onClick={handleGoogleSignIn} className="btn-google btn">
              <img className="btn-image" src={googlePng} alt="" />
            </button>
            <button onClick={handleGitHubSignIn} className="btn-google btn">
              <img className="btn-image" src={gitHubPng} alt="" />
            </button>
          </div> :
          <button onClick={handleSignOut} className="btn-google btn">
            <img className="btn-image" src={logOutPng} alt="" />
          </button>
      }

      <br /> <br />
      {
        user.email &&
        <div>
          <h2>Welcome {user.name}</h2>
          <h5>{user.email}</h5>
          <img className="w-50 mt-5" src={user.image} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
