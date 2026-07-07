import React, { useEffect } from 'react';

const UserProfileModal = ({ open, onClose, data }) => {
  // Background scroll freeze configuration
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  if (!open) return null;

  // Destructure direct data object
  const user = data || {};

  // Date formatter safety handler
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto theme-inline">
      {/* Backdrop Glass Overlay — using custom .glass or standard alpha blend */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Box Layout */}
      <div className="relative w-full max-w-3xl bg-card text-card-foreground rounded-lg-border shadow-md-border border border-border flex flex-col overflow-hidden max-h-[92vh] transition-all transform animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-muted/30">
          <div>
            <h3 className="text-xl font-bold text-foreground">Complete User Profile Information</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Comprehensive view of registry data, platform tokens, and services permissions</p>
          </div>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted p-2 rounded-border transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 space-y-6 overflow-y-auto bg-background">
          
          {/* Section 1: Top Identity Card */}
          <div className="bg-card p-5 rounded-border border border-border shadow-border flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt={user.fullName || "User Avatar"} 
                className="w-20 h-20 rounded-border object-cover border-2 border-success shadow-border bg-muted"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-20 h-20 bg-muted text-muted-foreground rounded-border flex items-center justify-center border border-border font-bold text-2xl shadow-inner flex-shrink-0">
                {user.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </div>
            )}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <h4 className="text-2xl font-black text-foreground truncate">{user.fullName || 'N/A'}</h4>
              <p className="text-sm font-medium text-muted-foreground truncate mt-0.5">{user.email || 'N/A'}</p>
              
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                  user.status === 'ACTIVE' ? 'status-active' : 'status-inactive'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'ACTIVE' ? 'bg-success' : 'bg-warning'}`}></span>
                  {user.status || 'IN_ACTIVE'}
                </span>
                
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                  user.isKycVerified ? 'bg-primary/10 text-primary border-primary/20' : 'status-suspended'
                }`}>
                  {user.isKycVerified ? '✓ KYC Verified' : '⚠ KYC Pending'}
                </span>

                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent text-accent-foreground border border-border">
                  🛡 {user.role || 'API_HOLDER'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Essential Registration & Company Parameters */}
          <div className="bg-card p-5 rounded-border border border-border shadow-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center">
              <span className="w-1.5 h-3 bg-theme rounded-sm mr-2"></span> Registry & Organization Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>
                <span className="block text-xs font-semibold text-muted-foreground mb-1">Registration Identifier</span>
                <span className="text-sm font-semibold font-mono text-foreground bg-muted px-2.5 py-1 rounded-border border border-border block truncate">
                  {user.registrationNumber || 'N/A'}
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold text-muted-foreground mb-1">Registered Phone Number</span>
                <span className="text-sm font-bold text-foreground block">{user.phoneNumber || 'N/A'}</span>
              </div>

              <div>
                <span className="block text-xs font-semibold text-muted-foreground mb-1">Company / Corporate Title</span>
                <span className="text-sm font-semibold text-foreground block">{user.companyName || 'N/A'}</span>
              </div>

              <div>
                <span className="block text-xs font-semibold text-muted-foreground mb-1">Incorporation Business Type</span>
                <span className="text-sm font-medium text-muted-foreground block bg-muted px-2 py-0.5 rounded border border-border inline-block">
                  {user.companyType ? user.companyType.replace('_', ' ') : 'N/A'}
                </span>
              </div>

              <div className="sm:col-span-2 border-t border-dashed border-border pt-3">
                <span className="block text-xs font-semibold text-muted-foreground mb-1">Parent Reseller / Node Identifier</span>
                <span className="text-xs font-mono text-muted-foreground block truncate">{user.parentId || 'None (Top Level Root)'}</span>
              </div>

            </div>
          </div>

          {/* Section 3: Package Hierarchy Info */}
          <div className="bg-card p-5 rounded-border border border-border shadow-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center">
              <span className="w-1.5 h-3 bg-success rounded-sm mr-2"></span> Service Plan & Commercial Package
            </h4>
            {user.package ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-primary/10 p-4 rounded-border border border-primary/20">
                <div>
                  <span className="block text-xs font-semibold text-primary mb-0.5">Package Profile Name</span>
                  <span className="text-base font-extrabold text-foreground">{user.package.name || 'N/A'}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">No specific commercial system package assigned.</p>
            )}
          </div>

          {/* Section 4: Deep Service Permission Matrix Mapping */}
          <div className="bg-card p-5 rounded-border border border-border shadow-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center">
              <span className="w-1.5 h-3 bg-theme rounded-sm mr-2"></span> Operational Permission Matrix ({user.permissions?.length || 0})
            </h4>
            
            {user.permissions && user.permissions.length > 0 ? (
              <div className="space-y-3">
                {user.permissions.map((perm) => (
                  <div key={perm.id} className="border border-border rounded-border overflow-hidden shadow-border">
                    {/* Permission Module Title */}
                    <div className="bg-muted p-3 flex items-center justify-between border-b border-border">
                      <div>
                        <span className="text-sm font-extrabold text-foreground">{perm.service?.name || 'Assigned Scope'}</span>
                        <span className="ml-2 text-xs font-mono font-bold bg-background px-1.5 py-0.5 rounded text-muted-foreground">{perm.service?.code || 'Custom'}</span>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${perm.isActive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                        {perm.isActive ? 'Permission Active' : 'Permission Inactive'}
                      </span>
                    </div>
                    {/* Grid Capabilities Flag Toggles */}
                    <div className="grid grid-cols-2 divide-x divide-border bg-card text-center">
                      <div className={`p-2.5 text-xs font-bold flex items-center justify-center gap-1.5 ${perm.canView ? 'text-theme bg-theme/10' : 'text-muted-foreground bg-muted/20'}`}>
                        {perm.canView ? '✓ View Capability: Allowed' : '✕ View Capability: Blocked'}
                      </div>
                      <div className={`p-2.5 text-xs font-bold flex items-center justify-center gap-1.5 ${perm.canProcess ? 'text-theme bg-theme/10' : 'text-muted-foreground bg-muted/20'}`}>
                        {perm.canProcess ? '⚙ Processing Capability: Allowed' : '✕ Processing Capability: Blocked'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-muted rounded-border border border-border text-sm text-muted-foreground font-medium">
                No advanced module gateway routing permissions found for this user account.
              </div>
            )}
          </div>

          {/* Section 5: Logs, Credentials Updates & Auditing Timestamps */}
          <div className="bg-card p-5 rounded-border border border-border shadow-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center">
                <span className="w-1.5 h-3 bg-warning rounded-sm mr-2"></span> Security Events & Core Auditing Logs
              </h4>
            </div>

            <div className="bg-muted p-3 rounded-border border border-border">
              <span className="block text-[11px] font-semibold text-muted-foreground uppercase">First Registration Created</span>
              <span className="text-xs font-semibold text-foreground mt-1 block">{formatDate(user.createdAt)}</span>
            </div>

            <div className="bg-muted p-3 rounded-border border border-border">
              <span className="block text-[11px] font-semibold text-muted-foreground uppercase">Last Registry Synchronization</span>
              <span className="text-xs font-semibold text-foreground mt-1 block">{formatDate(user.updatedAt)}</span>
            </div>

            <div className="bg-muted p-3 rounded-border border border-border">
              <span className="block text-[11px] font-semibold text-muted-foreground uppercase">Last Active Terminal Login</span>
              <span className="text-xs font-semibold text-foreground mt-1 block">{formatDate(user.lastLoginAt)}</span>
            </div>

            <div className="bg-muted p-3 rounded-border border border-border">
              <span className="block text-[11px] font-semibold text-muted-foreground uppercase">Account Suspension Reason</span>
              <span className={`text-xs font-semibold mt-1 block ${user.deactivationReason ? 'text-destructive' : 'text-muted-foreground italic'}`}>
                {user.deactivationReason || 'No Active Bans/Deactivations'}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Window Controls */}
        <div className="flex justify-end items-center gap-3 p-4 border-t border-border bg-muted/30">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-foreground bg-card border border-border rounded-border hover:bg-muted active:scale-95 transition-all shadow-border"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;