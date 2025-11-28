import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ShoppingContext } from '../../context/ShoppingContext';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
    const context = useContext(ShoppingContext);
    // Sign Out
    const signOut = localStorage.getItem('sign-out');
    const parsedSignOut = JSON.parse(signOut);
    const isUserSignOut = context.signOut || parsedSignOut;
    // Account
    const account = localStorage.getItem('account');
    const parsedAccount = JSON.parse(account);
    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
    // Navbar styles and Scrolling 
    const [scrolling, setScrolling] = useState(false);
    const activeStyle = "underline underline-offset-4";
    const navbarStyles = scrolling ? 'bg-neutral-900 text-neutral-200' : 'bg-white text-neutral-900';
    const linkStyles = scrolling ? 'hover:text-neutral-50' : 'hover:text-neutral-600';
    const linkSignInStyle = scrolling ? 'text-black bg-white font-normal' : 'text-white bg-neutral-900';
    const isMobile = useMediaQuery({ maxWidth: 820 });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
    }, []);

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true);
        localStorage.setItem('sign-out', stringifiedSignOut);
        context.setSignOut(true);
    };
    
    const renderView = () => {
        if (hasUserAnAccount && !isUserSignOut) {
            return (
            <>
                <li className='text-black/60'>
                    {parsedAccount?.email}
                </li>
                <li className={linkStyles}>
                    <NavLink to='/my-orders' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Mis Órdenes
                    </NavLink>
                </li>
                <li className={linkStyles}>
                    <NavLink to='/my-account' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Mi Cuenta
                    </NavLink>
                </li>
                <li className={linkStyles}>
                    <NavLink to='/sign-in' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Cerrar Sesión
                    </NavLink>
                </li>
            </>
            )
        } else {
            return (
            <li>
                <NavLink to="/sign-in" className={`px-2 py-1 hover:opacity-80 transition duration-150 hover:ease-linear text-base font-light ${linkSignInStyle}`} onClick={() => handleSignOut()}>
                    Iniciar Sesión
                </NavLink>
            </li>
            )
        }
    }


    return (
        <>
            {isMobile ? (
                <MobileNavbar navbarStyles={navbarStyles} />
            ) : (
                <nav className={`flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light shadow-md backdrop-blur-sm ${navbarStyles}`}>
                    <ul className='flex items-center gap-3'>
                        <li className='font-bold text-xl'>
                            <NavLink to='/' onClick={() => context.setSearchByCategory()} className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all'>
                                🛍️ tienda virtual
                            </NavLink>
                        </li>
                        <li className={linkStyles}>
                            <NavLink to='/' onClick={() => context.setSearchByCategory()} className={({ isActive }) => isActive ? activeStyle : undefined}>
                                Todo
                            </NavLink>
                        </li>
                        <li className={linkStyles}> 
                            <NavLink to='/clothes' onClick={() => context.setSearchByCategory('clothes')} className={({ isActive }) => isActive ? activeStyle : undefined}>
                                Ropa
                            </NavLink>
                        </li>
                        <li className={linkStyles}>
                            <NavLink to='/electronics' onClick={() => context.setSearchByCategory('electronics')} className={({ isActive }) => isActive ? activeStyle : undefined}>
                                Electrónicos
                            </NavLink>
                        </li>
                        <li className={linkStyles}>
                            <NavLink to='/fornitures' onClick={() => context.setSearchByCategory('fornitures')} className={({ isActive }) => isActive ? activeStyle : undefined}>
                                Muebles
                            </NavLink>
                        </li>
                        <li className={linkStyles}>
                            <NavLink to='/toys' onClick={() => context.setSearchByCategory('toys')} className={({ isActive }) => isActive ? activeStyle : undefined}>
                                Juguetes
                            </NavLink>
                        </li>
                        <li className={linkStyles}>
                            <NavLink to='/others' onClick={() => context.setSearchByCategory('others')} className={({ isActive }) => isActive ? activeStyle : undefined}>
                                Otros
                            </NavLink>
                        </li>
                    </ul>

                    <ul className='flex items-center gap-3'>
                        {renderView()}
                        <li className='cursor-pointer flex gap-1 justify-center items-center'>
                            <NavLink to='/cart' className='flex gap-1 justify-center items-center relative group'>
                                <div className='relative'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    {context.count > 0 && (
                                        <span className='absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse'>
                                            {context.count}
                                        </span>
                                    )}
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            )}
        </>  
    );
}

export default Navbar;