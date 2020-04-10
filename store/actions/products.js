import Product from "../../models/product";

export const SET_PRODUCTS = 'SET_PRODUCTS';


// action creator
export const fetchProducts = () => {
    return async dispatch => {

        const response = await fetch(
            'https://popout-3e35c.firebaseio.com/products.json',
        );


        const resData = await response.json();
        console.log(resData);
        const loadedProducts = [];
        for (const key in resData) {
            loadedProducts.push(
                new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price,
                )
            );
        }
        dispatch({type: SET_PRODUCTS, products: loadedProducts});
    };

};
