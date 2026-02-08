import { useState } from 'react';
import { Search, Filter, Check, X, Eye, ChevronDown, Pencil, Download } from 'lucide-react';
import riceImg from "../assets/rice.jpg";
import maizeImg from "../assets/corn.jpg";
import maize2Img from "../assets/maize2.jpg";
import maize3Img from "../assets/maize3.jpg";


import cassavaImg from "../assets/cassava.jpg";

// Mock data

const cropImages = {
  rice: [riceImg],
  maize: [
    maizeImg,
    maize2Img,
    maize3Img,

  ],
  cassava: [cassavaImg],
};




const mockLoans = [
  { id: 'LN-1001', farmerName: 'Amara Okonkwo', loanAmount: 1000000, cropType: 'maize', cropCuraScore: 720, status: 'pending', location: 'Enugu',  latitude: 6.5244,
    longitude: 3.3792, farmSize: 3, purpose: 'Seed purchase', term: 12, interestRate: 5, applicationDate: '2026-01-01' },
];

export default function Applications() {
  const [loans, setLoans] = useState(mockLoans);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditingTermRate, setIsEditingTermRate] = useState(false);
  const [editTerm, setEditTerm] = useState("");
  const [editRate, setEditRate] = useState("");


  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      loan.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      loan.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (loanId) => {
    setLoans((prev) => prev.map((l) => (l.id === loanId ? { ...l, status: 'approved' } : l)));
    setSelectedLoan(null);
    alert(`Loan ${loanId} approved`);
  };

  const handleDecline = (loanId) => {
    setLoans((prev) => prev.map((l) => (l.id === loanId ? { ...l, status: 'declined' } : l)));
    setSelectedLoan(null);
    alert(`Loan ${loanId} declined`);
  };

  const getRecommendation = (score) => {
    if (score >= 700) return { text: 'Recommended for Approval', color: 'text-green-600' };
    if (score >= 650) return { text: 'Manual Review Required', color: 'text-yellow-500' };
    return { text: 'High Risk - Review Carefully', color: 'text-red-600' };
  };

  const handleSaveTermRate = () => {
  setLoans(prev =>
    prev.map(loan =>
      loan.id === selectedLoan.id
        ? { ...loan, term: Number(editTerm), interestRate: Number(editRate) }
        : loan
    )
  );

  setSelectedLoan(prev => ({
    ...prev,
    term: Number(editTerm),
    interestRate: Number(editRate),
  }));

  setIsEditingTermRate(false);
};


  const statusOptions = [
    { label: 'All Applications', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Declined', value: 'declined' },
    { label: 'Under Review', value: 'under_review' },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Loan Applications</h1>
        <p className="text-gray-500 mt-1">Review and manage farmer loan applications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Custom Dropdown */}
        <div className="relative w-full sm:w-64">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {statusOptions.find(opt => opt.value === statusFilter)?.label}
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-auto">
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setStatusFilter(option.value);
                    setDropdownOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer rounded-lg hover:bg-green-100 transition
                    ${statusFilter === option.value ? 'bg-green-100 font-semibold text-green-700' : 'text-gray-700'}
                  `}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-300 shadow-sm">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="px-6 py-3 text-left text-sm font-semibold">Farmer Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Loan Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Crop Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Credit Score</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No applications found
                </td>
              </tr>
            ) : (
              filteredLoans.map((loan) => (
                <tr
                  key={loan.id}
                  className="border-b border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedLoan(loan)}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium">{loan.farmerName}</p>
                    <p className="text-sm text-gray-500">{loan.id}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">₦{loan.loanAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 capitalize">{loan.cropType}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        loan.cropCuraScore >= 700 ? 'bg-green-600' : loan.cropCuraScore >= 650 ? 'bg-yellow-500' : 'bg-red-600'
                      }`}
                    >
                      {loan.cropCuraScore}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs capitalize ${
                        loan.status === 'approved' ? 'bg-green-600' : loan.status === 'pending' ? 'bg-yellow-500' : 'bg-red-600'
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
                    {loan.status === 'pending' && (
                      <>
                        <button
                          className="p-1 rounded-full text-green-600 hover:bg-green-100 transition"
                          onClick={() => handleApprove(loan.id)}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 rounded-full text-red-600 hover:bg-red-100 transition"
                          onClick={() => handleDecline(loan.id)}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition" onClick={() => setSelectedLoan(loan)}>
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
         <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 border border-gray-300 shadow-lg relative">

            {/* Close and Download Buttons */}
    <div className="absolute top-4 right-4 flex gap-2">
      <button
        className="text-gray-500 hover:text-gray-700"
        onClick={() => alert('Download PDF is coming soon')}
      >
        <Download className="w-5 h-5" /> 
      </button>
        <p className='text-gray-500'> Download Farm Profile</p>

      <button
        className="text-gray-500 hover:text-gray-700"
        onClick={() => setSelectedLoan(null)}
      >
        <X className="w-5 h-5" />
      </button>
    </div>

            <h2 className="text-xl font-bold">Loan Application Details</h2>
            <p className="text-gray-500">Summary of Farmer Profile {selectedLoan.id}</p>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Farmer Name</p>
                  <p className="font-medium">{selectedLoan.farmerName}</p>
                </div>
                <div>
  <p className="text-sm text-gray-500">Location</p>

  <p className="font-medium">{selectedLoan.location}</p>

  {(selectedLoan.latitude && selectedLoan.longitude) && (
    <p className="text-xs text-gray-500 mt-1">
      Lat: {selectedLoan.latitude}, Lng: {selectedLoan.longitude}
    </p>
  )}
</div>

                <div>
                  <p className="text-sm text-gray-500">Farm Size</p>
                  <p className="font-medium">{selectedLoan.farmSize} hectares</p>
                </div>
               <div>
  <p className="text-sm text-gray-500">Primary Crop</p>

  <p className="font-medium capitalize mb-2">
    {selectedLoan.cropType}
  </p>

<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
  {cropImages[selectedLoan.cropType]?.map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`${selectedLoan.cropType} scan ${index + 1}`}
      className="w-full h-24 sm:h-28 object-cover rounded-lg border hover:scale-105 transition"
      onError={(e) => {
        e.currentTarget.src = maizeImg;
      }}
    />
  ))}
