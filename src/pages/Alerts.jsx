import { useState } from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle, Clock, TrendingDown } from 'lucide-react';

const mockAlerts = [
  {
    id: 'AL-1001',
    farmerName: 'John Doe',
    message: 'Significant drop in crop score',
    type: 'critical',
    isResolved: false,
    timestamp: '2025-12-12T09:00:00',
    previousScore: 750,
    currentScore: 720,
    scoreChange: -30,
  },
  {
    id: 'AL-1002',
    farmerName: 'Jane Smith',
    message: 'Moderate drop in crop score',
    type: 'warning',
    isResolved: false,
    timestamp: '2025-12-11T14:00:00',
    previousScore: 690,
    currentScore: 680,
    scoreChange: -10,
  },
  {
    id: 'AL-1003',
    farmerName: 'Aliyu Musa',
    message: 'All crops healthy',
    type: 'info',
    isResolved: true,
    timestamp: '2025-12-10T12:00:00',
  },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('all');
  const [showResolved, setShowResolved] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.type === filter;
    const matchesResolved = showResolved || !alert.isResolved;
    return matchesFilter && matchesResolved;
  });

  const handleResolve = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isResolved: true } : a));
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertCircle className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case 'critical': return 'border border-red-300 bg-red-50';
      case 'warning': return 'border border-yellow-300 bg-yellow-50';
      default: return 'border border-blue-300 bg-blue-50';
    }
  };

  const getIconStyles = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-600';
      case 'warning': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} minutes ago`;
    }
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString();
  };

  const unresolvedCount = alerts.filter(a => !a.isResolved).length;
  const criticalCount = alerts.filter(a => a.type === 'critical' && !a.isResolved).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Risk Alerts</h1>
          <p className="text-gray-500 mt-1">Monitor and respond to farmer risk notifications</p>
        </div>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <div className="text-right">
            <p className="text-2xl font-bold">{unresolvedCount}</p>
            <p className="text-sm text-gray-500">Unresolved</p>
          </div>
          {criticalCount > 0 && (
            <div className="text-right">
              <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              <p className="text-sm text-gray-500">Critical</p>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Dropdown */}
        <div className="relative w-48">
          <button
            className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {filter === 'all' ? 'All Alerts' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow z-10">
              {['all','critical','warning','info'].map(type => (
                <div
                  key={type}
                  className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${filter===type ? 'bg-green-100 font-semibold text-green-700' : ''}`}
                  onClick={() => { setFilter(type); setDropdownOpen(false); }}
                >
                  {type === 'all' ? 'All Alerts' : type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Show Resolved Button */}
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${showResolved ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          onClick={() => setShowResolved(!showResolved)}
        >
          <CheckCircle className="w-4 h-4" />
          {showResolved ? 'Hide Resolved' : 'Show Resolved'}
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4 mt-4">
        {filteredAlerts.map((alert, idx) => (
          <div
            key={alert.id}
            className={`flex gap-4 p-5 rounded-xl border transition-opacity duration-300 ${getAlertStyles(alert.type)} ${alert.isResolved ? 'opacity-60' : 'opacity-100'}`}
            style={{ animationDelay: `${idx*50}ms` }}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconStyles(alert.type)}`}>
              {getAlertIcon(alert.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${alert.type==='critical'?'bg-red-200 text-red-600': alert.type==='warning'?'bg-yellow-200 text-yellow-600':'bg-blue-200 text-blue-600'}`}>
                      {alert.type.toUpperCase()}
                    </span>
                    {alert.isResolved && (
                      <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Resolved
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold">{alert.farmerName}</h3>
                  <p className="text-sm text-gray-500 mt-1">{alert.message}</p>

                  {alert.scoreChange && (
                    <div className="flex items-center gap-2 mt-3 text-sm">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                      <span className="text-red-600 font-medium">Score dropped {Math.abs(alert.scoreChange)} points</span>
                      <span className="text-gray-500">({alert.previousScore} → {alert.currentScore})</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {formatTimestamp(alert.timestamp)}
                  </div>
                  {!alert.isResolved && (
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-sm border rounded-lg border-gray-300 hover:bg-gray-50"
                      onClick={() => handleResolve(alert.id)}
                    >
                      <CheckCircle className="w-4 h-4" /> Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-4" />
          <p className="text-lg font-medium">All caught up!</p>
          <p className="text-gray-500">No alerts match your current filters.</p>
        </div>
      )}
    </div>
  );
}
