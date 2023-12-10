import MenuItem from './Menu-item'

function NavMenu (): React.ReactElement {
  return (
    <ul className='hidden lg:flex items-center'>
      <MenuItem href='dashboard' text='Dashboard' className='w-auto' />
      <MenuItem href='about' text='About' className='w-auto' />
      <MenuItem href='programs-courses' text='Programs & Courses' className='w-auto' />
      <MenuItem href='news-events' text='News & Events' className='w-auto' />
      <MenuItem href='auth/login' text='Sign In' className='w-auto' />
      <MenuItem href='auth/register' text='Sign Up' className='w-auto' />
    </ul>
  )
}

export default NavMenu
