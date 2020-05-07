import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    if (token) {
      Video.connect(token, {
        name: roomName
      }).then(room => {
        setRoom(room);
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        room.participants.forEach(participantConnected);
      });
    }

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <Card  >

      <div style={{ textAlign: "left" }}>

        <Card.Header>Room: {roomName}</Card.Header>
        <Card.Body>
          <button style={{ top: 0 }} className="btn-danger float-right" onClick={handleLogout}>Leave Room</button>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <Card.Body>
              <Card.Title>Remote Participants</Card.Title>

            </Card.Body>
          </ListGroupItem>

        </ListGroup>


        <div className="local-participant">
          {room ? (
            <Participant
              key={room.localParticipant.sid}
              participant={room.localParticipant}
            />
          ) : (
              ''
            )}
        </div>

        <div className="remote-participants">{remoteParticipants}</div>
      </div>
    </Card>
  );
};

export default Room;
