import { useState, useRef, useEffect } from 'react';
import { Search, LayoutGrid, List, MapPin, Wheat, ChevronDown, Mail, Phone } from 'lucide-react';
import FarmFieldsModal from '../components/FarmFieldsModal';

export default function Farmers() {
  const farmers = [
    {
      id: "F001",
      name: "Amara Okonkwo",
      location: "Nigeria",
      cropType: "maize",
      farmSize: 37,
      mail: "farmer1@cropcura.demo",
      phone: "+2348122652108",
      cropCuraScore: "85%",
      riskLevel: "low",
      fieldsCount: 3,
      healthSummary: { healthy: 2, moderate: 1 },
      fields: [
        { id: "f1", name: "Main Maize Plot", crop: "Maize", area: "2.5 ha", health: "healthy", updated: "Jan 12, 2024", polygon: [
      [6.4475, 7.4980],
      [6.4475, 7.5040],
      [6.4525, 7.5040],
      [6.4525, 7.4980],
    ], },
        { id: "f2", name: "South Rice Field", crop: "Rice", area: "1.8 ha", health: "moderate", updated: "Jan 10, 2024", polygon: [[6.4410, 7.4920],
      [6.4410, 7.4975],
      [6.4460, 7.4975],
      [6.4460, 7.4920],] },
        { id: "f3", name: "Eastern Cassava Farm", crop: "Cassava", area: "6.2 ha", health: "healthy", updated: "Jan 15, 2024", polygon: [[6.4540, 7.5060],
      [6.4540, 7.5120],
      [6.4590, 7.5120],
      [6.4590, 7.5060],] },
      ],
    },
    {
      id: "F002",
      name: "Kachi Marizu",
      location: "Nigeria",
      cropType: "rice",
      farmSize: 24,
      mail: "farmer1@cropcura.demo",
      phone: "+2348033217349",
      cropCuraScore: "78%",
      riskLevel: "medium",
      fieldsCount: 2,
      healthSummary: { healthy: 1, moderate: 1 },
      fields: [
        { id: "f1", name: "North Field", crop: "Rice", area: "2 ha", health: "healthy", updated: "Jan 11, 2024", polygon: [[-0.091, 34.768], [-0.091, 34.772], [-0.087, 34.772], [-0.087, 34.768]] },
        { id: "f2", name: "South Field", crop: "Rice", area: "1.5 ha", health: "moderate", updated: "Jan 12, 2024", polygon: [[-0.092, 34.765], [-0.092, 34.768], [-0.088, 34.768], [-0.088, 34.765]] },
      ],
    },
  ];

  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cropIcons = { maize: '🌽', rice: '🌾', cassava: '🥔', wheat: '🌿', soybeans: '🫘' };
  const riskColors = { low: 'bg-green-100 text-green-700', medium: 'bg-yellow-100 text-yellow-800', high: 'bg-red-100 text-red-700' };
  const riskOptions = [
    { label: 'All Risk Levels', value: 'all' },
    { label: 'Low Risk', value: 'low' },
    { label: 'Medium Risk', value: 'medium' },
    { label: 'High Risk', value: 'high' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch =
      farmer.name.toLowerCase().includes(search.toLowerCase()) ||
      farmer.location.toLowerCase().includes(search.toLowerCase()) ||
      farmer.id.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === 'all' || farmer.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const handleFarmerClick = (farmer) => {
    setSelectedFarmer(farmer);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Farm Directory</h1>
        <p className="text-gray-500 mt-1">Browse and search registered farmers. Click a name to view their fields.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full">
        {/* Search Input */}
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, location, or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-300 bg-white text-gray-800"
          />
        </div>

        {/* Risk Dropdown */}
        <div className="relative w-full sm:w-48" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-black w-full sm:w-auto focus:ring-2 focus:ring-blue-300"
          >
            {riskOptions.find(opt => opt.value === riskFilter)?.label}
            <ChevronDown className="w-4 h-4 text-gray-600 ml-2" />
          </button>
          {dropdownOpen && (
            <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {riskOptions.map(option => (
                <li
                  key={option.value}
                  onClick={() => { setRiskFilter(option.value); setDropdownOpen(false); }}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 flex justify-between items-center ${option.value !== 'all' ? riskColors[option.value] : ''}`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-1 w-full sm:w-auto justify-center">
          <button className={`px-3 py-1 ${viewMode === 'grid' ? 'bg-gray-300 rounded' : ''}`} onClick={() => setViewMode('grid')}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button className={`px-3 py-1 ${viewMode === 'list' ? 'bg-gray-300 rounded' : ''}`} onClick={() => setViewMode('list')}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500">Showing {filteredFarmers.length} of {farmers.length} farmers</p>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredFarmers.map(farmer => (
            <div
              key={farmer.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition cursor-pointer"
              onClick={() => handleFarmerClick(farmer)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-gray-800 text-lg hover:text-blue-600">{farmer.name}</h2>
                  <p className="text-sm text-gray-500">{farmer.id}</p>
                </div>
                <span className="text-2xl">{cropIcons[farmer.cropType]}</span>
              </div>
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{farmer.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wheat className="w-4 h-4 text-gray-400" />
                  <span className="capitalize">{farmer.cropType} • {farmer.farmSize} ha</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{farmer.mail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{farmer.phone}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="font-medium text-gray-700">{farmer.cropCuraScore}</span>
                <span className={`px-2 py-1 text-xs rounded-full font-semibold ${riskColors[farmer.riskLevel]}`}>
                  {farmer.riskLevel}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-sm">
          <table className="w-full min-w-[600px] text-left bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Farmer</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Crop</th>
                <th className="px-4 py-2">Farm Size</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Risk</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map(farmer => (
                <tr key={farmer.id} className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => handleFarmerClick(farmer)}>
                  <td className="px-4 py-2">
                    <h3 className="font-medium text-gray-800">{farmer.name}</h3>
                    <p className="text-sm text-gray-500">{farmer.id}</p>
                  </td>
                  <td className="px-4 py-2">{farmer.location}</td>
                  <td className="px-4 py-2 capitalize">{farmer.cropType}</td>
                  <td className="px-4 py-2">{farmer.farmSize} ha</td>
                  <td className="px-4 py-2">{farmer.cropCuraScore}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${riskColors[farmer.riskLevel]}`}>
                      {farmer.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredFarmers.length === 0 && (
        <div className="text-center py-12 text-gray-500">No farmers found matching your criteria</div>
      )}

      {isModalOpen && selectedFarmer && (
        <FarmFieldsModal farmer={selectedFarmer} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
