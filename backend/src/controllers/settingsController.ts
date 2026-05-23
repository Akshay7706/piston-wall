import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getSetting = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    console.log('Fetching setting for key:', key);
    
    const setting = await prisma.setting.findUnique({
      where: { key: String(key) },
    });
    
    console.log('Found setting:', setting);
    res.json(setting || { key, value: '' });
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({ message: 'Error fetching setting' });
  }
};

export const updateSetting = async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body;
    console.log('Updating setting:', key, value);
    
    const setting = await prisma.setting.upsert({
      where: { key: String(key) },
      update: { value: String(value) },
      create: { key: String(key), value: String(value) },
    });
    
    res.json(setting);
  } catch (error) {
    console.error('Error updating setting:', error);
    res.status(500).json({ message: 'Error updating setting' });
  }
};
