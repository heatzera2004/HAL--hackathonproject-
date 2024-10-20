import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown from '../dropdown/Dropdown';

const TestNavbar = () => {
    const context = useContext(myContext);
    const { mode, toggleMode } = context;

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const userName = user?.user?.email ? user?.user?.email.split('@')[0] : "User";
    console.log(userName)
    const logout = () => {
      localStorage.clear('user');
      window.location.href = '/login';
    };

    const cartItems = useSelector((state) => state.cart);

    return (
        <div>
            <header className="relative bg-white">
                <p className="flex h-10 items-center justify-center bg-green-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
                    style={{ backgroundColor: mode === 'dark' ? 'rgb(62 64 66)' : '', color: mode === 'dark' ? 'white' : '' }}>
                    "Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals & happiness."
                </p>

                <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl"
                    style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
                    <div className="">
                        <div className="flex h-16 items-center">
                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link to={'/'} className='flex'>
                                    <div className="flex items-center">
                                        <img className="h-8 md:h-12 lg:h-16" src='https://i.postimg.cc/Vkbn3yjM/Farm-logo-removebg-preview.png' alt='' />
                                        <h1 className='text-3xl font-bold py-1 rounded' style={{ color: mode === 'dark' ? 'white' : 'black' }}>हल</h1>
                                    </div>
                                </Link>
                            </div>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {/* Display the username and greeting */}
                                    {user ? (
                                        <span className="text-sm font-medium text-gray-700"
                                        style={{ color: mode === 'dark' ? 'white' : '' }}>
                                        Hello, {userName}
                                        </span>
                                    ) : (
                                        <Link to={'/login'} className="text-sm font-medium text-gray-700"
                                            style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            Login
                                        </Link>
                                    )}
                                    <Dropdown />
                                    <Link to={'/disease'} className="text-sm font-medium text-gray-700"
                                        style={{ color: mode === 'dark' ? 'white' : '' }}>
                                        Disease
                                    </Link>
                                    
                                    

                                    {user ? <Link to={'/allproducts'} className="text-sm font-medium text-gray-700"
                                        style={{ color: mode === 'dark' ? 'white' : '' }}>
                                        FarmBazaar
                                    </Link> : ""}

                                    {user?.user?.email === 'test@gmail.com' ?
                                        <Link to={'/dashboard'} className="text-sm font-medium text-gray-700"
                                            style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            Admin
                                        </Link> : ""}

                                    {user ? (
                                        <a onClick={logout} className="text-sm font-medium text-gray-700 cursor-pointer"
                                            style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            Logout
                                        </a>
                                    ) : ""}

                                    {/* <div className="hidden lg:ml-8 lg:flex">
                                        <a href="#" className="flex items-center text-gray-700 ">
                                                <img
                                                    className="inline-block w-10 h-10 rounded-full"
                                                    src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                                    alt="Dan_Abromov" />
                                                 </a>
                                            </div> */}
                                    </div>

                                {/* Cart */}
                                {user ? (
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <Link to={'/cart'} className="group -m-2 flex items-center p-2"
                                            style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                            </svg>
                                            <span className="ml-2 text-sm font-medium text-gray-700"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {cartItems.length}
                                            </span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </Link>
                                    </div>
                                ) : ""}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default TestNavbar;
