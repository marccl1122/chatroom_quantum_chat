import { Request, Response } from 'express';
import { groups, users } from '../app';

// Extend Express Request type to include session
declare module 'express' {
  interface Request {
    session: {
      userId?: string;
    } | null;
  }
}

interface GroupMember {
  userId: string;
  role: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
}

export const getChatPage = async (req: Request, res: Response) => {
  try {
    if (!req.session?.userId) {
      return res.redirect('/login');
    }

    const userGroups = Array.from(groups.values()).filter((group: Group) => 
      group.members.some((member: GroupMember) => member.userId === req.session?.userId)
    );
    
    res.render('chat', { 
      groups: userGroups,
      userId: req.session.userId,
      users: Array.from(users.values())
    });
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to load chat page' });
  }
};

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const groupId = Date.now().toString();
    const group: Group = {
      id: groupId,
      name,
      description,
      members: [{
        userId,
        role: 'ADMIN'
      }]
    };

    groups.set(groupId, group);
    res.redirect('/chat');
  } catch (error) {
    res.status(400).json({ error: 'Failed to create group' });
  }
}; 