'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/Clients/supabase/client';
import { v4 as uuidv4 } from 'uuid';

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const { user } = useAuth();
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //
  const [isCreateCalendarModalOpen, setIsCreateCalendarModalOpen] =
    useState(false);
  const [calendarSchema, setCalendarSchema] = useState({
    username: user?.username,
    calendar_id: uuidv4(),
    calendar_name: '',
    calendar_description: '',
    calendar_slots: [],
    slot_duration: '',
    break_time: '',
    calendar_type: 'continuous',
    is_active: true,
  });
  const [editCallendar, setEditCallendar] = useState(null);

  //
  useEffect(() => {
    if (user?.username) {
      fetchCalendars();
    }
  }, [user?.username]);

  const fetchCalendars = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('calendar_data')
        .select('*')
        .eq('username', user?.username);

      if (error) throw error;
      setCalendars(data);
    } catch (err) {
      console.error('Error fetching forms:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('calendars: ', calendars);
  }, [calendars]);

  return (
    <CalendarContext.Provider
      value={{
        calendars,
        setCalendars,
        loading,
        error,
        fetchCalendars,
        calendarSchema,
        setCalendarSchema,
        editCallendar,
        setEditCallendar,
        isCreateCalendarModalOpen,
        setIsCreateCalendarModalOpen,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

// Hook for accessing forms context
export function useCalendar() {
  return useContext(CalendarContext);
}
