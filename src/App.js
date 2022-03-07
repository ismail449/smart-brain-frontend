import React, { useState } from 'react';
import './App.css';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxRegions, setBoxRegions] = useState([]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entires: 0,
    joined: '',
  });

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
      setImageUrl('');
      setUser({
        id: '',
        name: '',
        email: '',
        entires: 0,
        joined: '',
      });
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  };
  const onSubmit = () => {
    setImageUrl(input);
    const raw = JSON.stringify({
      user_app_id: {
        user_id: 'ihsw3w3dpfp6',
        app_id: 'fb0a2b8774a0469f9f0622c5be83d40b',
      },
      inputs: [
        {
          data: {
            image: {
              url: input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key 7682ad59e7f445e596b5fbaf6df70df0',
      },
      body: raw,
    };

    fetch(
      'https://api.clarifai.com/v2/models/face-detection/outputs',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        setBoxRegions(JSON.parse(result, null, 2).outputs[0].data.regions);
      })
      .catch((error) => console.log('error', error));
    setInput('');
  };
  return (
    <div className="App">
      <Particles className="particles" options={particleOptions} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === 'home' ? (
        <div>
          <Logo />
          <Rank numberOfEntries={user.entires} name={user.name} />
          <ImageLinkForm
            setInput={setInput}
            onSubmit={onSubmit}
            user={user}
            input={input}
            setUser={setUser}
          />
          <FaceRecognition imageUrl={imageUrl} boxRegions={boxRegions} />
        </div>
      ) : route === 'signin' ? (
        <Signin setRoute={onRouteChange} setUser={setUser} />
      ) : (
        <Register setUser={setUser} setRoute={onRouteChange} />
      )}
    </div>
  );
}

const particleOptions = {
  fpsLimit: 60,
  particles: {
    links: {
      enable: true,
    },
    move: {
      enable: true,
      outMode: 'bounce',
      speed: 4,
    },
  },
  detectRetina: true,
};

export default App;
