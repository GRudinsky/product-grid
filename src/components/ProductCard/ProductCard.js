import React, { useState, useEffect } from 'react';
import './ProductCard.scss';

const ProductCard = ({ data, checkHandler }) => {
  const [product, setProduct] = useState({});
  useEffect(() => setProduct(data), [data]);
  const {
    imageUrl,
    name,
    price,
    priceWas,
    promotionBadge,
    quantity,
    available,
    lowOnStock,
    productId,
    isChecked
  } = product;

  const backGroundImage = {
    backgroundImage: `url(${imageUrl})`
  };
  const formatQuantity = () => {
    const noStock = quantity === 0 || !available;
    const lowStock = !noStock && lowOnStock;
    return (
      <div className="detailsContainer__quantity">
        <h6 id="quantityIndicator" className={noStock ? 'danger' : 'success'}>
          {noStock ? 'OUT OF STOCK' : `${quantity} in stock`}
        </h6>
        {lowStock && (
          <h6 id="lowStockIndicator" className="warning">
            LOW ON STOCK
          </h6>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="cardWrapper" id={productId}>
        <div className="imageContainer" style={backGroundImage}>
          <div className="imageContainer__checkBoxWrapper">
            <input
              type="checkBox"
              checked={isChecked}
              value={productId || ''}
              onChange={checkHandler}
            />
          </div>
          {promotionBadge && (
            <div className="imageContainer__promoWrapper">
              <h5>{promotionBadge}</h5>
            </div>
          )}
        </div>
        <div className="detailsContainer">
          <p className="detailsContainer__name">{name}</p>
          <h5 className="detailsContainer__price">
            {`£${price} `}
            <span>{`£${priceWas}`}</span>
          </h5>
          {formatQuantity()}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
