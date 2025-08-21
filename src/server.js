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
