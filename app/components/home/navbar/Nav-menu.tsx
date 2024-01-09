import MenuItem from './Menu-item'

function NavMenu (): React.ReactElement {
  return (
    <ul className='hidden lg:flex items-center text-text-100'>
      <MenuItem href='dashboard' text='Dashboard' className='w-auto' />
      <MenuItem href='about' text='About' className='w-auto' />
      <MenuItem href='programs-courses' text='Programs & Courses' className='w-auto' />
      <MenuItem href='news-events' text='News & Events' className='w-auto' />
      <MenuItem href='auth/login' text='Sign In' className='w-auto' />
      <MenuItem href='auth/register' text='Sign Up' className='w-auto' />
      <MenuItem href='auth/student' text='Student Access' className='w-auto hover:bg-accent-100' />
    </ul>
  )
}

export default NavMenu
