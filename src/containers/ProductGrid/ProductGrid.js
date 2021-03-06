import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import { list } from '../../utils/services';
import { URL_MOCKY, ERROR_MESSAGE_LIST } from '../../utils/constants';
import './ProductGrid.scss';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, []);

  const fixResponseBooleans = (response) => {
    return response.map((item) => {
      return {
        ...item,
        available: item.available === 'TRUE' ? true : false,
        lowOnStock: item.lowOnStock === 'TRUE' ? true : false
      };
    });
  };

  const getProducts = async () => {
    try {
      const response = await list(URL_MOCKY);
      await setProducts(fixResponseBooleans(await response.json()));
    } catch (e) {
      setError(ERROR_MESSAGE_LIST);
    }
    setLoading(false);
  };

  const handleChecked = (e) => {
    const mappedProducts = products.map((item) =>
      item.productId === Number(e.target.value)
        ? { ...item, isChecked: !item.isChecked }
        : item
    );
    setProducts(mappedProducts);
  };

  const removeChecked = () => {
    const unCheckedProducts = products.filter((item) => !item.isChecked);
    setProducts(unCheckedProducts);
  };
  const checkedLength = products.filter((item) => item.isChecked).length;
  return (
    <>
      <div className="header">
        {checkedLength > 0 && (
          <Button
            clickHandler={removeChecked}
            text={`Remove ${checkedLength} selected product${
              checkedLength === 1 ? '' : 's'
            }`}
          />
        )}
      </div>
      <div className="mainWrapper">
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {!loading && !error && (
          <div className="gridWrapper">
            {products?.map((item, idx) => {
              const { productId } = item;
              return (
                <div className="gridWrapper__item" key={productId}>
                  <ProductCard data={item} checkHandler={handleChecked} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductGrid;
