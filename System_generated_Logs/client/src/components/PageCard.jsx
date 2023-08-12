import React from 'react'
import { Link } from 'react-router-dom'

const PageCard = ({ tag, svg, link }) => {
    return (
        <React.Fragment>
            <Link to={link}>
                <div class="card mb-2 shadow-sm">
                    <div class="card-body">
                        {svg}
                        {tag}
                    </div>
                </div>
            </Link>

        </React.Fragment>
    )
}

export default PageCard
