export default class TicketsDTO {
  constructor(ticket) {
    this.cartId = ticket.cart_id;
    this.code = ticket.code;
    this.purchase_datetime = ticket.purchase_datetime;
    this.amount = ticket.total;
    this.purchaser = ticket.usuario;
    this.products = ticket.products;
  }
}
