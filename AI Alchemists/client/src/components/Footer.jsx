import React from 'react';

const Footer = () => {
  return (
    <footer className='py-8 bg-slate-400 dark:bg-slate-950 text-slate-950 dark:text-slate-100'>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <ul className="flex space-x-6">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="mt-4 text-center text-slate-600 dark:text-gray-300">
          <p>&copy; {new Date().getFullYear()} AgrisenseAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
