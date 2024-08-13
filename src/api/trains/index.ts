import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

const trainsGroup = new Hono();
const prisma = new PrismaClient();

trainsGroup.post('/create/train/new', async (c) => {
  const {
    user_name,
    trainNo,
    trainName,
    noOfSeatsAvailable,
    departureDate,
    stationIds,
  } = await c.req.json();
  console.log(
    trainNo + trainName + noOfSeatsAvailable + departureDate + stationIds,
  );
  try {
    const admin = await prisma.user.findFirst({
      where: {
        user_name: user_name,
      },
      select: {
        role: true,
      },
    });
    if (admin) {
      if (admin.role === 'ADMIN') {
        const train = await prisma.train.create({
          data: {
            trainNo: trainNo,
            trainName: trainName,
            noOfSeatsAvailable: noOfSeatsAvailable,
            departureDate: departureDate,
            trainStations: {
              create: stationIds.map((id: String) => ({
                stationId: id,
              })),
            },
          },
        });

        return c.json('Train added Successfully' + '\n' + train);
      } else {
        return c.json('User not allowed to enter the details');
      }
    }
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

trainsGroup.delete('/delete/train/:number', async (c) => {
  const { number } = c.req.param();
  let trainNo = Number(number);
  try {
    const train = await prisma.train.delete({
      where: {
        trainNo: trainNo,
      },
    });
    return c.json('Train deleted Successfully' + '\n' + train);
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

trainsGroup.get('/trains/:number', async (c) => {
  const a = c.req.param();
  console.log(a);
  let { number } = c.req.param();
  let trainNo = Number(number);
  try {
    const trains = await prisma.train.findUnique({
      where: {
        trainNo: trainNo,
      },
      select: {
        trainName: true,
        trainNo: true,
        noOfSeatsAvailable: true,
        departureDate: true,
        trainStations: {
          select: {
            station: true,
          },
        },
      },
    });
    if (trains) {
      return c.json(trains);
    } else {
      return c.json('Train No is not valid');
    }
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

trainsGroup.get('/trains', async (c) => {
  try {
    const trains = await prisma.train.findMany({
      select: {
        trainName: true,
        trainNo: true,
        noOfSeatsAvailable: true,
        departureDate: true,
        trainStations: {
          select: {
            station: true,
          },
        },
      },
    });
    return c.json(trains);
  } catch (e) {
    return c.json('Error');
  } finally {
    await prisma.$disconnect();
  }
});

export default trainsGroup;
