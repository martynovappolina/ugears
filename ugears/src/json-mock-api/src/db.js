var products = require('./products.json');
var reviews = require('./reviews.json');
var shops = require('./shops.json');
var users = require('./users.json');

module.exports = function() {
    return {
        products: products,
        reviews: reviews,
        shops: shops,
        users: users
    }
}