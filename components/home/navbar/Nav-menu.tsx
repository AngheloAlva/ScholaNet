import { SignInButton, SignUpButton } from '@clerk/nextjs'
import MenuItem from './Menu-item'

function NavMenu (): React.ReactElement {
  return (
    <ul className='hidden lg:flex'>
      <MenuItem text='About' className='w-auto' />
      <MenuItem text='Admissions' className='w-auto' />
      <MenuItem text='Programs & Courses' className='w-auto' />
      <MenuItem text='News & Events' className='w-auto' />
      <SignInButton className='hover:bg-accent-100 hover:text-bg-100 rounded-sm py-1 transition-colors text-left px-4' afterSignInUrl='/' afterSignUpUrl='/' />
      <SignUpButton className='hover:bg-accent-100 hover:text-bg-100 rounded-sm py-1 transition-colors text-left px-4' afterSignInUrl='/' afterSignUpUrl='/' />
    </ul>
  )
}

export default NavMenu
