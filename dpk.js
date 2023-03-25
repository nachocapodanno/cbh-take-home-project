const crypto = require('crypto');
const {
  TRIVIAL_PARTITION_KEY,
  MAX_PARTITION_KEY_LENGTH,
} = require('./constants');

exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  if (!event.partitionKey)
    return crypto
      .createHash('sha3-512')
      .update(JSON.stringify(event))
      .digest('hex');

  const candidate =
    typeof event.partitionKey !== 'string'
      ? JSON.stringify(event.partitionKey)
      : event.partitionKey;

  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? crypto.createHash('sha3-512').update(candidate).digest('hex')
    : candidate;
};
