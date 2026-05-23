import React, { useState, useEffect } from 'react';
import API_URL from '../../config';
import './AdminMessages.css';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const token = localStorage.getItem('adminToken');

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;

    try {
      const response = await fetch(`${API_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="admin-messages">
      <h1>Contact Messages</h1>
      <div className="messages-list">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="message-card">
              <div className="message-header">
                <h3>{msg.subject}</h3>
                <span className="message-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="message-info">
                <strong>From:</strong> {msg.name} ({msg.email})
              </div>
              <div className="message-body">
                {msg.message}
              </div>
              <button className="delete-btn" onClick={() => handleDelete(msg.id)}>Delete Message</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
