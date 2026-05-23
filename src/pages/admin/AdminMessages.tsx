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
      <h1>Collector Messages</h1>
      <div className="messages-list-container">
        {messages.length === 0 ? (
          <div className="no-messages announcement-card text-center">
            <p>No messages in the vault yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="message-card-admin">
              <div className="message-header-admin">
                <div className="sender-info">
                  <h3>{msg.subject}</h3>
                  <p>From: <strong>{msg.name}</strong> ({msg.email})</p>
                </div>
                <span className="message-date">{new Date(msg.createdAt).toLocaleString()}</span>
              </div>
              <div className="message-body-admin">
                {msg.message}
              </div>
              <div className="message-footer-admin">
                <button className="delete-btn" onClick={() => handleDelete(msg.id)}>Remove Message</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
