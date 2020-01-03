import React from 'react';
import {connect} from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import {Button, View} from "react-native";

class UpdateCart extends React.Component {

    handleCartUpdate = async (predictions) => {

        if (predictions.length > 0) {
            let selectedProduct = await this.props.products.find(prod => prod.title === 'Baking Soda');
            await this.props.addToCart(selectedProduct);
        }

    };

    render() {
        return (
            <View>
                <Button title="Add To Cart" onPress={this.handleCartUpdate}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.availableProducts

    }
};

const mapDispatchToProps = () => {
    return {
        addToCart: cartActions.addToCart
    }
};

export default connect(mapStateToProps, mapDispatchToProps())(UpdateCart)







