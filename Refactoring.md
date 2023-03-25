# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Refactor Explanation
The code has been refactored to simplify it by eliminating unnecessary checks and consolidating the logic into fewer lines of code. The following changes have been made:

1. The code now returns the default case when the event parameter does not exist.
2. It returns a partition key, which is a hashed string, if the partitionKey property is not present in the event object.
3. It converts the partition key property to a string if it is not already a string.
4. It hashes the partition key string if it exceeds the maximum partition key length before returning it.