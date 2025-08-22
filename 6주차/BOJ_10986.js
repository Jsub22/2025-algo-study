let [[N, M], ...[arr]] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e)=>e.split(" ").map(Number));

let remain = Array(M).fill(0);
let count = 0;

for (let i=0; i<N; i++)
{
    if (i === 0)
        arr[i] = arr[i] % M;
    else
        arr[i] = (arr[i-1] + arr[i]) % M;

    if (arr[i] === 0)
        count++;
    remain[arr[i]]++;
}

for (let i=0; i<M; i++)
{
    if (remain[i] > 1)
        count = count + ((remain[i] * (remain[i] - 1)) / 2);
}

console.log(count);
