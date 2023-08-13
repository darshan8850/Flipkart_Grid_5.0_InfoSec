import React from 'react'
import { Link } from 'react-router-dom'

const PageCard = ({ key, tag, svg, link }) => {
  return (
    <React.Fragment key={key}>
      <Link to={link} activeClassName="active">
        <button type="button" class="btn w-100 p-2">
          {svg}
          {tag}
        </button>
      </Link>
    </React.Fragment>
  )
}

export default PageCard
