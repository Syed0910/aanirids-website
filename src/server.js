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

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// -------------------- START SERVER -------------------- //
const startServer = async () => {
  const dbOk = await initDB({ retries: 5, delay: 2000 });
  if (!dbOk) {
    console.error('Database initialization failed — exiting.');
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
