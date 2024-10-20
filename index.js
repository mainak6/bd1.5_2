const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let currentCartTotal = parseFloat(req.query.currentCartTotal);
  let updatedCartTotal = currentCartTotal + newItemPrice;
  res.send(updatedCartTotal.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  if (isMember) {
    cartTotal = cartTotal - cartTotal * 0.1;
  } else {
    cartTotal = 0;
  }
  res.send(cartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send((cartTotal * 0.05).toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let delivery;
  if (shippingMethod === 'standard') {
    delivery = (distance / 50).toString();
  } else if (shippingMethod === 'express') {
    delivery = (distance / 100).toString();
  } else {
    delivery = 'Invalide Shipping Method';
  }
  res.send(delivery);
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = weight * distance * 0.1;
  res.send(result.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result;
  result = purchaseAmount * 2;
  res.send(result.toString());
});

app.get('/flip-deal', (req, res) => {
  let product = req.query.product;
  let discount = parseFloat(req.query.discount);
  let shipping = req.query.shipping;
  let totalAmount = parseFloat(req.query.totalAmount);
  let memberShip = req.query.memberShip === 'prime';
  if (product === 'mobile') {
    if (memberShip) {
      discount = 15000 - 15000 * 0.1;
    } else {
      discount = 15000;
    }
  } else {
    ('Chouse the Product');
  }

  if (
    location === 'mumbai' ||
    location === 'delhi' ||
    location === 'chennai' ||
    location === 'kolkata'
  ) {
    if (shipping === 'standard') {
      totalAmount = discount / 50;
    } else if (shipping === 'express') {
      totalAmount = discount / 100;
    }
  } else {
    ('do not found your location');
  }
  res.send(totalAmount.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
