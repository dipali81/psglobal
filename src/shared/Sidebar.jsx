import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';

// eslint-disable-next-line react/prop-types
function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const navigate =useNavigate();


  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  useEffect(() => {
		const email = localStorage.getItem('email')
			if (!email) {
        // console.log("email not present");
				localStorage.removeItem('email')
				navigate('/login')
			} 
      else{
        // console.log("email present");
      }
	}, [navigate])

 
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-4 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <NavLink end to="/" className="block">
          <img className="w-full" src="../assets/logo.png" alt="Logo" />

    
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-2">
          {/* Pages group */}
          <div>
         
            <ul className="mt-1">
              {/* Dashboard */}
              <SidebarLinkGroup activecondition={pathname === '/home' || pathname.includes('/dashboard')}>
                {/* eslint-disable-next-line no-unused-vars */}
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                                    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname==='/' && 'bg-slate-900'}`}>

                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === '/' ) && 'hover:text-slate-200'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current text-slate-400 ${
                                  (pathname === '/' ) && '!text-indigo-500'
                                }`}
                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${(pathname === '/') && 'text-indigo-600'}`}
                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${(pathname === '/' ) && 'text-indigo-200'}`}
                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                              />
                            </svg>
                            <NavLink to="/" className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Dashboard
                            </NavLink>
                          </div>
                         
                          <div className="flex shrink-0 ml-2">
                   
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                 
                      </div>
                      </li>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('sales') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/sales"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('sales') && 'hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center">
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current text-slate-600 ${pathname.includes('sales') && 'text-indigo-500'}`}
                                d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${pathname.includes('sales') && 'text-indigo-300'}`}
                                d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${pathname.includes('sales') && 'text-indigo-500'}`}
                                d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${pathname.includes('sales') && 'text-indigo-300'}`}
                                d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                              />
                            </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Sales
                    </span>
                  </div>
                </NavLink>
              </li>

              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('query') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/query"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('query') && 'hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center">
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={`fill-current text-slate-600 ${pathname.includes('query') && 'text-indigo-500'}`}
                          d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                        />
                        <path
                          className={`fill-current text-slate-400 ${pathname.includes('query') && 'text-indigo-300'}`}
                          d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                        />
                      </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Queries
                    </span>
                  </div>
                </NavLink>
              </li>

           
              <SidebarLinkGroup activecondition={pathname.includes('users')}>
                  {/* eslint-disable-next-line no-unused-vars */}
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/users"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('users') && 'hover:text-slate-200'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                        
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current text-slate-600 ${pathname.includes('users') && 'text-indigo-500'}`}
                                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${pathname.includes('users') && 'text-indigo-300'}`}
                                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                              />
                            </svg>
                            <NavLink to="/users" className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Users
                            </NavLink>
                                 {/* Badge */}
                 
                          </div>
                         
                        </div>
                      </NavLink>
                 
                   
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Community */}
              <SidebarLinkGroup activecondition={pathname.includes('add-product')}>
                  {/* eslint-disable-next-line no-unused-vars */}
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('add-product') && 'hover:text-slate-200'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current text-slate-400 ${pathname.includes('add-product') && 'text-indigo-300'}`}
                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                              />
                              <path
                                className={`fill-current text-slate-700 ${pathname.includes('add-product') && '!text-indigo-600'}`}
                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${pathname.includes('add-product') && 'text-indigo-500'}`}
                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                              />
                            </svg>
                            <NavLink to="/add-product" className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Add Products
                            </NavLink>
                          </div>
                 
                        </div>
                      </a>
                 
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Finance */}

              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('subscriptions') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/subscriptions"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('subscriptions') && 'hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center">
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current text-slate-400 ${pathname.includes('subscriptions') && 'text-indigo-300'}`}
                                d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z"
                              />
                              <path
                                className={`fill-current text-slate-700 ${pathname.includes('subscriptions') && '!text-indigo-500'}`}
                                d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${pathname.includes('subscriptions') && 'text-indigo-600'}`}
                                d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"
                              />
                            </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Subscriptions
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* <SidebarLinkGroup activecondition={pathname.includes('subscriptions')}>
                 
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                    <NavLink
                        to="/subscriptions"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('subscriptions') && 'hover:text-slate-200'
                        }`}
                        onClick={(e) => {
                          e.preventDefault(); // This line might be causing the issue
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current text-slate-400 ${pathname.includes('subscriptions') && 'text-indigo-300'}`}
                                d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z"
                              />
                              <path
                                className={`fill-current text-slate-700 ${pathname.includes('subscriptions') && '!text-indigo-500'}`}
                                d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${pathname.includes('subscriptions') && 'text-indigo-600'}`}
                                d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"
                              />
                            </svg>
                            <NavLink to="/subscriptions" className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Subscriptions
                            </NavLink>
                          </div>
                          
                        
                        </div>
                      </NavLink>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                     
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
          
              {/* Job Board */}
              <SidebarLinkGroup activecondition={pathname.includes('products')}>
                  {/* eslint-disable-next-line no-unused-vars */}
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/products"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('products') && 'hover:text-slate-200'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current text-slate-700 ${pathname.includes('products') && '!text-indigo-600'}`}
                                d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${pathname.includes('products') && '!text-indigo-500'}`}
                                d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${pathname.includes('products') && '!text-indigo-300'}`}
                                d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z"
                              />
                            </svg>
                            <NavLink to="/products" className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Products
                            </NavLink>
                          </div>
                          {/* Icon */}
                          
                        </div>
                      </NavLink>
                 
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Tasks */}
              <SidebarLinkGroup activecondition={pathname.includes('announcement')}>
                  {/* eslint-disable-next-line no-unused-vars */}
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to={"/announcement"}
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('announcement') && 'hover:text-slate-200'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current text-slate-600 ${pathname.includes('announcement') && 'text-indigo-500'}`}
                                d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                              />
                              <path className={`fill-current text-slate-600 ${pathname.includes('announcement') && 'text-indigo-500'}`} d="M1 1h22v23H1z" />
                              <path
                                className={`fill-current text-slate-400 ${pathname.includes('announcement') && 'text-indigo-300'}`}
                                d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                              />
                            </svg>
                            <NavLink to="/announcement" className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Announcements
                            </NavLink>
                        
                          </div>
                          {/* Icon */}
                         
                        </div>
                      </NavLink>
              
                    </React.Fragment>
                  );
                }}
            </SidebarLinkGroup>
       

           

            


            </ul>
          </div>
       
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;