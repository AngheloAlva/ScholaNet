import MenuItem from '@/components/home/navbar/Menu-item'
import React from 'react'

interface NavMenuListProps {
  menuList: Array<{
    href: string
    text: string
  }>
}

function NavMenuList ({ menuList }: NavMenuListProps): React.ReactElement {
  return (
    <ul className='hidden xl:flex'>
      {
        menuList.map((item, index) => (
          <MenuItem
            className='hover:bg-text-200 hover:text-bg-100'
            href={item.href}
            key={index}
            text={item.text} />
        ))
      }
    </ul>
  )
}

export default NavMenuList
