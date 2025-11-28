import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ShoppingContext } from '../../context/ShoppingContext';

const Filters = ({ onClose }) => {
  const context = useContext(ShoppingContext);

  const priceRanges = [
    { label: 'Todos', min: 0, max: Infinity },
    { label: 'Menos de $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Más de $200', min: 200, max: Infinity }
  ];

  const sortOptions = [
    { label: 'Más recientes', value: 'newest' },
    { label: 'Precio: Menor a Mayor', value: 'price-asc' },
    { label: 'Precio: Mayor a Menor', value: 'price-desc' },
    { label: 'Nombre: A-Z', value: 'name-asc' }
  ];

  return (
    <div className="filters">
      <div className="filters__header">
        <h3 className="filters__title">Filtros</h3>
        <button 
          className="filters__close-btn"
          onClick={onClose}
          aria-label="Cerrar filtros"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="filters__section">
        <h4 className="filters__section-title">Rango de Precio</h4>
        <div className="filters__options">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              className="filters__option-btn"
              onClick={() => context.setPriceRange(range)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filters__section">
        <h4 className="filters__section-title">Ordenar por</h4>
        <div className="filters__options">
          {sortOptions.map((option, index) => (
            <button
              key={index}
              className="filters__option-btn"
              onClick={() => context.setSortBy(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filters__actions">
        <button 
          className="filters__clear-btn"
          onClick={() => {
            context.setPriceRange({ min: 0, max: Infinity });
            context.setSortBy('newest');
          }}
        >
          Limpiar Filtros
        </button>
        <button 
          className="filters__apply-btn"
          onClick={onClose}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};

Filters.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Filters;
