require('dotenv').config();
const express = require('express');
const { initDB } = require('./loaders/sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// -------------------- ROUTES -------------------- //

const usersRoutes = require('./routes/users.routes');
app.use('/api/users', usersRoutes);

const userInfosRoutes = require('./routes/userInfos.routes');
app.use('/api/userInfos', userInfosRoutes);

const radcheckRoutes = require('./routes/radcheck.routes');
app.use('/api/radcheck', radcheckRoutes);

// ✅ Client File Permissions (Sequelize)
const clientFilePermissionsRoutes = require('./routes/clientfilepermissions.routes');
app.use('/api/clientfilepermissions', clientFilePermissionsRoutes);


//done by muskan
// ✅ Userpgs (Sequelize)
const userpgsRoutes = require('./routes/userpgs.routes');
app.use('/api/userpgs', userpgsRoutes);

// ✅ vouchers (Sequelize)
const voucherRoutes = require("./routes/vouchers.routes"); 
app.use("/api/vouchers", voucherRoutes);

// ✅ walletledgers (Sequelize)
const walletledgersRoutes = require("./routes/walletledgers.routes");
app.use("/api/walletledgers", walletledgersRoutes);

// ✅ documents (Sequelize)
const documentsRoutes = require("./routes/documents.routes");
app.use("/api/documents", documentsRoutes);

// ✅ notifytypes (Sequelize)
const notifytypesRoutes = require("./routes/notifytypes.routes");
app.use("/api/notifytypes", notifytypesRoutes);

// ✅ operators (Sequelize)
const operatorsRoutes = require("./routes/operators.routes");
app.use("/api/operators", operatorsRoutes);

// ✅ oltpons (Sequelize)
const oltponsRoutes = require("./routes/oltpons.routes");
app.use("/api/oltpons", oltponsRoutes);

// ✅ olts (Sequelize)
const oltsRoutes = require("./routes/olts.routes");
app.use("/api/olts", oltsRoutes);

// ✅ onumacs (Sequelize)
const onumacsRoutes = require("./routes/onumacs.routes");
app.use("/api/onumacs", onumacsRoutes);

// ✅ operatorpgs (Sequelize)
const operatorpgsRoutes = require("./routes/operatorpgs.routes");
app.use("/api/operatorpgs", operatorpgsRoutes);

// ✅ otps (Sequelize)
const otpsRoutes = require("./routes/otps.routes");
app.use("/api/otps", otpsRoutes);

// ✅ otts (Sequelize)
const ottsRoutes = require("./routes/otts.routes");
app.use("/api/otts", ottsRoutes);








// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
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
  console.error('Failed to start server:', err);
  process.exit(1);
});
