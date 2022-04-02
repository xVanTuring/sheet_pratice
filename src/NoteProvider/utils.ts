export function randRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
//  http://codetheory.us/weighted-biased-random-number-generation-with-javascript-based-on-probability/
export function randomItem<T extends { weight: number }>(list: T[]) {
  const totalWeight = list.reduce((prev, curr) => {
    return prev + curr.weight;
  }, 0);
  const randomNum = randRange(0, totalWeight);
  let weightSum = 0;
  for (var i = 0; i < list.length; i++) {
    weightSum += list[i].weight;
    weightSum = +weightSum.toFixed(2);
    if (randomNum <= weightSum) {
      return list[i];
    }
  }
  return list[0];
}
