import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

const adminGroup = new Hono();
const prisma = new PrismaClient();
adminGroup.post('/create/admin/new', async (c) => {
  const { user_name, password, email } = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        user_name: user_name,
        password: password,
        email: email,
        role: 'ADMIN',
      },
    });
    return c.json('User added Successfully' + '\n' + user);
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

adminGroup.delete('/delete/admin/:name', async (c) => {
  const { name } = c.req.param();
  try {
    const user = await prisma.user.delete({
      where: {
        user_name: name,
      },
    });
    return c.json('Admin deleted Successfully' + '\n' + user);
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

adminGroup.put('/update/admin/:name', async (c) => {
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
    return c.json('Admin updated Successfully' + '\n' + user);
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

export default adminGroup;
