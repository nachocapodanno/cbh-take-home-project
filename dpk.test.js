const { deterministicPartitionKey } = require('./dpk');
const crypto = require("crypto");

describe('deterministicPartitionKey', () => {
  it("should return the literal '0' when given no input", () => {
    // exercise
    const trivialKey = deterministicPartitionKey();

    // assert
    expect(trivialKey).toBe('0');
  });

  it('should return the partition key if exists in the event object', () => {
    // setup
    const event = { partitionKey: '290121' };
    
    // exercise
    const result = deterministicPartitionKey(event);

    // assert
    expect(result).toBe('290121');
  });

  it('should return the partition key if exists in the event object and its type is not an string', () => {
    // setup
    const event = { partitionKey: 2023 };
    
    // exercise
    const result = deterministicPartitionKey(event);

    // assert
    expect(result).toBe('2023');
  });

  it('should return a SHA3-512 hash of the event object if no partition key attribute exists', () => {
    // setup
    const event = { fake: '1234' };
    const data = JSON.stringify(event);

    // exercise
    const result = deterministicPartitionKey(event);

    // assert
    const expectedResult = crypto
      .createHash('sha3-512')
      .update(data)
      .digest('hex');

    expect(result).toBe(expectedResult);
  });

  it('should return a SHA3-512 hash of the candidate if its length greater than 256 characters', () => {
    // setup
    const candidate = Array.from({length: 300}, () => 'c').join('');

    // exercise
    const result = deterministicPartitionKey({
      partitionKey: candidate,
    });

    // assert
    const expectedResult = crypto
    .createHash('sha3-512')
    .update(candidate)
    .digest('hex');

    expect(result).toBe(expectedResult);
  });
});
