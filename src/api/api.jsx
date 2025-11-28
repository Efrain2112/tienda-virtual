// API principal - Platzi Fake Store
export const apiUrl = 'https://api.escuelajs.co/api/v1';

// API alternativa - FakeStore API
export const fakeStoreApiUrl = 'https://fakestoreapi.com';

// Función para obtener productos de ambas APIs
export const fetchAllProducts = async () => {
  try {
    // Obtener productos de Platzi API
    const platziResponse = await fetch(`${apiUrl}/products`);
    const platziProducts = await platziResponse.json();

    // Obtener productos de FakeStore API
    const fakeStoreResponse = await fetch(`${fakeStoreApiUrl}/products`);
    const fakeStoreProducts = await fakeStoreResponse.json();

    // Normalizar productos de FakeStore para que coincidan con el formato de Platzi
    const normalizedFakeStore = fakeStoreProducts.map(product => ({
      id: `fs-${product.id}`,
      title: product.title,
      price: product.price,
      description: product.description,
      images: [product.image, product.image, product.image],
      category: {
        id: product.category,
        name: product.category,
        image: product.image
      }
    }));

    // Combinar ambos arrays
    return [...platziProducts, ...normalizedFakeStore];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};