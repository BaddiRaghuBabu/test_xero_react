import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { XeroClient } from 'xero-node';

dotenv.config();
const app = express();
app.use(cors());

const xero = new XeroClient({
  clientId: process.env.XERO_CLIENT_ID,
  clientSecret: process.env.XERO_CLIENT_SECRET,
  redirectUris: [process.env.XERO_REDIRECT_URI],
  scopes: 'openid profile email accounting.transactions accounting.contacts'.split(' ')
});

let tokenSet = null;

app.get('/auth', async (req, res) => {
  const url = await xero.buildConsentUrl();
  res.redirect(url);
});

app.get('/callback', async (req, res) => {
  tokenSet = await xero.apiCallback(req.url);
  await xero.updateTenants();
  res.redirect(process.env.XERO_FRONTEND_URL);
});

app.get('/data', async (req, res) => {
  if (!tokenSet) return res.status(401).send('Not authenticated');

  const tenantId = xero.tenants[0].tenantId;
  const response = await xero.accountingApi.getInvoices(tenantId);
  res.json(response.body.invoices);
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Backend running at http://localhost:${process.env.PORT}`);
});
