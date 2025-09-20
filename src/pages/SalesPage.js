import React from 'react';
import { useSales } from '../context/SalesContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { exportSalesCSV } from '../utils';
import { format } from 'date-fns';
import { formatCurrency } from '../utils';

export default function SalesPage(){
  const { sales } = useSales();

  const daily = sales.reduce((acc, s) => {
    const day = format(new Date(s.date), 'yyyy-MM-dd');
    acc[day] = (acc[day] || 0) + (s.total || 0);
    return acc;
  }, {});
  const data = Object.entries(daily).map(([day, total]) => ({ day, total }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Sales Records</h2>
        <div className="flex gap-2">
          <button onClick={() => exportSalesCSV(sales)} className="w-full px-4 py-3 rounded-lg bg-accent text-white font-medium">Export CSV</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded p-4 card-shadow">
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded p-4 card-shadow">
          <div className="text-sm text-gray-600">Recent Sales</div>
          <div className="mt-3 space-y-3">
            {sales.map(s => (
              <div key={s.id} className="p-2 rounded border">
                <div className="flex justify-between">
                  <div className="font-medium">{format(new Date(s.date), 'PPP p')}</div>
                  <div className="font-semibold">{formatCurrency(s.total)}</div>
                </div>
                <div className="text-sm text-gray-500">{s.items.length} items</div>
              </div>
            ))}
            {sales.length === 0 && <div className="text-gray-500">No sales yet</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
