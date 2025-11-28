import { useContext } from "react";
import { ShoppingContext } from "../../context/ShoppingContext";

const Card = (data) => {
  const context = useContext(ShoppingContext);

  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
    context.closeCheckoutSideMenu();
  };

  const addProductsToCart = (event, productData) => {
    event.stopPropagation();
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productData]);
    context.openCheckoutSideMenu();
    context.closeProductDetail();
    console.log('CART: ', context.cartProducts);
  };

  const addToWishlist = (event, productData) => {
    event.stopPropagation();
    const isInWishlist = context.wishlist.some(item => item.id === productData.id);
    if (!isInWishlist) {
      context.setWishlist([...context.wishlist, productData]);
    }
  };

  const renderIcon = (id) => {
    const isInCart = (context.cartProducts.filter(product => product.id === id).length > 0);

    if (isInCart) {
      return (
        <div className='absolute top-3 right-3 flex justify-center items-center text-white bg-gradient-to-r from-emerald-500 to-green-500 w-10 h-10 rounded-full shadow-lg z-10'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
      );
    } else {
      return (
        <div onClick={(event) => addProductsToCart(event, data.data)} className='absolute top-3 right-3 flex justify-center items-center bg-white w-10 h-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white z-10'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>
      );
    }
  };

  const renderWishlistIcon = () => {
    const isInWishlist = context.wishlist.some(item => item.id === data.data.id);
    
    return (
      <button
        onClick={(event) => addToWishlist(event, data.data)}
        className={`absolute top-3 left-3 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 ${
          isInWishlist 
            ? 'bg-red-500 text-white' 
            : 'bg-white text-gray-400 hover:text-red-500'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill={isInWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </button>
    );
  };

  return (
    <div className='group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1' onClick={() => showProduct(data.data)}>
      <figure className='relative w-full overflow-hidden'>
        <span className='absolute bottom-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 shadow-lg'>
          {data.data.category.name}
        </span>
        <img className='h-[280px] w-full object-cover sm:h-[320px] group-hover:scale-110 transition-transform duration-500' src={data.data.images[0]} alt={data.data.title} />
        {renderWishlistIcon()}
        {renderIcon(data.data.id)}
      </figure>
      <div className="p-4 bg-gradient-to-b from-white to-gray-50">
        <p className='text-gray-800 font-medium text-sm mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors'>
          {data.data.title}
        </p>
        <div className='flex items-center justify-between'>
          <span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
            ${data.data.price}
          </span>
          <span className='text-xs text-gray-500 font-medium'>Ver más →</span>
        </div>
      </div>
    </div>
  );
}
  
export default Card;