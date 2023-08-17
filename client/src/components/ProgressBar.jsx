import React from 'react'

const ProgressBar = ({ariaLabel, valueNow}) => {
  let w = 0
  w = Math.floor(valueNow)*10
  return (
    <React.Fragment>
      <div
        class="progress w-25 "
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={w}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class={`progress-bar`} style={{width:w}}></div>
      </div>
    </React.Fragment>
  )
}

export default ProgressBar
