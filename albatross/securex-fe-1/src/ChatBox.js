import React, { Component } from 'react';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chatData !== this.props.chatData) {
      // Scroll to the latest message
      this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }
  }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    this.props.onSend(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    const { chatData } = this.props;
    const { input } = this.state;

    return (
      <div>
        <div className="chat-box" ref={chatBox => { this.chatBox = chatBox; }}>
          {chatData.map((message, index) => (
            <div key={index} className={`chat-bubble ${message.user ? 'user' : 'response'}`}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={this.handleSubmit}>
          <input value={input} onChange={this.handleInputChange} placeholder="Type your message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default ChatBox;
