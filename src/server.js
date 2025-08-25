// server.js
require('dotenv').config();
const express = require('express');
const { initDB } = require('./loaders/sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------- MIDDLEWARE -------------------- //
app.use(express.json());

// -------------------- ROUTES -------------------- //

// ✅ Users (Sequelize)
const usersRoutes = require('./routes/users.routes');
app.use('/api/users', usersRoutes);

// ✅ Userinfos (Raw MySQL)
const userInfosRoutes = require('./routes/userInfos.routes');
app.use('/api/userInfos', userInfosRoutes);

// ✅ Radcheck (Sequelize)
const radcheckRoutes = require('./routes/radcheck.routes');
app.use('/api/radcheck', radcheckRoutes);

// ✅ Client File Permissions (Sequelize)
const clientFilePermissionsRoutes = require('./routes/clientfilepermissions.routes');
app.use('/api/clientfilepermissions', clientFilePermissionsRoutes);

// ✅ Websockets Statistics Entries (Sequelize style)
const websocketsStatisticsEntriesRoutes = require('./routes/websockets_statistics_entries.routes');
app.use('/api/websockets_statistics_entries', websocketsStatisticsEntriesRoutes);

// ✅ WallGardens
const wallGardensRoutes = require('./routes/wallgardens.routes');
app.use('/api/wallgardens', wallGardensRoutes);

// ✅ TR-069 Diagnostics
const tr069Routes = require('./routes/tr069diags.routes');
app.use('/api/tr069diags', tr069Routes);

// ✅ Tickets
const ticketsRoutes = require('./routes/tickets.routes');
app.use('/api/tickets', ticketsRoutes);

// ✅ Ticket Details
const ticketDetailsRoutes = require('./routes/ticketdetails.routes');
app.use('/api/ticketdetails', ticketDetailsRoutes);

// ✅ Static IPs
const staticipsRoutes = require('./routes/staticips.routes');
app.use('/api/staticips', staticipsRoutes);

// ✅ RAD USER GROUP
const radusergroupRoutes = require('./routes/radusergroup.routes');
app.use('/api/radusergroup', radusergroupRoutes);

// ✅ RAD POST AUTH
const radpostauthRoutes = require('./routes/radpostauth.routes');
app.use('/api/radpostauth', radpostauthRoutes);

// ✅ RAD FROUP REPLY
const radgroupreplyRoutes = require('./routes/radgroupreply.routes');
app.use('/api/radgroupreply', radgroupreplyRoutes);

// ✅ SUBSCRIBER 
const subscriberRoutes = require('./routes/subscriber.routes');
app.use('/api/subscribers', subscriberRoutes);

// ✅ RAD GROUP CHECK
const radgroupcheckRoutes = require('./routes/radgroupcheck.routes');
app.use('/api/radgroupcheck', radgroupcheckRoutes);

// NAS
const nasRoutes = require('./routes/nas.routes');
app.use('/api/nas', nasRoutes);


// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API 🚀' });
});

// -------------------- START SERVER -------------------- //
const startServer = async () => {
  const dbOk = await initDB({ retries: 5, delay: 2000 });
  if (!dbOk) {
    console.error('❌ Database initialization failed — exiting.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
