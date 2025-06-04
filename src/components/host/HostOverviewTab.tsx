
import { HostStatsCards } from './HostStatsCards';
import { RecentEventsList } from './RecentEventsList';

interface HostOverviewTabProps {
  events: any[];
}

export const HostOverviewTab = ({ events }: HostOverviewTabProps) => {
  return (
    <>
      <HostStatsCards events={events} />
      <RecentEventsList events={events} />
    </>
  );
};
