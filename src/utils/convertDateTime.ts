import moment from 'moment';

interface convertDateTimeFromNowArguments {
  isoTimestamp: string;
}

export function convertDateTimeFromNow({ isoTimestamp }: convertDateTimeFromNowArguments): string {
  return moment(isoTimestamp).fromNow();
}
