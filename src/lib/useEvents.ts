export interface Event {
  title: string;
  url?: string;
  location: string;
  country: string;
  topic: string;
  startDate: string;
  endDate: string;
}

export function getUpcomingEvents(events: Event[]) {
  return events
    .filter((event) => {
      const date = new Date(event.startDate);
      return date.getTime() > Date.now();
    })
    .sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateA.getTime() - dateB.getTime();
    });
}

export function getPastEvents(events: Event[]) {
  return events
    .filter((event) => {
      const date = new Date(event.startDate);
      return date.getTime() < Date.now();
    })
    .sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB.getTime() - dateA.getTime();
    });
}
