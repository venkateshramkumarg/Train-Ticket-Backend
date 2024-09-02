import { Hono } from 'hono';
import stationGroup from './api/stations';
import usersGroup from './api/users';
import adminGroup from './api/admin';
import trainsGroup from './api/trains';
import bookingsGroup from './api/bookings';

const app = new Hono().basePath('/api');

app.route('/stations', stationGroup);
app.route('/users', usersGroup);
app.route('/admin', adminGroup);
app.route('/trains', trainsGroup);
app.route('/bookings', bookingsGroup);

app.get('/', async (c) => {
  return c.text('Welcome to Train Ticket Booking System');
});

export default app;
