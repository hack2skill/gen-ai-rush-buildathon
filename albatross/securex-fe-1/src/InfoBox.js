// InfoBox.js
import React from 'react';

class InfoBox extends React.Component {
  render() {
    const { infoData } = this.props;

    return (
      <div className="info-box">
        {infoData.map((info, index) => (
          <div key={index} className="info-item">
            <p>{info}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default InfoBox;