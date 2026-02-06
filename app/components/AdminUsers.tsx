/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import styles from './AdminUsers.module.css';

interface User {
  id: number;
  pin: string;
  name: string;
  email?: string;
  isAdmin: boolean;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    pin: '',
    name: '',
    email: '',
    isAdmin: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Error fetching users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.pin || formData.pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    if (!formData.name) {
      setError('Name is required');
      return;
    }

    try {
      if (editingId) {
        // Update
        const res = await fetch(`/api/users/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          throw new Error('Failed to update user');
        }

        setSuccess('User updated successfully');
        setEditingId(null);
      } else {
        // Create
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || 'Failed to create user');
        }

        setSuccess('User created successfully');
      }

      setFormData({ pin: '', name: '', email: '', isAdmin: false });
      setShowForm(false);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Error saving user');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');

      setSuccess('User deleted successfully');
      fetchUsers();
    } catch (err) {
      setError('Error deleting user');
      console.error(err);
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({
      pin: user.pin,
      name: user.name,
      email: user.email || '',
      isAdmin: user.isAdmin,
    });
    setShowForm(true);
  };

  if (loading) {
    return <div className={styles.loading}>Loading users...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>User Management</h2>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <button
        className={styles.addButton}
        onClick={() => {
          setEditingId(null);
          setFormData({ pin: '', name: '', email: '', isAdmin: false });
          setShowForm(!showForm);
        }}
      >
        {showForm ? '✕ Cancel' : '+ Add User'}
      </button>

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="pin"
            placeholder="PIN (4 digits)"
            value={formData.pin}
            onChange={handleInputChange}
            maxLength={4}
            pattern="\d{4}"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={handleInputChange}
          />
          <button type="submit" className={styles.submitButton}>
            {editingId ? 'Update User' : 'Create User'}
          </button>
        </form>
      )}

      <div className={styles.usersList}>
        <div className={styles.header}>
          <span>PIN</span>
          <span>Name</span>
          <span>Email</span>
          <span>Actions</span>
        </div>

        {users.map((user) => (
          <div key={user.id} className={styles.userRow}>
            <span className={styles.pin}>{user.pin}</span>
            <span>{user.name}</span>
            <span>{user.email || '-'}</span>
            <div className={styles.actions}>
              <button
                className={styles.editBtn}
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
