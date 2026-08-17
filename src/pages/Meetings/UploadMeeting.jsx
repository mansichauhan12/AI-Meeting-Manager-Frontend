import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { callAPI } from '../../utils/api';
import callAPI from '../../utils/callAPI';
import { toast } from 'sonner';

const UploadMeeting = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAudioFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !meetingDate || !audioFile) {
      toast.error('Please fill in all fields and select a file');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      console.log("handle upload ", { formData, workspaceId, title, meetingDate, audioFile })
      formData.append("workspace", workspaceId);
      formData.append("title", title);
      formData.append("meeting_date", meetingDate);
      formData.append("audio_file", audioFile);

      // Note: callAPI should not set Content-Type so browser sets it with boundary for FormData
      const response = await callAPI('POST', 'meetings/upload/', formData);

      if (response.status === 201 || response.status === 200) {
        toast.success('Meeting uploaded successfully');
        navigate(`/workspaces/${workspaceId}/meetings`);
      } else {
        toast.error('Failed to upload meeting');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred during upload');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <button 
        onClick={() => navigate(`/workspaces/${workspaceId}/meetings`)}
        style={{
          background: 'none',
          border: 'none',
          color: '#666',
          cursor: 'pointer',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: 0,
          fontSize: '14px'
        }}
      >
        ← Back to Meetings
      </button>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px', color: '#111' }}>Upload Meeting</h1>

      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Meeting Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Weekly Engineering Meeting"
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              color: '#111',
              outline: 'none',
              width: '100%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Meeting Date</label>
          <input
            type="datetime-local"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              color: '#111',
              outline: 'none',
              width: '100%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Audio File</label>
          
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${isDragging ? '#FF4F00' : 'rgba(0, 0, 0, 0.15)'}`,
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              backgroundColor: isDragging ? 'rgba(255, 79, 0, 0.05)' : '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
            }}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }}
              accept=".mp3,.wav,.m4a,.mp4,.webm"
            />
            
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎵</div>
            
            {audioFile ? (
              <div style={{ color: '#111', fontWeight: '600' }}>
                Selected: {audioFile.name}
              </div>
            ) : (
              <>
                <div style={{ color: '#333', fontWeight: '600' }}>
                  Drag & drop your audio here or <span style={{ color: '#FF4F00', textDecoration: 'underline' }}>Choose File</span>
                </div>
                <div style={{ color: '#666', fontSize: '12px' }}>
                  MP3, WAV, M4A, MP4, WEBM
                  <br />
                  Maximum 100 MB
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button
            type="button"
            onClick={() => navigate(`/workspaces/${workspaceId}/meetings`)}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              color: '#333',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            style={{
              padding: '12px 24px',
              backgroundColor: '#FF4F00',
              border: 'none',
              color: '#fff',
              borderRadius: '8px',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              opacity: isUploading ? 0.7 : 1
            }}
          >
            {isUploading ? 'Uploading...' : 'Upload Meeting'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadMeeting;
