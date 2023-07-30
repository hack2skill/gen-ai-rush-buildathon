// PiiRedactionForm.js
import React, { Component } from 'react';

class PiiRedactionForm extends Component {
  state = {
    piiOptions: {
      educationHistory: false,
      name: false,
      address: false,
      email: false,
      phoneNumber: false,
      // Add other PII options as needed
    },
  };

  handleChange = (event) => {
    const option = event.target.name;
    const isChecked = event.target.checked;
    this.setState((prevState) => ({
      piiOptions: {
        ...prevState.piiOptions,
        [option]: isChecked,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onPiiSelection(this.state.piiOptions);
  };

  render() {
    return (
      <div className="pii-form-container">
        <form onSubmit={this.handleSubmit} className="pii-form">
          <h1>Admin Panel</h1>
          <h2>Choose the PII data to be redacted</h2>
        <label>
          <input type="checkbox" name="educationHistory" onChange={this.handleChange} />
          Education History
        </label>
        <label>
          <input type="checkbox" name="name" onChange={this.handleChange} />
          Name
        </label>
        <label>
          <input type="checkbox" name="address" onChange={this.handleChange} />
          Address
        </label>
        <label>
          <input type="checkbox" name="email" onChange={this.handleChange} />
          Email
        </label>
        <label>
          <input type="checkbox" name="phoneNumber" onChange={this.handleChange} />
          PhoneNumber
        </label>
        {/* Add other checkboxes as needed */}
        <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default PiiRedactionForm;
