import Link from 'next/link'
import React from 'react'

import { FaXTwitter, FaSquareFacebook, FaYoutube } from 'react-icons/fa6'
import { IoLogoInstagram } from 'react-icons/io5'

function Footer (): React.ReactElement {
  return (
    <footer className='flex text-text-100 flex-row px-5 pt-5 pb-20 bg-bg-200 justify-between flex-wrap'>
      <div className='flex flex-col gap-7'>
        <div className='flex flex-col'>
          <h3 className='font-bold text-lg'>Quick Links</h3>
          <p className='text-sm'>About us</p>
          <p className='text-sm'>Contact</p>
          <p className='text-sm'>Admissions</p>
        </div>
        <div className='flex flex-col'>
          <h3 className='font-bold text-lg'>Contact Info</h3>
          <p className='text-sm'>+63 123 456 7890</p>
          <p className='text-sm'>Street N° 123, City</p>
          <p className='text-sm'>info@scholanet.com</p>
        </div>
        <div className='flex flex-col mb-7'>
          <h3 className='font-bold text-lg'>Folow us</h3>
          <div className='flex gap-4 items-center'>
            <Link href='https://www.instagram.com'>
              <IoLogoInstagram className='text-2xl hover:text-accent-100 transition-colors' />
            </Link>
            <Link href='https://www.twitter.com'>
              <FaXTwitter className='text-2xl hover:text-neutral-900 transition-colors' />
            </Link>
            <Link href='https://www.facebook.com'>
              <FaSquareFacebook className='text-2xl hover:text-blue-500 transition-colors' />
            </Link>
            <Link href='https://www.youtube.com'>
              <FaYoutube className='text-2xl hover:text-red-500 transition-colors' />
            </Link>
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <h3 className='font-bold text-lg'>Overview</h3>
        <p className='text-sm'>Basic Education Program</p>
        <p className='text-sm'>Secondary Education Program</p>
        <p className='text-sm'>Special Programs</p>
        <p className='text-sm'>Extracurricular Activities</p>
      </div>
    </footer>
  )
}

export default Footer
