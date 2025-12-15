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
        <div className="border border-gray-300 rounded-xl shadow-sm p-6 space-y-6 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-green-700" />
            <h2 className="font-semibold text-lg text-gray-800">Risk Thresholds</h2>
          </div>

          {[
            { key: 'autoApproveThreshold', label: 'Auto-Approve Threshold', color: 'green', min: 600, max: 800, desc: 'Loans with CropCura Scores at or above this threshold will be recommended for automatic approval.' },
            { key: 'reviewThreshold', label: 'Review Required Threshold', color: 'yellow', min: 400, max: 699, desc: 'Loans in this range require manual review by a loan officer.' },
            { key: 'autoDeclineThreshold', label: 'Auto-Decline Threshold', color: 'red', min: 300, max: 599, desc: 'Loans with scores below this threshold will be flagged for likely decline.' },
          ].map(({ key, label, color, min, max, desc }) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{label}</span>
                <span className={`text-sm font-medium bg-${color}-100 text-${color}-700 px-2 py-1 rounded`}>
                  {key === 'autoApproveThreshold' ? `≥ ${settings[key]}` : key === 'autoDeclineThreshold' ? `< ${settings[key]}` : `${settings.reviewThreshold} - ${settings.autoApproveThreshold-1}`}
                </span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={10}
                value={settings[key]}
                onChange={e => handleThresholdChange(key, Number(e.target.value))}
                className={`w-full accent-${color}-500`}
              />
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}

          {/* Visual Score Scale */}
 <div className="mt-6 p-4 bg-gray-100 rounded-lg">
  <div className="flex items-center gap-2 mb-2">
    <Gauge className="w-5 h-5 text-gray-500" />
    <span className="font-medium text-gray-700">Score Decision Scale</span>
  </div>

  {/* Colored Bar with Labels */}
  <div className="relative h-6 rounded-full overflow-hidden mb-6">
    {/* Segments */}
    <div className="absolute inset-0 flex h-full">
      <div
        className="bg-red-500/70 h-full"
        style={{ width: `${((settings.autoDeclineThreshold - 250) / 600) * 100}%` }}
      />
      <div
        className="bg-yellow-500/70 h-full"
        style={{ width: `${((settings.reviewThreshold - settings.autoDeclineThreshold) / 600) * 100}%` }}
      />
      <div
        className="bg-yellow-300/40 h-full"
        style={{ width: `${((settings.autoApproveThreshold - settings.reviewThreshold) / 600) * 100}%` }}
      />
      <div className="bg-green-500/70 h-full flex-1" />
    </div>

    {/* Labels aligned to segments */}
    <div className="absolute inset-0 pointer-events-none">
      {/* Decline label - center of red segment */}
      <span
        className="text-red-700 text-xs font-medium absolute top-1"
        style={{
          left: `${((settings.autoDeclineThreshold - 250) / 600) * 50}%`,
          transform: 'translateX(-50%)'
        }}
      >
        Decline
      </span>

      {/* Review label - center of yellow segment */}
      <span
        className="text-yellow-700 text-xs font-medium absolute top-1"
        style={{
          left: `${((settings.autoDeclineThreshold - 250) + (settings.reviewThreshold - settings.autoDeclineThreshold) / 2) / 600 * 100}%`,
          transform: 'translateX(-50%)'
        }}
      >
        Review
      </span>

      {/* Approve label - center of green segment */}
      <span
        className="text-green-700 text-xs font-medium absolute top-1"
        style={{
          left: `${((settings.autoApproveThreshold - 250 + (850 - settings.autoApproveThreshold)/2) / 600) * 100}%`,
          transform: 'translateX(-50%)'
        }}
      >
        Approve
      </span>
    </div>
  </div>

  {/* Numeric Scale */}
  <div className="flex justify-between text-xs text-gray-500">
    <span>250</span>
    <span>{settings.autoDeclineThreshold}</span>
    <span>{settings.reviewThreshold}</span>
    <span>{settings.autoApproveThreshold}</span>
    <span>850</span>
  </div>
</div>


        </div>

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


