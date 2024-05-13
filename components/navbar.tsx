"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi'; // Import FiSearch icon
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // Add searchQuery state
    const pathName = usePathname();

    const isActive = (href: string) => {
        return pathName === href ? 'text-green-600 font-semibold' : '';
    };

    // const handleSearch = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Perform search logic here
    //     console.log('Search query:', searchQuery);
    //     setSearchQuery('');
    // };

    return (
        <nav className="shadow-sm fixed w-full z-10 bg-white">
            <div className="w-full">
                <div className="flex items-center h-20 w-full">
                    <div className="flex items-center mx-20 justify-between w-full">
                        <Link className="flex justify-center items-center flex-shink-0" href={"/home"}>
                            <h1 className="font-bold text-xl cursor-pointer">
                                Plan<span className="text-green-600">nt</span>
                            </h1>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive(
                                        '/home'
                                    )}`}
                                    href={'/home'}
                                >
                                    Home
                                </Link>

                                <Link
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive(
                                        '/about'
                                    )}`}
                                    href={'/about'}
                                >
                                    About
                                </Link>

                                <Link
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive(
                                        '/marketplace'
                                    )}`}
                                    href={'/marketplace'}
                                >
                                    Marketplace
                                </Link>

                                {/* <Link
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive(
                                        '/services'
                                    )}`}
                                    href={'/services'}
                                >
                                    Services
                                </Link> */}

                                <Link
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive(
                                        '/contact'
                                    )}`}
                                    href={'/contact'}
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mr-10 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-green-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600 focus:outline-none focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                            type="button"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <FiMenu className="block h-6 w-6" area-hidden="true" />
                            ) : (
                                <FiX className="block h-6 w-6" area-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div
                                ref={ref}
                                className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3"
                            >
                                <Link
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium ${isActive(
                                        '/home'
                                    )}`}
                                    href={'/home'}
                                >
                                    Home
                                </Link>

                                <Link
                                    href={'/about'}
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium ${isActive(
                                        '/about'
                                    )}`}
                                >
                                    About
                                </Link>

                                <Link
                                    href={'/marketplace'}
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium ${isActive(
                                        '/marketplace'
                                    )}`}
                                >
                                    Marketplace
                                </Link>

                                {/* <Link
                                    href={'/services'}
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium ${isActive(
                                        '/services'
                                    )}`}
                                >
                                    Services
                                </Link> */}

                                <Link
                                    href={'/contact'}
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium ${isActive(
                                        '/contact'
                                    )}`}
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    )}
                </Transition>
            </div>
        </nav>      
    );
};

export default Navbar;
