export default function shuffleArr(arr) {
  const copiedArr = [...arr];
  for (let i = copiedArr.length - 1; i > 0; i -= 1) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    [copiedArr[i], copiedArr[randomIndex]] = [
      copiedArr[randomIndex],
      copiedArr[i],
    ];
  }
  return copiedArr;
}
