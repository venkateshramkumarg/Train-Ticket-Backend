import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

const usersGroup = new Hono();
const prisma = new PrismaClient();

usersGroup.post('/create/user/new', async (c) => {
  const { user_name, password, email } = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        user_name: user_name,
        password: password,
        email: email,
      },
    });
    return c.json('User added Successfully' + '\n' + user);
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

usersGroup.delete('/delete/user/:name', async (c) => {
  const { name } = c.req.param();
  try {
    const user = await prisma.user.delete({
      where: {
        user_name: name,
      },
    });
    return c.json('User deleted Successfully' + '\n' + user);
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

usersGroup.put('/update/user/:name', async (c) => {
  const { name } = c.req.param();
  const { password, email } = await c.req.json();
  try {
    const user = await prisma.user.update({
      where: {
        user_name: name,
      },
      data: {
        password: password,
        email: email,
      },
    });
    return c.json('User updated Successfully' + '\n' + user);
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

usersGroup.post('/check/user', async (c) => {
  const { user_name, password } = await c.req.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        user_name: user_name,
      },
      select: {
        user_name: true,
        password: true,
      },
    });
    if (user) {
      if (user_name === user.user_name && password === user.password) {
        return c.json('Credintials are correct');
      } else {
        return c.json('Credintials mismatch');
      }
    } else {
      return c.json('User not found');
    }
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

export default usersGroup;
