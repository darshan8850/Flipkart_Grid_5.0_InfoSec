import React from 'react';
import { AiOutlineBarChart } from 'react-icons/ai';
import { FiPieChart } from 'react-icons/fi';
import { BsBoxSeam} from 'react-icons/bs';


export const links = [
  // {
  //   title: 'Dashboard',
  //   links: [
  //     {
  //       name: 'Dashboard',
  //       icon: <RiStockLine />,
  //     },
  //   ],
  // },

  {
    title: 'System Generated Logs',
    links: [
      {
        name: 'System_Analysis',
        icon: <AiOutlineBarChart />,
      },
      {
        name: 'System_History',
        icon: <FiPieChart />,
      },
      {
        name: 'Blocked_users',
        icon: <BsBoxSeam />,
      }
    ],
  },
  {
    title: 'Customer Interaction Log',
    links: [
      {
        name: 'Customer_Analysis',
        icon: <AiOutlineBarChart />,
      },
      {
        name: 'Customer_History',
        icon: <FiPieChart />,
      }
    ],
  },
];

