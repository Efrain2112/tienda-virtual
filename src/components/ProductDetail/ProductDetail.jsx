import { useContext, useEffect } from "react";
import { ShoppingContext } from "../../context/ShoppingContext";

const ProductDetail = () => {
    const context = useContext(ShoppingContext);

    useEffect(() => {
        if (context.isProductDetailOpen) {
            document.body.classList.add('no-scrolling');
        } else {
            document.body.classList.remove('no-scrolling');
        }

        return () => {
            document.body.classList.remove('no-scrolling');
        };
    }, [context.isProductDetailOpen]);
    
    return (
        <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} max-sm:w-full max-sm:h-screen max-sm:border-none max-sm:overflow-y-scroll max-sm:no-scrollbar w-[400px] h-[calc(100vh-68px)] top-[68px] flex flex-col fixed right-0 bg-white shadow-2xl z-20 rounded-l-2xl`}>
            <div className='flex justify-between items-center p-6 border-b border-gray-100'>
                <h2 className='font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>Detalle del Producto</h2>
                <button className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 p-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={() => context.closeProductDetail()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <figure className='px-6 pt-6'>
                <img
                className='w-full h-72 object-cover rounded-2xl shadow-lg'
                src={context.productToShow.images}
                alt={context.productToShow.title} />
            </figure>
            <div className='flex flex-col p-6 gap-4'>
                <div className='flex items-center justify-between'>
                    <span className='text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>${context.productToShow.price}</span>
                    <span className='bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full'>En stock</span>
                </div>
                <h3 className='font-bold text-xl text-gray-800'>{context.productToShow.title}</h3>
                <p className='text-gray-600 text-sm leading-relaxed'>{context.productToShow.description}</p>
            </div>
        </aside>
    );
}

export default ProductDetail;