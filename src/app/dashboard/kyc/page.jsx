"use client";

import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  Hash, 
  FileText, 
  MapPin, 
  Home, 
  Briefcase,
  X,
  Plus,
  Eye,
  CheckCircle,
  AlertCircle,
  Upload,
  CreditCard,
  Shield,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit
} from 'lucide-react';

// Initial mock data - Multiple Users
const initialUsersData = [
  {
    id: 1,
    userId: "7bff48a8-6d3a-4f4f-8f5b-09ce60fa5298",
    registrationNumber: "AZZKYC001",
    fullName: "Arbaz Khan",
    dob: "2005-10-23",
    gender: "MALE",
    email: "arbaz@gmail.com",
    phoneNumber: "9876543210",
    companyName: "Azzunique Pvt Ltd",
    businessType: "PVT_LTD",
    kycType: "MANUAL",
    kycStatus: "VERIFIED",
    remarks: "Merchant onboarding",
    metadata: { source: "admin-panel" },
    addresses: [
      {
        type: "HOME",
        address: "Jaipur Rajasthan",
        pinCode: "302001",
        state: "Rajasthan",
        city: "Jaipur",
        landmark: "Near Railway Station",
      },
      {
        type: "BUSINESS",
        address: "Azzunique Office Jaipur",
        pinCode: "302012",
        state: "Rajasthan",
        city: "Jaipur",
        landmark: "Mansarovar",
      },
    ],
    documents: [
      { type: "OWNER_PAN", fileUrl: "https://cdn.com/pan.pdf", documentNumber: "ABCDE1234F" },
      { type: "AADHAAR", fileUrl: "https://cdn.com/aadhaar.pdf", documentNumber: "XXXXXXXXXXXX" },
      { type: "GST", fileUrl: "https://cdn.com/gst.pdf", documentNumber: "08ABCDE1234F1Z5" },
      { type: "OWNER_PHOTO", fileUrl: "https://cdn.com/photo.jpg" },
      { type: "BUSINESS_PHOTO", fileUrl: "https://cdn.com/shop.jpg" },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    userId: "8cff58b9-7e4b-5g5g-9t6c-10df71gb6399",
    registrationNumber: "AZZKYC002",
    fullName: "Priya Sharma",
    dob: "1990-05-15",
    gender: "FEMALE",
    email: "priya@gmail.com",
    phoneNumber: "9876543211",
    companyName: "Sharma Enterprises",
    businessType: "PARTNERSHIP",
    kycType: "DIGITAL",
    kycStatus: "PENDING",
    remarks: "Document verification pending",
    metadata: { source: "online-portal" },
    addresses: [
      {
        type: "HOME",
        address: "Civil Lines",
        pinCode: "302002",
        state: "Rajasthan",
        city: "Jaipur",
        landmark: "Near Police Station",
      },
      {
        type: "BUSINESS",
        address: "Corporate Park",
        pinCode: "302015",
        state: "Rajasthan",
        city: "Jaipur",
        landmark: "Sitapura",
      },
    ],
    documents: [
      { type: "OWNER_PAN", fileUrl: "https://cdn.com/pan2.pdf", documentNumber: "FGHIJ5678K" },
      { type: "AADHAAR", fileUrl: "https://cdn.com/aadhaar2.pdf", documentNumber: "YYYYYYYYYYYY" },
      { type: "GST", fileUrl: "https://cdn.com/gst2.pdf", documentNumber: "08FGHIJ5678K1Z9" },
    ],
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    userId: "9dgg69c0-8f5c-6h6h-0u7d-21eg72hc7400",
    registrationNumber: "AZZKYC003",
    fullName: "Rajesh Verma",
    dob: "1988-11-30",
    gender: "MALE",
    email: "rajesh@verma.com",
    phoneNumber: "9876543212",
    companyName: "Verma Traders",
    businessType: "PROPRIETORSHIP",
    kycType: "VIDEO",
    kycStatus: "REJECTED",
    remarks: "Invalid documents submitted",
    metadata: { source: "mobile-app" },
    addresses: [
      {
        type: "HOME",
        address: "Malviya Nagar",
        pinCode: "302017",
        state: "Rajasthan",
        city: "Jaipur",
        landmark: "Near Metro Station",
      },
    ],
    documents: [
      { type: "OWNER_PAN", fileUrl: "https://cdn.com/pan3.pdf", documentNumber: "KLMNO9012P" },
      { type: "AADHAAR", fileUrl: "https://cdn.com/aadhaar3.pdf", documentNumber: "ZZZZZZZZZZZZ" },
    ],
    createdAt: "2024-03-10",
  },
];

export default function KycPage() {
  const [usersData, setUsersData] = useState(initialUsersData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'detail'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    gender: 'MALE',
    businessType: 'PVT_LTD',
    kycType: 'MANUAL',
    remarks: '',
    homeAddress: {
      address: '',
      city: '',
      state: '',
      pinCode: '',
      landmark: ''
    },
    businessAddress: {
      address: '',
      city: '',
      state: '',
      pinCode: '',
      landmark: ''
    },
    documents: {
      ownerPan: { number: '', url: '' },
      aadhaar: { number: '', url: '' },
      gst: { number: '', url: '' },
      ownerPhoto: { url: '' },
      businessPhoto: { url: '' }
    }
  });

  // Filter users based on search and status
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || user.kycStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddressChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const handleDocumentChange = (docType, field, value) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: {
          ...prev.documents[docType],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newUser = {
      id: usersData.length + 1,
      userId: crypto.randomUUID(),
      registrationNumber: `KYC${String(usersData.length + 1).padStart(3, '0')}`,
      fullName: formData.fullName,
      dob: formData.dob,
      gender: formData.gender,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      companyName: formData.companyName,
      businessType: formData.businessType,
      kycType: formData.kycType,
      kycStatus: "PENDING",
      remarks: formData.remarks,
      metadata: { source: "user-form" },
      addresses: [
        {
          type: "HOME",
          address: formData.homeAddress.address,
          pinCode: formData.homeAddress.pinCode,
          state: formData.homeAddress.state,
          city: formData.homeAddress.city,
          landmark: formData.homeAddress.landmark,
        },
        ...(formData.businessAddress.address ? [{
          type: "BUSINESS",
          address: formData.businessAddress.address,
          pinCode: formData.businessAddress.pinCode,
          state: formData.businessAddress.state,
          city: formData.businessAddress.city,
          landmark: formData.businessAddress.landmark,
        }] : [])
      ],
      documents: [
        { type: "OWNER_PAN", fileUrl: formData.documents.ownerPan.url, documentNumber: formData.documents.ownerPan.number },
        { type: "AADHAAR", fileUrl: formData.documents.aadhaar.url, documentNumber: formData.documents.aadhaar.number },
        ...(formData.documents.gst.number ? [{ type: "GST", fileUrl: formData.documents.gst.url, documentNumber: formData.documents.gst.number }] : []),
        ...(formData.documents.ownerPhoto.url ? [{ type: "OWNER_PHOTO", fileUrl: formData.documents.ownerPhoto.url }] : []),
        ...(formData.documents.businessPhoto.url ? [{ type: "BUSINESS_PHOTO", fileUrl: formData.documents.businessPhoto.url }] : [])
      ],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsersData([...usersData, newUser]);
    setIsFormOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      dob: '',
      gender: 'MALE',
      businessType: 'PVT_LTD',
      kycType: 'MANUAL',
      remarks: '',
      homeAddress: {
        address: '',
        city: '',
        state: '',
        pinCode: '',
        landmark: ''
      },
      businessAddress: {
        address: '',
        city: '',
        state: '',
        pinCode: '',
        landmark: ''
      },
      documents: {
        ownerPan: { number: '', url: '' },
        aadhaar: { number: '', url: '' },
        gst: { number: '', url: '' },
        ownerPhoto: { url: '' },
        businessPhoto: { url: '' }
      }
    });
    setActiveTab('basic');
  };

  const deleteUser = (id) => {
    if (confirm('Are you sure you want to delete this KYC record?')) {
      setUsersData(usersData.filter(user => user.id !== id));
      if (selectedUser?.id === id) {
        setSelectedUser(null);
        setViewMode('table');
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      VERIFIED: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      REJECTED: 'bg-red-100 text-red-800',
      DRAFT: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getBusinessTypeLabel = (type) => {
    const types = {
      PVT_LTD: 'Private Limited',
      LLP: 'LLP',
      PARTNERSHIP: 'Partnership',
      PROPRIETORSHIP: 'Proprietorship'
    };
    return types[type] || type;
  };

  const getKycTypeColor = (type) => {
    const colors = {
      MANUAL: 'bg-orange-100 text-orange-800',
      DIGITAL: 'bg-green-100 text-green-800',
      VIDEO: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  // Stats
  const stats = {
    total: usersData.length,
    verified: usersData.filter(u => u.kycStatus === 'VERIFIED').length,
    pending: usersData.filter(u => u.kycStatus === 'PENDING').length,
    rejected: usersData.filter(u => u.kycStatus === 'REJECTED').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              KYC Management
            </h1>
            <p className="text-gray-500 mt-2">Manage merchant KYC applications</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Plus size={20} />
            Add New KYC
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Applications</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Verified KYC</p>
                <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Verification</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3">
                <AlertCircle className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="bg-red-100 rounded-lg p-3">
                <X className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, company, email or registration number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <Filter size={20} className="text-gray-400 mt-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">All Status</option>
                <option value="VERIFIED">Verified</option>
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">S.No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">User Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">KYC Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => {
                    setSelectedUser(user);
                    setViewMode('detail');
                  }}>
                    <td className="px-6 py-4 text-sm text-gray-600">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                          {user.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{user.fullName}</p>
                          <p className="text-xs text-gray-500">{user.registrationNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{user.companyName}</p>
                      <p className="text-xs text-gray-500">{getBusinessTypeLabel(user.businessType)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.phoneNumber}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getKycTypeColor(user.kycType)}`}>
                        {user.kycType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.kycStatus)}`}>
                        {user.kycStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.createdAt}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setViewMode('detail');
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} entries
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">{currentPage}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Detail Modal */}
        {viewMode === 'detail' && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                    {selectedUser.fullName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedUser.fullName}</h2>
                    <p className="text-blue-100 text-sm">{selectedUser.registrationNumber}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setViewMode('table');
                    setSelectedUser(null);
                  }}
                  className="text-white hover:bg-white/20 rounded-lg p-1 transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
                {/* Status Badge */}
                <div className="mb-6 flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedUser.kycStatus)}`}>
                    {selectedUser.kycStatus}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getKycTypeColor(selectedUser.kycType)}`}>
                    {selectedUser.kycType} KYC
                  </span>
                </div>

                {/* Basic Information */}
                <section className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="text-blue-600" size={24} />
                    <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-6">
                    <InfoField icon={<User size={16} />} label="Full Name" value={selectedUser.fullName} />
                    <InfoField icon={<Building2 size={16} />} label="Company Name" value={selectedUser.companyName} />
                    <InfoField icon={<Briefcase size={16} />} label="Business Type" value={getBusinessTypeLabel(selectedUser.businessType)} />
                    <InfoField icon={<Mail size={16} />} label="Email ID" value={selectedUser.email} />
                    <InfoField icon={<Phone size={16} />} label="Phone Number" value={selectedUser.phoneNumber} />
                    <InfoField icon={<Calendar size={16} />} label="Date of Birth" value={selectedUser.dob} />
                    <InfoField icon={<Users size={16} />} label="Gender" value={selectedUser.gender} />
                    <InfoField icon={<Hash size={16} />} label="Registration Number" value={selectedUser.registrationNumber} />
                    <InfoField icon={<Shield size={16} />} label="Source" value={selectedUser.metadata.source} />
                    <InfoField icon={<FileText size={16} />} label="Remarks" value={selectedUser.remarks} />
                  </div>
                </section>

                {/* Addresses */}
                <section className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="text-blue-600" size={24} />
                    <h2 className="text-xl font-semibold text-gray-800">Addresses</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedUser.addresses.map((addr, index) => (
                      <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          {addr.type === 'HOME' ? <Home size={20} className="text-blue-600" /> : <Briefcase size={20} className="text-purple-600" />}
                          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${addr.type === 'HOME' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                            {addr.type} ADDRESS
                          </span>
                        </div>
                        <p className="text-gray-800 font-medium">{addr.address}</p>
                        <p className="text-gray-600 text-sm mt-1">
                          {addr.city}, {addr.state} - {addr.pinCode}
                        </p>
                        {addr.landmark && (
                          <p className="text-gray-500 text-xs mt-2">Landmark: {addr.landmark}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Documents */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="text-blue-600" size={24} />
                    <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedUser.documents.map((doc, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">{doc.type.replace('_', ' ')}</span>
                          {doc.documentNumber && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>
                          )}
                        </div>
                        {doc.documentNumber && (
                          <p className="text-sm text-gray-600 mb-2">Number: {doc.documentNumber}</p>
                        )}
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1">
                          <Eye size={14} /> View Document
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* Add New KYC Modal - Same as before but simplified */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Add New KYC Application</h2>
                <button onClick={() => setIsFormOpen(false)} className="text-white hover:bg-white/20 rounded-lg p-1 transition">
                  <X size={24} />
                </button>
              </div>
              
              {/* Tabs */}
              <div className="border-b px-6">
                <div className="flex gap-4">
                  {['basic', 'addresses', 'documents'].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-4 font-medium transition-all relative ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                      {tab === 'basic' && 'Basic Information'}
                      {tab === 'addresses' && 'Addresses'}
                      {tab === 'documents' && 'Documents'}
                    </button>
                  ))}
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                <div className="p-6">
                  {/* Basic Information Tab - Same as before */}
                  {activeTab === 'basic' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label><input type="text" name="companyName" required value={formData.companyName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label><input type="tel" name="phoneNumber" required value={formData.phoneNumber} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label><input type="date" name="dob" required value={formData.dob} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Gender</label><select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg"><option value="MALE">Male</option><option value="FEMALE">Female</option><option value="OTHER">Other</option></select></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label><select name="businessType" value={formData.businessType} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg"><option value="PVT_LTD">Private Limited</option><option value="LLP">LLP</option><option value="PARTNERSHIP">Partnership</option><option value="PROPRIETORSHIP">Proprietorship</option></select></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">KYC Type</label><select name="kycType" value={formData.kycType} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg"><option value="MANUAL">Manual</option><option value="DIGITAL">Digital</option><option value="VIDEO">Video KYC</option></select></div>
                      <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label><textarea name="remarks" rows="2" value={formData.remarks} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg"></textarea></div>
                    </div>
                  )}

                  {/* Addresses Tab */}
                  {activeTab === 'addresses' && (
                    <div className="space-y-6">
                      <div><h3 className="text-lg font-semibold mb-3">Home Address</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2"><input type="text" placeholder="Address" value={formData.homeAddress.address} onChange={(e) => handleAddressChange('homeAddress', 'address', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                        <div><input type="text" placeholder="City" value={formData.homeAddress.city} onChange={(e) => handleAddressChange('homeAddress', 'city', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                        <div><input type="text" placeholder="State" value={formData.homeAddress.state} onChange={(e) => handleAddressChange('homeAddress', 'state', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                        <div><input type="text" placeholder="PIN Code" value={formData.homeAddress.pinCode} onChange={(e) => handleAddressChange('homeAddress', 'pinCode', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                        <div><input type="text" placeholder="Landmark" value={formData.homeAddress.landmark} onChange={(e) => handleAddressChange('homeAddress', 'landmark', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                      </div></div>
                      <div><h3 className="text-lg font-semibold mb-3">Business Address (Optional)</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2"><input type="text" placeholder="Address" value={formData.businessAddress.address} onChange={(e) => handleAddressChange('businessAddress', 'address', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                        <div><input type="text" placeholder="City" value={formData.businessAddress.city} onChange={(e) => handleAddressChange('businessAddress', 'city', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                        <div><input type="text" placeholder="State" value={formData.businessAddress.state} onChange={(e) => handleAddressChange('businessAddress', 'state', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                        <div><input type="text" placeholder="PIN Code" value={formData.businessAddress.pinCode} onChange={(e) => handleAddressChange('businessAddress', 'pinCode', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                        <div><input type="text" placeholder="Landmark" value={formData.businessAddress.landmark} onChange={(e) => handleAddressChange('businessAddress', 'landmark', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                      </div></div>
                    </div>
                  )}

                  {/* Documents Tab */}
                  {activeTab === 'documents' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label><input type="text" value={formData.documents.ownerPan.number} onChange={(e) => handleDocumentChange('ownerPan', 'number', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">PAN Document URL</label><input type="url" value={formData.documents.ownerPan.url} onChange={(e) => handleDocumentChange('ownerPan', 'url', e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label><input type="text" value={formData.documents.aadhaar.number} onChange={(e) => handleDocumentChange('aadhaar', 'number', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Document URL</label><input type="url" value={formData.documents.aadhaar.url} onChange={(e) => handleDocumentChange('aadhaar', 'url', e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label><input type="text" value={formData.documents.gst.number} onChange={(e) => handleDocumentChange('gst', 'number', e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">GST Document URL</label><input type="url" value={formData.documents.gst.url} onChange={(e) => handleDocumentChange('gst', 'url', e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Owner Photo URL</label><input type="url" value={formData.documents.ownerPhoto.url} onChange={(e) => handleDocumentChange('ownerPhoto', 'url', e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Business Photo URL</label><input type="url" value={formData.documents.businessPhoto.url} onChange={(e) => handleDocumentChange('businessPhoto', 'url', e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." /></div>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-between">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2 border rounded-lg">Cancel</button>
                  <div className="flex gap-3">
                    {activeTab !== 'basic' && <button type="button" onClick={() => setActiveTab(activeTab === 'addresses' ? 'basic' : 'addresses')} className="px-6 py-2 border rounded-lg">Previous</button>}
                    {activeTab !== 'documents' ? <button type="button" onClick={() => setActiveTab(activeTab === 'basic' ? 'addresses' : 'documents')} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Next</button> : <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg">Submit Application</button>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const InfoField = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <div className="text-blue-600 mt-0.5">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);