import React from 'react';

function Footer() {
  return (
    <div id='footer' className='bg-gray-300 py-8 mb-4'>
      <div className='container mx-auto text-center'>
        <p className='text-3xl mt-8'>&copy; 2024 Ecommerce Store. All rights reserved.</p>
        <p className='text-lg mt-4 mb-5'>
          <a href='/terms' className='text-blue-500 hover:underline'>Terms of Service</a> |{' '}
          <a href='/privacy' className='text-blue-500 hover:underline'>Privacy Policy</a> |{' '}
          <a href='mailto:estore@gmail.com' className='text-blue-500 hover:underline'>Estore@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
