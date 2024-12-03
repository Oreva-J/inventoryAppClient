import React from 'react'
import { Link } from 'react-router-dom'

const SideBarItem = ({href, icon: Icon, text, badge}) => {
  return (
    <li className='list-none pb-5 hover:bg-gray-100 dark:hover:bg-gray-700'>
      <Link to={href} className='flex items-center' >
        <Icon />
        <span className='flex-1 me-2 ml-5 '>{text}</span>
            {badge && <span className={`inline-flex px-2 ms-3 text-sm rounded-full ${badge.color} ${badge.darkColor} `}>{badge.text}</span> }
      </Link>
    </li>
  )
}

export default SideBarItem
