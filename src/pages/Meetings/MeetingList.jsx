import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import callAPI from '../../utils/callAPI';
import MeetingStatusBadge from '../../components/Meetings/MeetingStatusBadge';
import { toast } from 'sonner';

const MeetingList = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMeetings = async () => {
    setIsLoading(true);
    try {
      const response = await callAPI('GET', `meetings/?workspace=${workspaceId}`);
      console.log("meeting response", response);
      if (response.status === 200) {
        setMeetings(response.data.data);
      } else {
        toast.error('Failed to fetch meetings');
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
      toast.error('Error loading meetings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (workspaceId) {
      fetchMeetings();
    }
  }, [workspaceId]);

  const filteredMeetings = meetings.filter(m =>
    m.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#111' }}>Meetings</h1>
        <button
          onClick={() => navigate(`/workspaces/${workspaceId}/meetings/upload`)}
          style={{
            backgroundColor: '#FF4F00',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>+</span> Upload Meeting
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Search meetings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '300px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            color: '#111',
            outline: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        />
      </div>

      {isLoading ? (
        <div style={{ color: '#666', padding: '40px 0', textAlign: 'center' }}>Loading meetings...</div>
      ) : filteredMeetings.length === 0 ? (
        <div style={{
          color: '#666',
          padding: '60px 0',
          textAlign: 'center',
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: '1px dashed rgba(0, 0, 0, 0.2)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }}>
          No meetings found. Upload your first meeting to get started.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              style={{
                backgroundColor: '#fff',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 12px 0', color: '#111' }}>{meeting.title}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', color: '#666', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📅</span>
                  {meeting.meeting_date ? new Date(meeting.meeting_date).toLocaleString() : 'No date specified'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>👤</span>
                  {meeting.created_by?.first_name || 'Unknown User'}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <MeetingStatusBadge status={meeting.status} />
              </div>

              <div style={{ marginTop: 'auto' }}>
                <Link
                  to={`/workspaces/${workspaceId}/meetings/${meeting.id}`}
                  style={{
                    display: 'inline-block',
                    color: '#FF4F00',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeetingList;
