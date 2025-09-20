import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export const formatCurrency = (value) => {
  if (typeof value !== 'number') value = Number(value) || 0;
  return value.toLocaleString(undefined, { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
}

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,8);

export const exportSalesCSV = (sales) => {
  if (!sales || sales.length === 0) return;
  const rows = sales.map(s => ({
    id: s.id,
    date: s.date,
    total: s.total,
    items: s.items.map(i => `${i.name} (${i.qty})`).join('; ')
  }));
  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `sales_${new Date().toISOString().slice(0,10)}.csv`);
};
