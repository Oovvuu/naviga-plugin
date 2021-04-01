import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

/**
 * Returns the temporal distance between a given datetime and now.
 *
 * @param  {string} time A valid datetime string.
 * @return {string}      A human-readable string denoting the distance between then and now.
 */
const formatTimeSince = (time) => formatDistanceToNowStrict(
  new Date(time),
  { addSuffix: true, includeSeconds: true },
);

export default formatTimeSince;
