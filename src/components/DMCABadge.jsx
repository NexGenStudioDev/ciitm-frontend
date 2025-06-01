// Drop-in React component for DMCA.com Protection Badge
import React, { useState, useEffect } from 'react';

const DMCABadge = ({ 
  size = 'medium',
  position = 'inline',
  theme = 'light',
  showTooltip = true,
  className = '',
  onBadgeClick = null
}) => {
  // DMCA.com badge configuration
  const DMCA_CONFIG = {
    badgeUrl: process.env.REACT_APP_DMCA_BADGE_URL || "https://images.dmca.com/Badges/DMCA_badge_grn_60w.png?ID=638734f7-8b37-47af-b022-7b03a77295f2",
    statusUrl: process.env.REACT_APP_DMCA_STATUS_URL || "https://www.dmca.com/Protection/Status.aspx?ID=638734f7-8b37-47af-b022-7b03a77295f2",
    alt: "DMCA.com Protection Status",
    guid: "638734f7-8b37-47af-b022-7b03a77295f2"
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Size configurations
  const sizeClasses = {
    small: "w-16 h-auto",
    medium: "w-24 h-auto", 
    large: "w-32 h-auto",
    xlarge: "w-40 h-auto"
  };

  // Position configurations
  const positionClasses = {
    inline: "",
    'fixed-bottom-right': "fixed bottom-4 right-4 z-50",
    'fixed-bottom-left': "fixed bottom-4 left-4 z-50",
    center: "mx-auto text-center",
    'float-right': "float-right ml-4 mb-2"
  };

  // Theme configurations
  const themeClasses = {
    light: "bg-white border border-gray-200 rounded-lg shadow-sm p-2",
    dark: "bg-gray-800 border border-gray-600 rounded-lg shadow-sm p-2",
    transparent: "bg-transparent",
    minimal: ""
  };

  // Handle badge click
  const handleBadgeClick = (e) => {
    if (onBadgeClick) {
      onBadgeClick(e);
    }
    
    // Analytics tracking (optional)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'dmca_badge_click', {
        'event_category': 'protection',
        'event_label': 'dmca_status_check'
      });
    }
  };

  // Handle image load
  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  // Handle image error
  const handleImageError = () => {
    setHasError(true);
    console.warn('DMCA badge image failed to load');
  };

  // Check if DMCA is properly configured
  const isConfigured = true; // Your badge is now properly configured

  // Don't render if not configured in production
  if (!isConfigured && process.env.NODE_ENV === 'production') {
    console.warn('DMCA badge not configured. Please add your DMCA.com badge details.');
    return null;
  }

  return (
    <div 
      className={`dmca-badge-wrapper ${positionClasses[position]} ${className}`}
      role="complementary"
      aria-label="DMCA Protection Status"
    >
      <div className={`dmca-badge ${themeClasses[theme]} transition-all duration-200 hover:shadow-md`}>
        <a 
          href={DMCA_CONFIG.statusUrl}
          title={showTooltip ? "Click to view DMCA.com Protection Status" : ""}
          className="dmca-badge-link block"
          target="_blank" 
          rel="noopener noreferrer"
          onClick={handleBadgeClick}
          aria-label="View DMCA Protection Certificate"
        >
          {hasError ? (
            // Fallback text if image fails to load
            <div className="dmca-fallback text-xs text-center p-2 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold text-blue-800">DMCA</div>
              <div className="text-blue-600">Protected</div>
            </div>
          ) : (
            <img 
              src={DMCA_CONFIG.badgeUrl}
              alt={DMCA_CONFIG.alt}
              className={`${sizeClasses[size]} transition-opacity duration-200 opacity-80 hover:opacity-100`}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                display: isLoaded ? 'block' : 'none'
              }}
            />
          )}
        </a>
        
        {/* Optional tooltip */}
        {showTooltip && (
          <div className="dmca-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
            <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              DMCA Protected Content
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Higher-order component for automatic badge injection
export const withDMCAProtection = (WrappedComponent, badgeProps = {}) => {
  return function DMCAProtectedComponent(props) {
    return (
      <div className="dmca-protected-content">
        <WrappedComponent {...props} />
        <DMCABadge 
          position="fixed-bottom-right"
          size="small"
          theme="light"
          {...badgeProps}
        />
      </div>
    );
  };
};

// Hook for DMCA protection status
export const useDMCAProtection = () => {
  const [protectionStatus, setProtectionStatus] = useState({
    isProtected: false,
    lastChecked: null,
    certificateUrl: null
  });

  useEffect(() => {
    // Check if page has DMCA badge
    const badge = document.querySelector('.dmca-badge-link');
    if (badge) {
      setProtectionStatus({
        isProtected: true,
        lastChecked: new Date(),
        certificateUrl: badge.href
      });
    }
  }, []);

  return protectionStatus;
};

// Utility function to validate DMCA configuration
export const validateDMCAConfig = () => {
  const badges = document.querySelectorAll('.dmca-badge-link');
  const issues = [];

  badges.forEach((badge, index) => {
    const href = badge.getAttribute('href');
    const img = badge.querySelector('img');
    
    if (!href || !href.includes('dmca.com')) {
      issues.push(`Badge ${index + 1}: Invalid or missing status URL`);
    }
    
    if (!img || !img.src || img.src.includes('YOUR_GUID_HERE')) {
      issues.push(`Badge ${index + 1}: Invalid or missing badge image URL`);
    }
  });

  return {
    isValid: issues.length === 0,
    issues: issues,
    badgeCount: badges.length
  };
};

export default DMCABadge;

