import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import { Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';

import Participant from './Participant';

const Room = ({ roomName, token, handleLogout, host }) => {

  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    let mounted = true

    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    const roomCompleted = error => {
      setComplete(true)
    }

    if (token) {
      Video.connect(token, {
        name: roomName
      }).then(room => {
        if (mounted) {
          setRoom(room);
        } else {
          room.disconnect();
        }
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        room.once('disconnected', roomCompleted);
        room.participants.forEach(participantConnected);
      });
    }

    return () => {
      mounted = false
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
    <Participant key={participant.sid} participant={participant} isSelf={false}/>

  ));

  return (
    <>
      <Card style={{ width: "100%", height: "100%" }} >

        <div >

          <Card.Header>Room: {roomName}</Card.Header>
          <Card.Body>
            <button style={{ top: 0 }} className="btn-danger float-right" onClick={handleLogout}>{host ? 'Close Room' : 'Leave Room'}</button>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Card.Body>
                {room ? 
                  (<Card.Title>Remote Participants: {room.localParticipant.identity}</Card.Title>) :
                  (<Card.Title>Remote Participants:</Card.Title>)
                }

              </Card.Body>
            </ListGroupItem>
          </ListGroup>

          <div className="local-participant">
            {room ? (
              <Participant
                key={room.localParticipant.sid}
                participant={room.localParticipant}
                isSelf={true}
              />
            ) : (
                ''
              )}
          </div>

          <div className="remote-participants">{remoteParticipants}</div>
        </div>
      </Card>
      
      <Modal show={complete} onHide={handleLogout} centered>
        <Modal.Header closeButton>
          <Modal.Title>Time to find another Booth!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The club owner has closed this Booth. You will return to Library Walk as soon as you dismiss this alert.</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Room;
