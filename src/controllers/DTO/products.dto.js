export default class ProductsDTO {
  constructor(product) {
    this.title = product.title;
    this.description = product.description;
    this.category = product.category;
    this.code = product.code;
    this.price = product.price;
    this.stock = product.stock;
    this.thumbnail = product.thumbnail;
  }
}
