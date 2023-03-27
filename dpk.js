const crypto = require('crypto');
const {
  TRIVIAL_PARTITION_KEY,
  MAX_PARTITION_KEY_LENGTH,
  SHA_512_HASH_ALGORITHM,
} = require('./constants');

exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  if (!event.partitionKey)
    return crypto
      .createHash(SHA_512_HASH_ALGORITHM)
      .update(JSON.stringify(event))
      .digest('hex');

  const candidate =
    typeof event.partitionKey !== 'string'
      ? JSON.stringify(event.partitionKey)
      : event.partitionKey;

  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? crypto.createHash(SHA_512_HASH_ALGORITHM).update(candidate).digest('hex')
    : candidate;
};
