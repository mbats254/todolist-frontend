import React from 'react';

const Card = ({ title, content }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
          <a href="#" className="btn btn-primary">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default Card;
