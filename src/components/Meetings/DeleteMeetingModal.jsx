import React from 'react';
// import { callAPI } from '../../utils/api';
import callAPI from '../../utils/callAPI';
import { toast } from 'sonner';

const DeleteMeetingModal = ({ isOpen, onClose, meeting, workspaceId, onSuccess }) => {
  if (!isOpen || !meeting) return null;

  console.log("meeting", meeting);

  const handleDelete = async () => {
    try {
      const response = await callAPI('DELETE', `meetings/${meeting.id}/`);
      if (response.status === 204 || response.status === 200) {
        toast.success('Meeting deleted successfully');
        if (onSuccess) onSuccess();
      } else {
        toast.error('Failed to delete meeting');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting the meeting');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: '#1E1E1E',
        borderRadius: '16px',
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>Delete Meeting?</h2>
        <p style={{ color: '#A1A1AA', marginBottom: '24px', lineHeight: '1.5' }}>
          Are you sure you want to delete <br />
          <strong style={{ color: '#fff' }}>"{meeting.title}"</strong>?<br />
          <br />
          This action cannot be undone.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 16px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            style={{
              padding: '10px 16px',
              backgroundColor: '#EF4444',
              border: 'none',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Delete Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMeetingModal;
