import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { ShoppingContext } from '../../context/ShoppingContext';
import OrderCard from '../OrderCard/OrderCard';
import { totalPrice } from '../../utils/utils';

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingContext)
    
    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id != id);
        context.setCartProducts(filteredProducts);
        context.setCount(context.count - 1);
    };

    useEffect(() => {
        if (context.isCheckoutSideMenuOpen) {
            document.body.classList.add('no-scrolling');
        } else {
            document.body.classList.remove('no-scrolling');
        }

        return () => {
            document.body.classList.remove('no-scrolling');
        };
    }, [context.isCheckoutSideMenuOpen]);

    return (
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} max-sm:w-full max-sm:h-screen max-sm:border-none w-[420px] h-[calc(100vh-68px)] top-[68px] flex-col fixed right-0 bg-white shadow-2xl overflow-y-scroll z-20 rounded-l-2xl`}>
            <div className='flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10'>
                <h2 className='font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>Mi Orden</h2>
                <button onClick={() => context.closeCheckoutSideMenu()} className='bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 p-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-110'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div> 

            <div className='px-6 flex-1'>
                {
                    context.cartProducts.map(product => (
                        <OrderCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            imageUrl={product.images}
                            handleDelete={handleDelete}
                        />
                    ))
                }
            </div>
            <div className='px-6 py-6 bg-gradient-to-b from-white to-purple-50 sticky bottom-0'>
                <div className='bg-white rounded-2xl p-4 shadow-lg mb-4'>
                    <p className='flex justify-between items-center'>
                        <span className='font-semibold text-gray-700'>Total:</span>
                        <span className='font-bold text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>${totalPrice(context.cartProducts)}</span>
                    </p>
                </div>
                <Link to='/cart'>
                    <button className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 text-white w-full rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105' onClick={() => context.closeCheckoutSideMenu()}>
                        Ver mi carrito
                    </button>
                </Link>
            </div>
        </aside>
    );
}

export default CheckoutSideMenu;