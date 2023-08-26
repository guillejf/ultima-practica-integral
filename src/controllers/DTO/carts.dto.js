export default class CartsDTO {
  constructor(carts) {
    this._id = carts._id;
    this.products = carts.products;
  }
}
