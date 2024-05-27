import React, { useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi'; // Import FiShoppingCart icon
import { usePathname } from 'next/navigation';
import Cart from '@/components/cart'; // Import the Cart component
import { useCart } from '@/utils/cart_context';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isCartOpen, toggleCart } = useCart(); // Destructure isCartOpen and toggleCart from useCart()

    const pathName = usePathname();

    const isActive = (href: string) => {
        return pathName === href ? 'text-green-600 font-semibold' : '';
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="shadow-sm fixed w-full z-10 bg-white">
            <div className="w-full">
                <div className="flex items-center h-20 w-full">
                    <div className="flex items-center mx-20 justify-between w-full">
                        <Link className="flex justify-center items-center flex-shink-0" href={"/"}>
                            <h1 className="font-bold text-xl cursor-pointer">
                                Plan<span className="text-green-600">nt</span>
                            </h1>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive(
                                        '/'
                                    )}`}
                                    href={'/'}
                                >
                                    Accueil
                                </Link>

                                <Link
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive(
                                        '/about'
                                    )}`}
                                    href={'/about'}
                                >
                                    À propos
                                </Link>

                                <Link
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive(
                                        '/marketplace'
                                    )}`}
                                    href={'/marketplace'}
                                >
                                    Marché
                                </Link>

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
                        {/* Cart icon */}
                        <button
                            onClick={toggleCart} // Add toggleCart function to onClick event
                            className="hidden md:inline-flex bg-transparent focus:outline-none"
                        >
                            <FiShoppingCart className="h-6 w-6 text-gray-600 hover:text-green-600" />
                        </button>
                    </div>
                    <div className="mr-10 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="bg-green-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600 focus:outline-none focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                            type="button"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Ouvrir le menu principal</span>
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
                                        '/'
                                    )}`}
                                    href={'/'}
                                >
                                    Accueil
                                </Link>

                                <Link
                                    href={'/about'}
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium ${isActive(
                                        '/about'
                                    )}`}
                                >
                                    À propos
                                </Link>

                                <Link
                                    href={'/marketplace'}
                                    className={`cursor-pointer hover:bg-green-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium ${isActive(
                                        '/marketplace'
                                    )}`}
                                >
                                    Marché
                                </Link>

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
                <Transition
                    show={isCartOpen} // Use isCartOpen instead of isOpen
                    enter="transition ease-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    {(ref) => (
                        <div
                            ref={ref}
                            className="fixed top-0 right-0 h-full bg-white w-64 shadow-lg z-50 p-4 overflow-y-auto"
                        >
                            <Cart />
                        </div>
                    )}
                </Transition>
            </div>
        </nav>
    );
};

export default Navbar;
