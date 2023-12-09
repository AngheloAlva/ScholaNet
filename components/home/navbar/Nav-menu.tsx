import MenuItem from './Menu-item'

function NavMenu (): React.ReactElement {
  return (
    <ul className='hidden lg:flex'>
      <MenuItem href='dashboard' text='Dashboard' className='w-auto' />
      <MenuItem href='#' text='About' className='w-auto' />
      <MenuItem href='#' text='Programs & Courses' className='w-auto' />
      <MenuItem href='#' text='News & Events' className='w-auto' />
      {/* <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton className='hover:bg-accent-100 hover:text-bg-100 rounded-sm py-1 transition-colors text-left px-4' afterSignInUrl='/dashboard'/>
        <SignUpButton className='hover:bg-accent-100 hover:text-bg-100 rounded-sm py-1 transition-colors text-left px-4' afterSignUpUrl='/dashboard' />
      </SignedOut> */}
    </ul>
  )
}

export default NavMenu
