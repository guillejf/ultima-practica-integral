import TicketsDTO from './DTO/tickets.dto.js';
import { ticketService } from '../services/tickets.service.js';
import { cartService } from '../services/carts.service.js';
import { logger } from '../utils/main.js';

class TicketsController {
  async readById(req, res) {
    try {
      const code = req.params.tid;
      const ticket = await ticketService.readById(code);
      logger.info(ticket);
      return res.status(201).json({
        status: 'success',
        msg: 'Detalles del ticket',
        payload: {
          id: ticket._id,
          code: ticket.code,
          dateTime: ticket.purchase_datetime,
          user: ticket.purchaser,
          cartId: ticket.cartId,
          products: ticket.products,
          totalPurchase: ticket.amount,
        },
      });
    } catch (e) {
      logger.error(e);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  async readByRender(req, res) {
    try {
      const user = req.session.user;
      const cart = await cartService.readById(user.cartId);
      const tickets = await ticketService.readAll(cart._id);
      if (cart._id === tickets[0].cartId) {
        const formattedTickets = await ticketService.readByRender(tickets);
        const title = 'Listado de compras realizadas';
        res.status(200).render('purchases', {
          user,
          title,
          formattedTickets,
        });
      } else {
        logger.error('Solo puedes ver los tickets que hayas generado con tu usuario');
        throw Error;
      }
    } catch (e) {
      logger.error(e);
    }
  }

  async create(req, res) {
    try {
      const user = req.session.user;
      const { usuario, cart_id, total } = req.body.cartData;
      const purchase = new TicketsDTO({
        usuario,
        cart_id,
        total,
      });
      logger.info(purchase);

      const cartData = await cartService.readById(cart_id);
      const newTicket = await ticketService.create(purchase, cartData.products, user);
      return res.status(201).json({
        status: 'success',
        msg: 'Producto Creado',
        payload: {
          newTicket,
        },
      });
    } catch (e) {
      logger.error(e);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
}

export const ticketsController = new TicketsController();
