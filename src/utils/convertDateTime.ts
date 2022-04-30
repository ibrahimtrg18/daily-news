import moment from 'moment';

export function convertDateTimeFromNow(isoTimestamp: string | undefined): string {
  if (!isoTimestamp) return '';
  return moment(isoTimestamp).fromNow();
}
