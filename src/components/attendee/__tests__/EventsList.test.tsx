
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { EventsList } from '../EventsList';

const mockEvents = [
  {
    id: '1',
    title: 'Test Event',
    description: 'Test Description',
    date_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    location: 'Test Location',
    status: 'upcoming',
    max_attendees: 50,
    rsvps: [],
  },
];

const defaultProps = {
  events: mockEvents,
  userRsvps: [],
  rsvpLoading: false,
  onRSVP: vi.fn(),
  onCancelRSVP: vi.fn(),
  onCheckIn: vi.fn(),
};

describe('EventsList Component', () => {
  it('renders events correctly', () => {
    render(<EventsList {...defaultProps} />);
    
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
  });

  it('shows empty state when no events', () => {
    render(<EventsList {...defaultProps} events={[]} />);
    
    expect(screen.getByText('No events available at the moment. Check back later!')).toBeInTheDocument();
  });

  it('displays RSVP button for non-RSVP\'d events', () => {
    render(<EventsList {...defaultProps} />);
    
    expect(screen.getByText('RSVP Now')).toBeInTheDocument();
  });

  it('shows live badge for live events', () => {
    const liveEvent = {
      ...mockEvents[0],
      status: 'Live',
    };
    
    render(<EventsList {...defaultProps} events={[liveEvent]} />);
    
    expect(screen.getByText('Live Now')).toBeInTheDocument();
  });

  it('handles RSVP button click', () => {
    const onRSVP = vi.fn();
    render(<EventsList {...defaultProps} onRSVP={onRSVP} />);
    
    const rsvpButton = screen.getByText('RSVP Now');
    rsvpButton.click();
    
    expect(onRSVP).toHaveBeenCalledWith('1');
  });
});
