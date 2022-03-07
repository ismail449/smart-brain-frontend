import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ setInput, onSubmit, input, user, setUser }) => {
  const addEntries = async () => {
    const response = await fetch('https://agile-crag-80192.herokuapp.com/image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: user.id }),
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      const newUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        entires: data, 
        joined: user.joined,
      };
      setUser(newUser);
    }
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    addEntries();
  };
  return (
    <div>
      <p className="f3">
        This Magic Brain Can Detect Faces In Your Pictures. Give It A Try.
      </p>
      <div className="center">
        <form
          className="center form pa4 br3 shadow-5"
          onSubmit={(e) => onFormSubmit(e)}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="f4 pa2 w-70 center"
          />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple ba b--black">
            Detect
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageLinkForm;
