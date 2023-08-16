import React from 'react'

const ProgressBar = ({ariaLabel, valueNow}) => {
  return (
    <React.Fragment>
      <div
        class="progress w-25 "
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={valueNow}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class={`progress-bar w-${valueNow}`}></div>
      </div>
    </React.Fragment>
  )
}

export default ProgressBar
