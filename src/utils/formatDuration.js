import { addSeconds, format } from 'date-fns';

/**
 * Returns a given number of seconds formatted as `m:ss`.
 *
 * @param  {number} duration The seconds value to format.
 * @return {string}          Formatted time string.
 */
const formatDuration = (duration) => format(addSeconds(new Date(0), duration), 'm:ss');

export default formatDuration;
