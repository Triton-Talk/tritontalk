import React, { Component } from 'react'
import io from 'socket.io-client/dist/socket.io';
import ChatInput from '../components/ChatInput'
import ChatMessage from '../components/ChatMessage'
import Auth from '../auth';

const URL = '/'

class Chat extends Component {
  state = {
    messages: [],
    socket: io(URL)
  }

  componentDidMount() {
    this.state.socket.on('new_message', data => {
      this.setState(state => ({ messages: [data, ...state.messages] }))
    })
  }

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, reset the input
    if(! this.context.user){
      alert('You must sign in before sending messages!')
      return
    }

    const message = { name: this.context.user, message: messageString }
    this.state.socket.emit('new_message', message)
  }

  render() {
    const user = this.context.user

    return (
      <div>

        { user ? 
        <label htmlFor="name">
          Name: {user.displayName}
        </label>
        : 
        <label htmlFor="name">
          Name: Please sign in first! 
        </label>
        }
        <ChatInput
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />
        {this.state.messages.map((message, index) =>
          <ChatMessage
            key={index}
            message={message.message}
            name={message.name}
          />,
        )}
      </div>
    )
  }
}

Chat.contextType = Auth

export default Chat
