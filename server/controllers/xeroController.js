// controllers/xeroController.js
import { XeroClient } from 'xero-node';
import dotenv from 'dotenv';

dotenv.config();

export const xero = new XeroClient({
  clientId: process.env.XERO_CLIENT_ID,
  clientSecret: process.env.XERO_CLIENT_SECRET,
  redirectUris: [process.env.XERO_REDIRECT_URI],
  scopes: 'openid profile email accounting.transactions accounting.contacts'.split(' ')
});

let tokenSet = null;

export const authXero = async (req, res) => {
  const url = await xero.buildConsentUrl();
  res.redirect(url);
};

export const xeroCallback = async (req, res) => {
  tokenSet = await xero.apiCallback(req.url);
  await xero.updateTenants();
  res.redirect(process.env.XERO_FRONTEND_URL);
};

export const getXeroData = async (req, res) => {
  if (!tokenSet) return res.status(401).send('Not authenticated');
  const tenantId = xero.tenants[0].tenantId;
  const response = await xero.accountingApi.getInvoices(tenantId);
  res.json(response.body.invoices);
};
