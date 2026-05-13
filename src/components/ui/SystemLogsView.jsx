import React from 'react';

const systemLogs = [
  { id: 1, level: 'INFO', message: 'Database connection established', source: 'PostgreSQL', time: '10:45:01' },
  { id: 2, level: 'WARN', message: 'High memory usage detected (85%)', source: 'Worker-01', time: '10:42:15' },
  { id: 3, level: 'ERROR', message: 'Failed to push notification to socket', source: 'Gateway', time: '10:30:00' },
];

export default function SystemLogsView({ searchQuery = '' }) {
  const filteredLogs = systemLogs.filter(log => 
    log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelColor = (level) => {
    switch(level) {
      case 'ERROR': return 'text-red-400';
      case 'WARN': return 'text-amber-400';
      default: return 'text-emerald-400';
    }
  };

  return (
    <div className="p-6 space-y-3 bg-slate-900 min-h-[300px] font-mono text-xs">
      {filteredLogs.map((log) => (
        <div key={log.id} className="flex gap-4 border-l-2 border-slate-700 pl-4 py-1">
          <span className="text-slate-500">[{log.time}]</span>
          <span className={getLevelColor(log.level)}>
            {log.level}
          </span>
          <span className="text-slate-300 font-bold">[{log.source}]</span>
          <span className="text-slate-400">{log.message}</span>
        </div>
      ))}
      {filteredLogs.length === 0 && (
        <div className="text-center text-slate-500 py-12">
          No logs found matching your search
        </div>
      )}
    </div>
  );
}