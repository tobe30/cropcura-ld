import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Wheat, X, CircleDot } from "lucide-react";

const healthColor = {
  healthy: "#22c55e",
  moderate: "#eab308",
  unhealthy: "#ef4444",
};

function FocusBounds({ field }) {
  const map = useMap();

  useEffect(() => {
    if (!field) return;
    const bounds = L.latLngBounds(field.polygon);
    map.fitBounds(bounds, {
      padding: [120, 120],
      maxZoom: 14,
      animate: true,
    });
  }, [field, map]);

  return null;
}

export default function FarmFieldsModal({ farmer, onClose }) {
  const [selectedField, setSelectedField] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white w-full sm:max-w-[1200px] h-[70vh] sm:h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="px-4 sm:px-6 py-4 border-b flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-semibold">
              {farmer.name}&apos;s Fields
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {farmer.location}
              </span>
              •
              <span className="flex items-center gap-1">
                <Wheat size={14} /> {farmer.crop}
              </span>
              • {farmer.totalArea} • {farmer.fieldsCount} fields
            </p>
            <p className="text-xs sm:text-sm mt-2 flex gap-3 flex-wrap">
              <span className="flex items-center gap-1 text-green-600 font-medium">
                <CircleDot size={14} /> {farmer.healthSummary.healthy} Healthy
              </span>
              <span className="flex items-center gap-1 text-yellow-600 font-medium">
                <CircleDot size={14} /> {farmer.healthSummary.moderate} Moderate
              </span>
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 ml-4">
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          
          {/* MAP */}
          <div className="relative flex-1 h-[300px] sm:h-auto">
            <MapContainer
              center={[-1.286, 36.8219]}
              zoom={11}
              className="h-full w-full"
            >
              <FocusBounds field={selectedField} />
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              <TileLayer url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />

              {farmer.fields.map((field) => {
                const isSelected = selectedField?.id === field.id;
                return (
                  <Polygon
                    key={field.id}
                    positions={field.polygon}
                    pathOptions={{
                      color: isSelected ? "#ffffff" : healthColor[field.health],
                      fillColor: healthColor[field.health],
                      fillOpacity: isSelected ? 0.6 : 0.45,
                      weight: isSelected ? 4 : 2,
                    }}
                    eventHandlers={{
                      click: (e) => {
                        e.target.bringToFront();
                        setSelectedField(field);
                      },
                    }}
                  />
                );
              })}
            </MapContainer>

            {/* Floating Field Info Card */}
            {selectedField && (
              <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl w-[90%] max-w-[280px] p-4 z-[1000]">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{selectedField.name}</h3>
                  <button
                    onClick={() => setSelectedField(null)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <X size={18} />
                  </button>
                </div>
                <span
                  className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs rounded-full font-medium"
                  style={{
                    background: `${healthColor[selectedField.health]}22`,
                    color: healthColor[selectedField.health],
                  }}
                >
                  <CircleDot size={12} /> {selectedField.health}
                </span>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Area</span><span>{selectedField.area}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Crop</span><span>{selectedField.crop}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Updated</span><span>{selectedField.updated}</span></div>
                </div>
                <div className="border-t mt-3 pt-2 text-xs flex gap-3 flex-wrap">
                  <span className="flex items-center gap-1 text-green-600"><CircleDot size={12} /> Healthy</span>
                  <span className="flex items-center gap-1 text-yellow-600"><CircleDot size={12} /> Moderate</span>
                  <span className="flex items-center gap-1 text-red-600"><CircleDot size={12} /> Unhealthy</span>
                </div>
              </div>
            )}

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-white rounded-lg shadow p-2 text-xs sm:text-sm z-[1000] w-[120px] sm:w-auto">
              <p className="font-semibold mb-1">Crop Health</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full" /> Healthy</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-500 rounded-full" /> Moderate</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-full" /> Unhealthy</div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full sm:w-[340px] px-3 sm:px-4 py-4 sm:py-5 overflow-y-auto border-t sm:border-t-0 sm:border-l border-gray-200">
            <h3 className="font-semibold mb-3">Fields ({farmer.fieldsCount})</h3>
            <div className="space-y-2">
              {farmer.fields.map((field) => (
                <div
                  key={field.id}
                  onClick={() => setSelectedField(field)}
                  className={`border border-gray-300 rounded-lg p-3 cursor-pointer ${
                    selectedField?.id === field.id
                      ? "border-blue-600 bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{field.name}</p>
                    <span
                      className="inline-flex items-center gap-1 px-2 text-xs rounded-full font-medium"
                      style={{
                        background: `${healthColor[field.health]}22`,
                        color: healthColor[field.health],
                      }}
                    >
                      <CircleDot size={12} /> {field.health}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{field.area} • {field.crop}</p>
                  <p className="text-xs text-gray-400 mt-1">Updated {field.updated}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
