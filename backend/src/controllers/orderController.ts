import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, customerEmail, totalAmount } = req.body;
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        totalAmount: parseFloat(totalAmount),
      },
    });
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: id as string },
      data: { status },
    });
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};
