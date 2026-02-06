/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import styles from './ParkingHistory.module.css';

interface HistoryRecord {
  id: number;
  userId: number;
  user: {
    id: number;
    name: string;
    pin: string;
  };
  spaceNumber: number;
  checkIn: string;
  checkOut: string | null;
  duration: number | null;
  createdAt: string;
}

interface Props {
  userId?: number;
  isAdmin?: boolean;
}

export default function ParkingHistory({ userId, isAdmin }: Props) {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [daysFilter, setDaysFilter] = useState('7');
  const [selectedUser, setSelectedUser] = useState<number | null>(userId || null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'user'>('date');

  useEffect(() => {
    fetchHistory();
    if (isAdmin) {
      fetchUsers();
    }
  }, [daysFilter, selectedUser, sortBy]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setAllUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedUser) {
        params.append('userId', selectedUser.toString());
      }
      params.append('days', daysFilter);

      const res = await fetch(`/api/parking-history?${params}`);
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return '-';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const isActive = (record: HistoryRecord) => !record.checkOut;

  const sortedHistory = [...history].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime();
    } else {
      return a.user.name.localeCompare(b.user.name);
    }
  });

  const activeCount = history.filter((h) => !h.checkOut).length;
  const totalMinutes = history.reduce((acc, h) => acc + (h.duration || 0), 0);
  const avgMinutes = history.filter((h) => h.duration).length > 0
    ? Math.round(totalMinutes / history.filter((h) => h.duration).length)
    : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Parking History</h2>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.label}>Active</span>
            <span className={`${styles.value} ${styles.active}`}>{activeCount}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Total Sessions</span>
            <span className={styles.value}>{history.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Avg Duration</span>
            <span className={styles.value}>{formatDuration(avgMinutes)}</span>
          </div>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Period</label>
          <select value={daysFilter} onChange={(e) => setDaysFilter(e.target.value)}>
            <option value="1">24 Hours</option>
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
          </select>
        </div>

        {isAdmin && (
          <div className={styles.filterGroup}>
            <label>User</label>
            <select
              value={selectedUser || ''}
              onChange={(e) => setSelectedUser(e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">All Users</option>
              {allUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.filterGroup}>
          <label>Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'date' | 'user')}>
            <option value="date">Recent First</option>
            <option value="user">User A-Z</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading history...</div>
      ) : history.length === 0 ? (
        <div className={styles.empty}>📭 No parking history found</div>
      ) : (
        <div className={styles.timelineContainer}>
          <div className={styles.timeline}>
            {sortedHistory.map((record, index) => (
              <div
                key={record.id}
                className={`${styles.timelineItem} ${
                  isActive(record) ? styles.active : styles.completed
                }`}
              >
                <div className={styles.dot}></div>

                <div className={styles.content}>
                  <div className={styles.top}>
                    <span className={styles.date}>
                      {formatDate(record.checkIn)}
                    </span>
                    <span className={styles.user}>{record.user.name}</span>
                    <span className={styles.space}>Space #{record.spaceNumber}</span>
                  </div>

                  <div className={styles.middle}>
                    <div className={styles.times}>
                      <span className={styles.checkIn}>
                        🕐 {formatTime(record.checkIn)}
                      </span>
                      {record.checkOut && (
                        <span className={styles.checkOut}>
                          🕑 {formatTime(record.checkOut)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.bottom}>
                    <span
                      className={`${styles.badge} ${
                        isActive(record) ? styles.badgeActive : styles.badgeCompleted
                      }`}
                    >
                      {isActive(record) ? '🟢 Parked' : '✓ Complete'}
                    </span>
                    {record.duration && (
                      <span className={styles.duration}>
                        ⏱ {formatDuration(record.duration)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
