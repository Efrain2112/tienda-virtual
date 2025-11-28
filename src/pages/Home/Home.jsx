import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingContext } from "../../context/ShoppingContext";
import Card from "../../components/Card/Card";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import CheckoutSideMenu from "../../components/CheckoutSideMenu/CheckoutSideMenu";
import ProductLoading from "../../components/ProductLoading/ProductLoading";

function Home() {
  const context = useContext(ShoppingContext);
  const location = useLocation();

  useEffect(() => {
    context.closeCheckoutSideMenu();
    context.closeProductDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const renderNoMatches = () => (
    <div id="top" className="flex flex-col justify-center items-center gap-3">
      <p className="text-center font-medium text-lg">
        {context.searchByTitle ? "Lo sentimos, no se encontraron resultados.": "Productos Exclusivos"}
      </p>
      {context.searchByTitle && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-56 h-56 text-neutral-900">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
        </svg>
      )}
    </div>
  );

  const renderProducts = () => (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {context.filteredItems?.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </div>
  );

  const renderView = () => {
    if (context.loading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-sm:gap-2 gap-4 w-full max-w-screen-lg max-lg:px-3">
          <ProductLoading />
          <ProductLoading />
          <ProductLoading />
          <ProductLoading />
          <ProductLoading />
          <ProductLoading />
          <ProductLoading />
          <ProductLoading />
          <ProductLoading />
          <ProductLoading />
          <ProductLoading />
          <ProductLoading />
        </div> 
      );
    } else if (context.filteredItems?.length > 0) {
      return renderProducts();
    } else {
      return renderNoMatches();
    }
  };

  return (
    <div className='flex flex-col items-center gap-6 bg-gradient-to-b from-purple-50 via-white to-pink-50 min-h-screen py-8'>
      <div className='flex flex-col items-center gap-3 mb-2'>
        <h1 className='font-bold text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
          Productos Exclusivos
        </h1>
        <p className='text-gray-600 text-sm'>Descubre las mejores ofertas</p>
      </div>
      <div className='relative max-sm:w-72 w-96'>
        <input
          type="text"
          placeholder='Buscar un producto...'
          className='w-full rounded-full border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 px-6 py-4 pl-12 shadow-md transition-all duration-300 outline-none'
          onChange={(event) => context.setSearchByTitle(event.target.value)} 
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-purple-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      <div className='w-full max-w-screen-xl max-lg:px-4 mb-8'>
        {renderView()}
      </div>
      <ProductDetail />
      <CheckoutSideMenu />
    </div>
  );
}
  
export default Home;