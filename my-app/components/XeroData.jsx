import React, { useEffect, useState } from 'react';
import axios from 'axios';

const XeroData = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3300/data')
      .then(res => setInvoices(res.data))
      .catch(err => console.log('Error fetching data:', err));
  }, []);

  return (
    <div>
      {invoices.length > 0 ? (
        <ul>
          {invoices.map(invoice => (
            <li key={invoice.invoiceID}>
              {invoice.contact.name} - {invoice.total}
            </li>
          ))}
        </ul>
      ) : (
        <p>No invoices yet</p>
      )}
    </div>
  );
};

export default XeroData;
