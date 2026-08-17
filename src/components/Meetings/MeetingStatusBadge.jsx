import React from 'react';

const MeetingStatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status?.toUpperCase()) {
      case 'UPLOADED':
        return {
          bg: 'rgba(156, 163, 175, 0.1)',
          text: '#9CA3AF',
          border: 'rgba(156, 163, 175, 0.2)',
          icon: '⚫',
        };
      case 'PROCESSING':
        return {
          bg: 'rgba(234, 179, 8, 0.1)',
          text: '#EAB308',
          border: 'rgba(234, 179, 8, 0.2)',
          icon: '🟡',
        };
      case 'COMPLETED':
        return {
          bg: 'rgba(34, 197, 94, 0.1)',
          text: '#22C55E',
          border: 'rgba(34, 197, 94, 0.2)',
          icon: '🟢',
        };
      case 'FAILED':
        return {
          bg: 'rgba(239, 68, 68, 0.1)',
          text: '#EF4444',
          border: 'rgba(239, 68, 68, 0.2)',
          icon: '🔴',
        };
      default:
        return {
          bg: 'rgba(156, 163, 175, 0.1)',
          text: '#9CA3AF',
          border: 'rgba(156, 163, 175, 0.2)',
          icon: '⚫',
        };
    }
  };

  const styles = getStatusStyles(status);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: '9999px',
        backgroundColor: styles.bg,
        color: styles.text,
        border: `1px solid ${styles.border}`,
        fontSize: '12px',
        fontWeight: '500',
        textTransform: 'capitalize',
      }}
    >
      <span>{styles.icon}</span>
      {status?.toLowerCase() || 'Unknown'}
    </div>
  );
};

export default MeetingStatusBadge;
