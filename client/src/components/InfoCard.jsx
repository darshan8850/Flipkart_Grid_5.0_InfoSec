import React from 'react'

const InfoCard = ({ key, value, svg, bgColor, tag }) => {
  return (
    <React.Fragment key={key}>
      <div className="card mb-2 shadow-sm me-2">
        <div className={`card-body ${bgColor}`} style={{ width: '10vw' }}>
          <div className="row">
            <span className="m-1 fs-1">{value}</span>
          </div>
          <div className="row">
            <div className="col-lg-2">
              {svg}
            </div>
            <div className="col">
              <span className="fs-6">{tag}</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default InfoCard;
