import React, { useState, useEffect, useRef } from 'react';

const Participant = ({ participant, isSelf }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [mute, setMute] = useState(false);
  const [vidDisabled, setVidDisabled] = useState(false);

  const videoRef = useRef();
  const audioRef = useRef();

  const muteParticipant = ()  => {
    if (isSelf) {
      if (mute) {
        participant.audioTracks.forEach(publication => {
          publication.track.enable();
        });
      } else {
        participant.audioTracks.forEach(publication => {
          publication.track.disable();
        });
      }
    } else {
      audioRef.current.muted = !mute
    }
    setMute(!mute);
  }

  const stopStartVideo = ()  => {
    if (isSelf) {
      if (vidDisabled) {
        participant.videoTracks.forEach(publication => {
          publication.track.enable();
        });
      } else {
        participant.videoTracks.forEach(publication => {
          publication.track.disable();
        });
      }
    } else {
      if (vidDisabled) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
    setVidDisabled(!vidDisabled);
  }

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);


  return (
    <div className="participant" style={{ marginTop: '10px' }}>
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} />
      <div style={{textAlign:"center",marginTop:"8px"}}>
        <button  onClick={() => videoRef.current.requestPictureInPicture()
                                     .then(t => console.log('success'))
                                     .catch(f => console.log('fail'))}>
        P.I.P.
        </button>
      
        {audioRef.current !== undefined ? (
          <button style={{marginLeft:"8px"}} onClick={() => {muteParticipant()}}>
            {mute ? 'Unmute' : 'Mute'}
          </button>
        ) : null }

        {videoRef.current !== undefined ? (
          <button style={{marginLeft:"8px"}} onClick={() => {stopStartVideo()}}>
            {vidDisabled ? 'Enable Video' : 'Disable Video'}
          </button>
        ) : null }
      </div>
    </div>
  );
};

export default Participant;