</div>

</div>

              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Loan Amount</p>
                  <p className="text-2xl font-bold">₦{selectedLoan.loanAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purpose</p>
                  <p className="font-medium">{selectedLoan.purpose}</p>
                </div>
                <div>
  <div className="flex items-center justify-between">
    <p className="text-sm text-gray-500">Term & Rate</p>

    {!isEditingTermRate && (
      <button
        onClick={() => {
          setEditTerm(selectedLoan.term);
          setEditRate(selectedLoan.interestRate);
          setIsEditingTermRate(true);
        }}
        className="text-gray-400 hover:text-gray-600"
      >
        <Pencil className="w-4 h-4" />
      </button>
    )}
  </div>

  {!isEditingTermRate ? (
    <p className="font-medium">
      {selectedLoan.term} months at {selectedLoan.interestRate}%
    </p>
  ) : (
    <div className="space-y-2 mt-2">
      <div className="flex gap-2">
        <input
          type="number"
          value={editTerm}
          onChange={(e) => setEditTerm(e.target.value)}
          className="w-1/2 px-3 py-2 border rounded-lg text-sm"
          placeholder="Months"
        />
        <input
          type="number"
          value={editRate}
          onChange={(e) => setEditRate(e.target.value)}
          className="w-1/2 px-3 py-2 border rounded-lg text-sm"
          placeholder="% Rate"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSaveTermRate}
          className="flex items-center gap-1 text-green-600 text-sm font-medium"
        >
          <Check className="w-4 h-4" /> Save
        </button>

        <button
          onClick={() => setIsEditingTermRate(false)}
          className="flex items-center gap-1 text-gray-500 text-sm font-medium"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </div>
  )}
</div>

                <div>
                  <p className="text-sm text-gray-500">Application Date</p>
                  <p className="font-medium">{new Date(selectedLoan.applicationDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border border-gray-300">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold">Credit Score Assessment</p>
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    selectedLoan.cropCuraScore >= 700
                      ? 'bg-green-600'
                      : selectedLoan.cropCuraScore >= 650
                      ? 'bg-yellow-500'
                      : 'bg-red-600'
                  }`}
                >
                  {selectedLoan.cropCuraScore}
                </span>
              </div>
              <p className={`text-sm font-medium ${getRecommendation(selectedLoan.cropCuraScore).color}`}>
                {getRecommendation(selectedLoan.cropCuraScore).text}
              </p>
            </div>

            {selectedLoan.status === 'pending' && (
              <div className="flex gap-3 pt-4 border-t border-gray-300">
                <button
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition"
                  onClick={() => handleApprove(selectedLoan.id)}
                >
                  <Check className="w-4 h-4" /> Approve Loan
                </button>
                <button
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 transition"
                  onClick={() => handleDecline(selectedLoan.id)}
                >
                  <X className="w-4 h-4" /> Decline Loan
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
