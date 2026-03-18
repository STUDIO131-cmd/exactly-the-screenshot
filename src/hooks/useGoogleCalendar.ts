import { useState, useEffect } from 'react';

interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

export interface AvailableSlot {
  date: string;
  displayDate: string;
  dayOfWeek: string;
  slots: string[];
}

const CALENDAR_ID = 'agencia@studio131.com.br';
const API_KEY = 'AIzaSyAg42fekV1_ZOGAv66X48Vcgn5su3OZQ6I';

const WORKING_HOURS = {
  start: 8,
  end: 18,
  slotDuration: 2,
};

const WORKING_DAYS = [1, 2, 3, 4, 5, 6]; // Segunda a Sábado

export const useGoogleCalendar = (daysAhead: number = 30) => {
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      setError(null);

      const now = new Date();
      const future = new Date();
      future.setDate(future.getDate() + daysAhead);

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?` +
        `key=${API_KEY}&` +
        `timeMin=${now.toISOString()}&` +
        `timeMax=${future.toISOString()}&` +
        `singleEvents=true&` +
        `orderBy=startTime&` +
        `maxResults=100`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Erro ao buscar calendário');
      }

      const data = await response.json();
      const events: CalendarEvent[] = data.items || [];

      const slots = calculateAvailableSlots(events, now, future);
      setAvailableSlots(slots);
    } catch (err) {
      console.error('Erro Google Calendar:', err);
      setError('Não foi possível carregar a disponibilidade');
      setAvailableSlots(getFallbackSlots());
    } finally {
      setLoading(false);
    }
  };

  const calculateAvailableSlots = (
    events: CalendarEvent[],
    startDate: Date,
    endDate: Date
  ): AvailableSlot[] => {
    const slots: AvailableSlot[] = [];
    const busyTimes = new Set<string>();

    events.forEach(event => {
      const start = event.start.dateTime || event.start.date;
      if (start) {
        const date = new Date(start);
        const key = `${date.toISOString().split('T')[0]}-${date.getHours()}`;
        busyTimes.add(key);
      }
    });

    const current = new Date(startDate);
    current.setHours(0, 0, 0, 0);

    while (current <= endDate) {
      const dayOfWeek = current.getDay();

      if (WORKING_DAYS.includes(dayOfWeek)) {
        const dateStr = current.toISOString().split('T')[0];
        const daySlots: string[] = [];

        for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour += WORKING_HOURS.slotDuration) {
          const key = `${dateStr}-${hour}`;
          if (!busyTimes.has(key)) {
            daySlots.push(`${hour.toString().padStart(2, '0')}:00`);
          }
        }

        if (daySlots.length > 0) {
          slots.push({
            date: dateStr,
            displayDate: formatDisplayDate(current),
            dayOfWeek: formatDayOfWeek(current),
            slots: daySlots,
          });
        }
      }

      current.setDate(current.getDate() + 1);
    }

    return slots.slice(0, 10);
  };

  const formatDisplayDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
    });
  };

  const formatDayOfWeek = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long' });
  };

  const getFallbackSlots = (): AvailableSlot[] => {
    const slots: AvailableSlot[] = [];
    const current = new Date();

    for (let i = 1; i <= 14; i++) {
      current.setDate(current.getDate() + 1);
      const dayOfWeek = current.getDay();

      if (WORKING_DAYS.includes(dayOfWeek)) {
        slots.push({
          date: current.toISOString().split('T')[0],
          displayDate: formatDisplayDate(current),
          dayOfWeek: formatDayOfWeek(current),
          slots: ['08:00', '10:00', '14:00', '16:00'],
        });
      }

      if (slots.length >= 8) break;
    }

    return slots;
  };

  return { availableSlots, loading, error, refetch: fetchAvailability };
};

export default useGoogleCalendar;
