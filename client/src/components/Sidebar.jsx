import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdOutlineCancel } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {

  const { currentColor, activeMenu } = useStateContext();
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
  
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={() => {}}
              className="items-center gap-3 ml-3 mt-4 flex text-xl  tracking-tight dark:text-white text-slate-900"
            >
              <p>Flipkart GRID 5.0</p>
            </Link>
          </div>
          <div className="mt-5 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className=" dark:text-gray-400 m-3 mt-4">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink to={`/${link.name}`}
                  key={link.name}
                  onClick={() => {}}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : '',
                  })}
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>   
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Sidebar
