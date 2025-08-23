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

//done by numan

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

//done by amaan

const radacctRoutes = require('./routes/radacct.routes');
app.use('/api/radacct', radacctRoutes);

const radacctarchivesRoutes = require('./routes/radacctarchives.routes');
app.use('/api/radacctarchives', radacctarchivesRoutes);

const zoneledgersRoutes = require('./routes/zoneledgers.routes');
app.use('/api/zoneledgers', zoneledgersRoutes);

const invoiceitemsRoutes = require('./routes/invoiceitems.routes');
app.use('/api/invoiceitems', invoiceitemsRoutes);

const invoicesRoutes = require('./routes/invoices.routes');
app.use('/api/invoices', invoicesRoutes);

const kycsRoutes = require('./routes/kycs.routes');
app.use('/api/kycs', kycsRoutes);

const ledgertypesRoutes = require('./routes/ledgertypes.routes');
app.use('/api/ledgertypes', ledgertypesRoutes);

const migrationsRoutes = require('./routes/migrations.routes');
app.use('/api/migrations', migrationsRoutes);

const nasarchivesRoutes = require('./routes/nasarchives.routes');
app.use('/api/nasarchives', nasarchivesRoutes);

const operatorlogsRoutes = require('./routes/operatorlogs.routes');
app.use('/api/operatorlogs', operatorlogsRoutes);

const personalAccessTokensRoutes = require('./routes/personal_access_tokens.routes');
app.use('/api/personal_access_tokens', personalAccessTokensRoutes);

const plansRoutes = require('./routes/plans.routes');
app.use('/api/plans', plansRoutes);

const radreplyRoutes = require('./routes/radreply.routes');
app.use('/api/radreply', radreplyRoutes);

const receiptsRoutes = require('./routes/receipts.routes');
app.use('/api/receipts', receiptsRoutes);

const rechargesRoutes = require('./routes/recharges.routes');
app.use('/api/recharges', rechargesRoutes);

const slasRoutes = require('./routes/slas.routes');
app.use('/api/slas', slasRoutes);

const slastatusesRoutes = require('./routes/slastatuses.routes');
app.use('/api/slastatuses', slastatusesRoutes);

const permissiontemplatesRoutes = require('./routes/permissiontemplates.routes');
app.use('/api/permissiontemplates', permissiontemplatesRoutes);





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
