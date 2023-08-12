import React from 'react'
import InfoCard from './InfoCard'
import { countInfo } from '../data/dataArray'
function DashBoard() {
    return (
        <React.Fragment>
            <div id="right-div" class="d-flex flex-column  border-end p-3" style={{ width: '100%' }}>
                <p class="fs-5">Dashboard</p>
                <div id="count-div" class="d-flex">
                    {countInfo.map((e, index) => (
                        <InfoCard key={index}
                            value={0}
                            bgColor={e.bgColor}
                            svg={e.svg}
                            tag={e.tag}
                        />
                    ))}
                </div>
                <div id="graph-div" class="h-100 shadow-sm border ">

                </div>
            </div>
        </React.Fragment>
    )
}

export default DashBoard
