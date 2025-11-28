import { useContext } from 'react';
import { ShoppingContext } from '../../context/ShoppingContext';
import './Wishlist.css';

const Wishlist = () => {
  const context = useContext(ShoppingContext);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = context.wishlist.filter(item => item.id !== productId);
    context.setWishlist(updatedWishlist);
  };

  const addToCartFromWishlist = (product) => {
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, product]);
    removeFromWishlist(product.id);
    context.openCheckoutSideMenu();
  };

  return (
    <aside className={`wishlist ${context.isWishlistOpen ? 'wishlist--open' : ''}`}>
      <div className="wishlist__header">
        <h2 className="wishlist__title">❤️ Mi Lista de Deseos</h2>
        <button 
          className="wishlist__close-btn"
          onClick={() => context.closeWishlist()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="wishlist__content">
        {context.wishlist?.length > 0 ? (
          context.wishlist.map(product => (
            <div key={product.id} className="wishlist-item">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="wishlist-item__image"
              />
              <div className="wishlist-item__info">
                <h3 className="wishlist-item__title">{product.title}</h3>
                <p className="wishlist-item__price">${product.price}</p>
              </div>
              <div className="wishlist-item__actions">
                <button
                  className="wishlist-item__add-btn"
                  onClick={() => addToCartFromWishlist(product)}
                  title="Agregar al carrito"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </button>
                <button
                  className="wishlist-item__remove-btn"
                  onClick={() => removeFromWishlist(product.id)}
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="wishlist__empty">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <p className="wishlist__empty-text">Tu lista de deseos está vacía</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Wishlist;
