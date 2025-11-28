import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingContext } from '../../context/ShoppingContext';
import OrderCard from '../../components/OrderCard/OrderCard';

function MyOrder() {
  const context = useContext(ShoppingContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  if (index === 'last') index = (context.order?.length - 1);

  return (
    <div className='flex flex-col items-center px-4'>
      <div className='flex items-center justify-center relative w-full max-w-2xl mb-8'>
        <Link to='/my-orders' className='bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 p-3 rounded-full absolute left-0 transition-all duration-300 hover:scale-110'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-purple-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className='font-bold text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>📋 Mi Orden</h1>
      </div>
      <div className='flex flex-col w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6'>
        {
          context.order?.[index]?.products.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
            />
          )
          )
        }
        <div className='mt-6 pt-6 border-t-2 border-purple-100'>
          <p className='flex justify-between items-center bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl'>
            <span className='font-bold text-xl text-gray-700'>Total:</span>
            <span className='font-bold text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>${context.order?.[index]?.totalPrice}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyOrder;