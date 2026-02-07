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
    map.fitBounds(bounds, { padding: [120, 120], maxZoom: 14, animate: true });
  }, [field, map]);
  return null;
}

export default function FarmFieldsModal({ farmer, onClose }) {
  const [selectedField, setSelectedField] = useState(farmer.fields[0] || null);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 sm:px-6">
      
      <div className="bg-white w-full sm:max-w-[1200px] h-[70vh] sm:h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col sm:flex-row relative">

        {/* CLOSE MODAL BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-[1001] bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* MAP */}
        <div className="flex-1 h-64 sm:h-auto relative">
          <MapContainer
            center={[9.082, 8.6753]}
            zoom={11}
            className="h-full w-full"
          >
            <FocusBounds field={selectedField} />
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            <TileLayer url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />

            {farmer.fields.map((field) => (
              <Polygon
                key={field.id}
                positions={field.polygon}
                pathOptions={{
                  color: selectedField?.id === field.id ? "#ffffff" : healthColor[field.health],
                  fillColor: healthColor[field.health],
                  fillOpacity: selectedField?.id === field.id ? 0.6 : 0.45,
                  weight: selectedField?.id === field.id ? 4 : 2,
                }}
                eventHandlers={{ click: () => setSelectedField(field) }}
              />
            ))}
          </MapContainer>

          {/* Floating Field Info */}
          {selectedField && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl w-[90%] max-w-[280px] p-4 z-[1000]">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{selectedField.name}</h3>
                <button onClick={() => setSelectedField(null)} className="text-gray-400 hover:text-gray-700">
                  <X size={18} />
                </button>
              </div>
              <span
                className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs rounded-full font-medium"
                style={{ background: `${healthColor[selectedField.health]}22`, color: healthColor[selectedField.health] }}
              >
                <CircleDot size={12} /> {selectedField.health}
              </span>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Area</span><span>{selectedField.area}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Crop</span><span>{selectedField.crop}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Updated</span><span>{selectedField.updated}</span></div>
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
        <div className="w-full sm:w-[340px] px-3 sm:px-4 py-4 sm:py-5 overflow-y-auto border-t sm:border-t-0 sm:border-l border-gray-200 flex flex-col gap-4">
          
          {/* Selected Field Info */}
          {selectedField && (
            <>
              <h3 className="font-semibold">{selectedField.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-medium" style={{ background: `${healthColor[selectedField.health]}22`, color: healthColor[selectedField.health] }}>
                  <CircleDot size={12} /> {selectedField.health}
                </span>
                <span className="text-gray-500 text-xs">{selectedField.area}</span>
                <span className="text-gray-500 text-xs">{selectedField.crop}</span>
                <span className="text-gray-500 text-xs">Updated {selectedField.updated}</span>
              </div>

              {/* Scanned Crops */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Scanned Crops</h4>
                {selectedField.scans && selectedField.scans.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedField.scans.map(scan => (
                      <div key={scan.id} className="min-w-[120px] border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                        <img src={scan.image} alt={scan.result} className="w-full h-24 object-cover" />
                        <div className="p-2 text-xs">
                          <p className="font-medium">{scan.result}</p>
                          <p>Confidence: {scan.confidence}</p>
                          <p>Date: {scan.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No scanned crops available for this field.</p>
                )}
              </div>
            </>
          )}

          {/* Other Fields */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Other Fields</h4>
            <div className="space-y-2">
              {farmer.fields.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedField(f)}
                  className={`w-full text-left border rounded-lg px-3 py-2 flex justify-between items-center transition-all duration-200
                    ${selectedField?.id === f.id 
                      ? "bg-blue-50 border-blue-600 shadow" 
                      : "border-gray-300 hover:bg-gray-50 hover:shadow-sm"}
                  `}
                >
                  <span className="font-medium">{f.name}</span>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-medium"
                    style={{ background: `${healthColor[f.health]}22`, color: healthColor[f.health] }}
                  >
                    <CircleDot size={12} /> {f.health}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
