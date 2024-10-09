export function generatePlayerClashes(userIds: number[]): number[][] {
  const clashes: number[][] = [];

  // Generate all possible pairings
  for (let i = 0; i < userIds.length; i++) {
    for (let j = i + 1; j < userIds.length; j++) {
      clashes.push([userIds[i], userIds[j]]); // Return an array of two player IDs instead of an object
    }
  }

  // Randomly shuffle the clashes array
  const shuffledClashes = shuffleArray(clashes);

  return shuffledClashes;
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
