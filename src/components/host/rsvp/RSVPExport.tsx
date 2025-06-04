
interface RSVPWithUser {
  id: string;
  event_id: string | null;
  user_id: string | null;
  rsvp_time: string | null;
  checkin_time: string | null;
  status: string | null;
  users: {
    name: string;
    email: string;
  } | null;
}

interface RSVPExportProps {
  rsvps: RSVPWithUser[];
  eventId: string;
}

export const useRSVPExport = () => {
  const exportRSVPs = (rsvps: RSVPWithUser[], eventId: string) => {
    const csvContent = [
      ['Name', 'Email', 'RSVP Time', 'Check-in Time', 'Status'],
      ...rsvps.map(rsvp => [
        rsvp.users?.name || 'Unknown',
        rsvp.users?.email || 'Unknown',
        new Date(rsvp.rsvp_time || '').toLocaleDateString(),
        rsvp.checkin_time ? new Date(rsvp.checkin_time).toLocaleDateString() : 'Not checked in',
        rsvp.checkin_time ? 'Attended' : (rsvp.status || 'pending')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-rsvps-${eventId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return { exportRSVPs };
};
