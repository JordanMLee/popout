import Product from "../../models/product";

export const SET_PRODUCTS = 'SET_PRODUCTS';


// action creator
export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://popout-3e35c.firebaseio.com/products.json',
            );

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

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
        } catch (err) {
            // send to logging server
            throw err;
        }
    };

};
