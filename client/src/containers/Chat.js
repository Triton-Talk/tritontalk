import React, { Component } from 'react'
import io from 'socket.io-client/dist/socket.io';
import ChatInput from '../components/ChatInput'
import ChatMessage from '../components/ChatMessage'


const URL = 'http://localhost/api'

class Chat extends Component {
  state = {
    name: 'Bob',
    messages: [],
    socket: io(URL)
  }

  componentDidMount() {
    this.state.socket.on('new_message', data => {
      this.setState(state => ({ messages: [data, ...state.messages] }))
      console.log(this.state.messages)
    })
  }

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, reset the input
    const message = { name: this.state.name, message: messageString }
    this.state.socket.emit('new_message', message)
  }

  render() {
    return (
      <div>
        <label htmlFor="name">
          Name:&nbsp;
          <input
            type="text"
            id={'name'}
            placeholder={'Enter your name...'}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <ChatInput
          //ws={this.ws}
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

export default Chat
