import React from 'react';
import './App.css';
import ChatBox from './ChatBox';
import InfoBox from './InfoBox';
import PiiRedactionForm from './PiiRedactionForm';

class App extends React.Component {
  state = {
    chatData: [],
    infoData: [],
    piiSelected: false,
    piiOptions: {},
  };

  handlePiiSelection = (piiOptions) => {
    this.setState({
      piiSelected: true,
      piiOptions,
    });
  };

  handleSend = async (message) => {
    // Add the user's message to the chat data
    this.setState((prevState) => ({
      chatData: [...prevState.chatData, { user: true, text: message }],
    }));

    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://127.0.0.1:8080/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPrompt: message }),
      });
      
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the response data
      const data = await response.json();
      console.log(data);

      // Add the response message to the chat data
      this.setState((prevState) => ({
        chatData: [...prevState.chatData, { user: false, text: data.chatData }],
        infoData: [data.infoData],
      }));
    } catch (error) {
      console.error('Error:', error);
    }

    // // Simulate an API response after a delay
    // setTimeout(() => {
    //   const simulatedApiResponse = {
    //     chatResponse: 'This is the chat response',
    //     infoResponse: 'This is the info response',
    //   };

    //   // Add the response messages to the chat data and info data
    //   this.setState((prevState) => ({
    //     chatData: [...prevState.chatData, { user: false, text: simulatedApiResponse.chatResponse }],
    //     infoData: [ simulatedApiResponse.infoResponse],
    //   }));
    // }, 1000);
  };

  render() {
    const { chatData, infoData, piiSelected } = this.state;

    if (!piiSelected) {
      return <PiiRedactionForm onPiiSelection={this.handlePiiSelection} />;
    }

    return (
      <div className="App">
        <div className="chat-section">
          <ChatBox chatData={chatData} onSend={this.handleSend} />
        </div>
        <div className="info-section">
          <InfoBox infoData={infoData} />
        </div>
      </div>
    );
  }
}

export default App;
