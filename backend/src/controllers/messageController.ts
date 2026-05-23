import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: 'Error creating message' });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.message.delete({
      where: { id: id as string },
    });
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Error deleting message' });
  }
};
