import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import callAPI from '../../utils/callAPI';
import MeetingStatusBadge from '../../components/Meetings/MeetingStatusBadge';
import DeleteMeetingModal from '../../components/Meetings/DeleteMeetingModal';
import { toast } from 'sonner';

const MeetingDetails = () => {
  const { workspaceId, meetingId } = useParams();
  const navigate = useNavigate();

  const [meeting, setMeeting] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchMeeting = async () => {
    setIsLoading(true);
    try {
      const response = await callAPI('GET', `meetings/${meetingId}/`);
      console.log("fetch meeting response", response);
      if (response.status === 200) {
        setMeeting(response.data.data);
      } else {
        toast.error('Failed to load meeting details');
        navigate(`/workspaces/${workspaceId}/meetings`);
      }
    } catch (error) {
      console.error('Error fetching meeting:', error);
      toast.error('Error loading meeting details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (meetingId) {
      fetchMeeting();
    }
  }, [meetingId]);

  const handleDeleteSuccess = () => {
    navigate(`/workspaces/${workspaceId}/meetings`);
  };

  if (isLoading) {
    return <div style={{ padding: '40px', color: '#A1A1AA', textAlign: 'center' }}>Loading meeting details...</div>;
  }

  if (!meeting) return null;

  const isProcessed = meeting.status === 'COMPLETED';

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      {/* Header Section */}
      <button
        onClick={() => navigate(`/workspaces/${workspaceId}/meetings`)}
        style={{
          background: 'none',
          border: 'none',
          color: '#666',
          cursor: 'pointer',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: 0,
          fontSize: '14px'
        }}
      >
        ← Back to Meetings
      </button>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '32px'
      }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#111' }}>{meeting.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#666', fontSize: '14px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📅</span>
              {meeting.meeting_date ? new Date(meeting.meeting_date).toLocaleString() : 'No date specified'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>👤</span>
              {meeting.created_by?.first_name || 'Unknown User'}
            </div>
          </div>
          <MeetingStatusBadge status={meeting.status} />
        </div>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          style={{
            padding: '10px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#EF4444',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Delete
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '2px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        {['summary', 'transcript', 'action_items'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab ? '#111' : 'transparent'}`,
              color: activeTab === tab ? '#111' : '#666',
              cursor: 'pointer',
              fontWeight: '600',
              textTransform: 'capitalize',
              fontSize: '15px'
            }}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '16px',
        padding: '32px',
        minHeight: '300px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        {activeTab === 'summary' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#111' }}>Summary</h2>
            {!isProcessed ? (
              <div style={{ color: '#666' }}>
                AI summary is not available yet.<br />
                Meeting is waiting for processing.
              </div>
            ) : (
              <div style={{ color: '#333', lineHeight: '1.6' }}>
                {meeting.summary || 'No summary available.'}
              </div>
            )}
          </div>
        )}

        {activeTab === 'transcript' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#111' }}>Transcript</h2>
            {!isProcessed ? (
              <div style={{ color: '#666' }}>
                Transcript not available.<br />
                The meeting is still being processed.
              </div>
            ) : (
              <div style={{ color: '#333', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {meeting.transcript || 'No transcript available.'}
              </div>
            )}
          </div>
        )}

        {activeTab === 'action_items' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#111' }}>Action Items</h2>
            {!isProcessed ? (
              <div style={{ color: '#666' }}>
                Action items not available.<br />
                The meeting is still being processed.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {meeting.action_items && meeting.action_items.length > 0 ? (
                  meeting.action_items.map((item, index) => (
                    <div key={index} style={{
                      padding: '16px',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.05)'
                    }}>
                      <div style={{ fontWeight: '600', marginBottom: '8px', color: '#111' }}>{item.task}</div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666' }}>
                        <span>Assigned to: {item.assigned_to || 'Unassigned'}</span>
                        <span>Due: {item.due_date || 'N/A'}</span>
                        <span>Priority: {item.priority || 'Normal'}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: '#666' }}>No action items identified.</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <DeleteMeetingModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        meeting={meeting}
        workspaceId={workspaceId}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
};

export default MeetingDetails;
