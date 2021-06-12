import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../components/Navigation/NavBar';
import Routes from '../helpers/Routes';
import './App.scss';
import { getSongs } from '../helpers/data/SongsData';
import { getLists } from '../helpers/data/ListsData';

function App() {
  const [user, setUser] = useState(null);
  const [songs, setSongs] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getLists().then(setLists);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
        };
        getLists(authed.uid).then((listsArray) => setLists(listsArray));
        getSongs(authed.uid).then((songsArray) => setSongs(songsArray));
        setUser(userInfoObj);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className='App'>
    <Router>
      <NavBar user={user} setSongs={setSongs} />
      <Routes
      lists={lists}
      setLists={setLists}
      user={user}
      songs={songs}
      setSongs={setSongs}
      />
    </Router>
    </div>
  );
}

export default App;
