// import { useCartContext } from './CartContextProvider';
// import useCartTotal from './useCartTotal';
// import { ICartProduct } from 'models';

// const useCartProducts = () => {
//   const { products, setProducts } = useCartContext();
//   const { updateCartTotal } = useCartTotal();

//   const updateQuantitySafely = (
//     currentProduct: ICartProduct,
//     targetProduct: ICartProduct,
//     quantity: number
//   ): ICartProduct => {
//     if (currentProduct.id === targetProduct.id) {
//       return Object.assign({
//         ...currentProduct,
//         quantity: currentProduct.quantity + quantity,
//       });
//     } else {
//       return currentProduct;
//     }
//   };

//   const addProduct = (newProduct: ICartProduct) => {
//     let updatedProducts;
//     const isProductAlreadyInCart = products.some(
//       (product: ICartProduct) => newProduct.id === product.id
//     );

//     if (isProductAlreadyInCart) {
//       updatedProducts = products.map((product: ICartProduct) => {
//         return updateQuantitySafely(product, newProduct, newProduct.quantity);
//       });
//     } else {
//       updatedProducts = [...products, newProduct];
//     }

//     setProducts(updatedProducts);
//     updateCartTotal(updatedProducts);
//   };

//   const removeProduct = (productToRemove: ICartProduct) => {
//     const updatedProducts = products.filter(
//       (product: ICartProduct) => product.id !== productToRemove.id
//     );

//     setProducts(updatedProducts);
//     updateCartTotal(updatedProducts);
//   };

//   const increaseProductQuantity = (productToIncrease: ICartProduct) => {
//     const updatedProducts = products.map((product: ICartProduct) => {
//       return updateQuantitySafely(product, productToIncrease, +1);
//     });

//     setProducts(updatedProducts);
//     updateCartTotal(updatedProducts);
//   };

//   const decreaseProductQuantity = (productToDecrease: ICartProduct) => {
//     const updatedProducts = products.map((product: ICartProduct) => {
//       return updateQuantitySafely(product, productToDecrease, -1);
//     });

//     setProducts(updatedProducts);
//     updateCartTotal(updatedProducts);
//   };

//   return {
//     products,
//     addProduct,
//     removeProduct,
//     increaseProductQuantity,
//     decreaseProductQuantity,
//   };
// };

// export default useCartProducts;

import { useCartContext } from './CartContextProvider';
import useCartTotal from './useCartTotal';
import { ICartProduct } from 'models';

const useCartProducts = () => {
  const { products, setProducts } = useCartContext();
  const { updateCartTotal } = useCartTotal();

  const updateQuantitySafely = (
    currentProduct: ICartProduct,
    targetProduct: ICartProduct,
    quantity: number
  ): ICartProduct => {
    if (currentProduct.id === targetProduct.id) {
      return Object.assign({
        ...currentProduct,
        quantity: currentProduct.quantity + quantity,
      });
    } else {
      return currentProduct;
    }
  };

  const addProduct = (newProduct: ICartProduct) => {
    let updatedProducts;
    const isProductAlreadyInCart = products.some(
      (product: ICartProduct) => newProduct.id === product.id
    );

    if (isProductAlreadyInCart) {
      updatedProducts = products.map((product: ICartProduct) => {
        return updateQuantitySafely(product, newProduct, newProduct.quantity);
      });
    } else {
      updatedProducts = [...products, newProduct];
    }

    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };

  const removeProduct = (productToRemove: ICartProduct) => {
    const updatedProducts = products.filter(
      (product: ICartProduct) => product.id !== productToRemove.id
    );

    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };

  const increaseProductQuantity = (productToIncrease: ICartProduct) => {
    const updatedProducts = products.map((product: ICartProduct) => {
      if (product.id === productToIncrease.id) {
        // Ensure quantity does not exceed 10
        const newQuantity = product.quantity + 1;
        return newQuantity <= 10
          ? { ...product, quantity: newQuantity }
          : product; // Keep the current product if it exceeds the limit
      }
      return product;
    });

    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };

  const decreaseProductQuantity = (productToDecrease: ICartProduct) => {
    const updatedProducts = products.map((product: ICartProduct) => {
      if (product.id === productToDecrease.id) {
        // Ensure quantity doesn't go below 1
        const newQuantity = product.quantity - 1;
        return newQuantity >= 1
          ? { ...product, quantity: newQuantity }
          : product; // Keep the current product if it goes below 1
      }
      return product;
    });

    setProducts(updatedProducts);
    updateCartTotal(updatedProducts);
  };

  return {
    products,
    addProduct,
    removeProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
  };
};

export default useCartProducts;
