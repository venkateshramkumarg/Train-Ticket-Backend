import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

const bookingsGroup = new Hono();
const prisma = new PrismaClient();

bookingsGroup.post('/create/booking/new', async (c) => {
  const { user_name, trainNo, noOfSeats } = await c.req.json();
  try {
    const seats = await prisma.train.findFirst({
      where: {
        trainNo: trainNo,
      },
      select: {
        noOfSeatsAvailable: true,
      },
    });
    console.log(seats);
    if (seats) {
      const { noOfSeatsAvailable } = seats;
      if (noOfSeatsAvailable >= noOfSeats) {
        const booking = await prisma.bookings.create({
          data: {
            user_name: user_name,
            trainNo: trainNo,
            noOfSeats: noOfSeats,
          },
        });
        await prisma.train.update({
          where: {
            trainNo: trainNo,
          },
          data: {
            noOfSeatsAvailable: { decrement: noOfSeats },
          },
        });

        return c.json('Booking done successfully' + '\n' + booking);
      } else {
        return c.json(`Only ${noOfSeatsAvailable} seats Available`);
      }
    } else {
      return c.json('Train No not valid');
    }
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

bookingsGroup.delete('/delete/booking/:id', async (c) => {
  const { id } = c.req.param();
  const booking_id = Number(id);
  try {
    const booking = await prisma.bookings.delete({
      where: {
        booking_id: booking_id,
      },
    });
    return c.json('Booking deleted Successfully' + '\n' + booking);
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

bookingsGroup.get('/bookings/:id', async (c) => {
  const { id } = c.req.param();
  const booking_id = Number(id);
  try {
    const booking = await prisma.bookings.findUnique({
      where: {
        booking_id: booking_id,
      },
    });
    if (booking) {
      return c.json(booking);
    } else {
      return c.json('Booking Id is not valid');
    }
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

export default bookingsGroup;
