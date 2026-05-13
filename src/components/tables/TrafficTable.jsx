import React from 'react';

const trafficData = [
  { id: 1, method: 'GET', path: '/api/v1/user/profile', status: 200, latency: '45ms', time: 'Just now' },
  { id: 2, method: 'POST', path: '/api/v1/auth/login', status: 201, latency: '128ms', time: '2 mins ago' },
  { id: 3, method: 'GET', path: '/api/v1/inventory', status: 404, latency: '12ms', time: '5 mins ago' },
  { id: 4, method: 'PATCH', path: '/api/v1/settings', status: 200, latency: '88ms', time: '12 mins ago' },
  { id: 5, method: 'GET', path: '/api/v1/analytics', status: 500, latency: '1.2s', time: '15 mins ago' },
];

export default function TrafficTable({ searchQuery = '' }) {
  const filteredData = trafficData.filter(item => 
    item.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMethodColor = (method) => {
    switch(method) {
      case 'GET': return 'bg-blue-100 text-blue-700';
      case 'POST': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <table className="w-full text-left">
      <thead>
        <tr className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
          <th className="px-6 py-4 font-bold">Method</th>
          <th className="px-6 py-4 font-bold">Endpoint</th>
          <th className="px-6 py-4 font-bold">Status</th>
          <th className="px-6 py-4 font-bold">Latency</th>
          <th className="px-6 py-4 font-bold text-right">Time</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {filteredData.map((item) => (
          <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
            <td className="px-6 py-4">
              <span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-tighter ${getMethodColor(item.method)}`}>
                {item.method}
              </span>
            </td>
            <td className="px-6 py-4 text-sm font-mono text-slate-600 group-hover:text-teal-600 transition-colors">
              {item.path}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${item.status >= 400 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                <span className="text-sm font-bold text-slate-700">{item.status}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">{item.latency}</td>
            <td className="px-6 py-4 text-sm text-slate-400 text-right">{item.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}