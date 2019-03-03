export default {
    categories: state => state.shop.categories,
    cart: state => state.shop.cart,

    // user
    user: state => state.auth.user,
    addressList: state => state.auth.addressList
}
