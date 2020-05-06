import Auth from '../context/auth'
import React from 'react';

const Lobby = ({
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  const { user } = React.useContext(Auth)

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a room</h2>
      <div>
        { user ? 
        <label htmlFor="name">Name: {user.displayName} </label>  : 
        <label htmlFor="name">Name: Please sign in first!</label>}
      </div>

      <div>
        <label htmlFor="room">Room name:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        /><br></br>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Lobby;
