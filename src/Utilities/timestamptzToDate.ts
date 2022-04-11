export default function timestamptzToDate(timestamptz: string): Date {
  /* Description: Converts Postgres timestamptz datatype to javascript Date Object preserving UTC conversions
        - this implementation ensures we convert timezones correctly
        - postgres timestamptz datatype can only be parsed to 3 decimal places so need regex to split & rejoin
        - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
    */
  const parsedTimestamp = timestamptz.match(
    /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})|(\+.*)/g,
  );
  const date = new Date(parsedTimestamp.join(''));
  return date;
}
