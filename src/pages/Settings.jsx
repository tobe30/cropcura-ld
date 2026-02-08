import { useState } from 'react';
import { RefreshCcw, Shield, Bell, Gauge } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    autoApproveThreshold: 750,
    reviewThreshold: 650,
    autoDeclineThreshold: 400,
    notifications: {
      emailAlerts: true,
      criticalOnly: false,
      dailyDigest: true,
    },
  });

  const handleThresholdChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }));
  };

  const handleReset = () => {
    setSettings({
      autoApproveThreshold: 750,
      reviewThreshold: 650,
      autoDeclineThreshold: 400,
      notifications: {
        emailAlerts: true,
        criticalOnly: false,
        dailyDigest: true,
      },
    });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-gray-50 animate-fade-in">
      <div className="p-6 space-y-6 min-h-full">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 mt-1">Configure risk thresholds and notification preferences</p>
        </div>

        {/* Risk Thresholds */}


        {/* Notification Preferences */}
        <div className="border border-gray-300 rounded-xl shadow-sm p-6 space-y-4 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg text-gray-800">Notification Preferences</h2>
          </div>

          {['emailAlerts', 'criticalOnly', 'dailyDigest'].map((key) => {
            const labels = {
              emailAlerts: 'Email Alerts',
              criticalOnly: 'Critical Only',
              dailyDigest: 'Daily Digest'
            };
            const descriptions = {
              emailAlerts: 'Receive alerts via email',
              criticalOnly: 'Only receive critical risk alerts',
              dailyDigest: 'Receive a daily summary of portfolio activity'
            };
            return (
              <div key={key} className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="font-medium text-gray-700">{labels[key]}</span>
                  <p className="text-sm text-gray-500">{descriptions[key]}</p>
                </div>
                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications[key]}
                    onChange={e => handleNotificationChange(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-700 transition-all duration-300"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md peer-checked:translate-x-5 transition-all duration-300"></div>
                </label>
              </div>
            )
          })}
        </div>

        {/* Demo Controls */}
        <div className="border border-gray-300 rounded-xl shadow-sm p-6 flex flex-col gap-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCcw className="w-5 h-5 text-gray-500" />
            <h2 className="font-semibold text-lg text-gray-800">Demo Controls</h2>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <RefreshCcw className="w-4 h-4" /> Reset Demo Data
          </button>
          <p className="text-sm text-gray-500">
            This will reset all loan statuses, alerts, and settings to their default values.
          </p>
        </div>
      </div>
    </div>
  );
}


