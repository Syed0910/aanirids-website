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

// ✅ Email Statuses (Sequelize)
const emailStatusesRoutes = require('./routes/emailstatuses.routes');
app.use('/api/emailstatuses', emailStatusesRoutes);

// ✅ Email Templates (Sequelize)
const emailTemplatesRoutes = require('./routes/emailtemplates.routes');
app.use('/api/emailtemplates', emailTemplatesRoutes);

// ✅ File Permissions (Sequelize)
const filePermissionsRoutes = require("./routes/filepermissions.routes");
app.use("/api/filepermissions", filePermissionsRoutes);

// ✅ Inventories (Sequelize)
const inventoriesRoutes = require("./routes/inventories.routes");
app.use("/api/inventories", inventoriesRoutes);

// ✅ Invoice Statuses (Sequelize)
const invoiceStatusesRoutes = require("./routes/invoicestatuses.routes");
app.use("/api/invoicestatuses", invoiceStatusesRoutes);

// ✅ Invoice Types (Sequelize)
const invoiceTypesRoutes = require("./routes/invoicetypes.routes");
app.use("/api/invoicetypes", invoiceTypesRoutes);

// ✅ Maps (Sequelize)
const mapsRoutes = require("./routes/maps.routes");
app.use("/api/maps", mapsRoutes);

// ✅ SmsStatuses (Sequelize)
const smsStatusesRoutes = require("./routes/smsstatuses.routes");
app.use("/api/smsstatuses", smsStatusesRoutes);

// ✅ WhatsAppStatuses (Sequelize)
const whatsappStatusesRoutes = require("./routes/whatsappstatuses.routes");
app.use("/api/whatsappstatuses", whatsappStatusesRoutes);

// ✅ ReceiptTypes (Sequelize)
const receiptTypesRoutes = require("./routes/receipttypes.routes");
app.use("/api/receipttypes", receiptTypesRoutes);

// ✅ PlanInfos (Sequelize)
const planInfosRoutes = require("./routes/planinfos.routes");
app.use("/api/planinfos", planInfosRoutes);


// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API 🚀' });
});

// -------------------- START SERVER -------------------- //
const startServer = async () => {
  const dbOk = await initDB({ retries: 5, delay: 2000 });
  if (!dbOk) {
    console.error('❌ Database initialization failed — exiting.');
    process.exit(1);smsstatuses.routes.js
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
