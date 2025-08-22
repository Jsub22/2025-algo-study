let [[N], ...[input]] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e)=>e.split(" ").map(Number));

let dp = Array(N+1).fill(Infinity);

dp[1] = 0;

for (let i=1; i<=N; i++)
{
    if (dp[i] === Infinity)
        continue;
    
    for (let j=1; j<=input[i-1]; j++)
    {
        if (dp[i]+1 >= dp[i+j])
            continue;
        else
            dp[i+j] = dp[i]+1;
    }
}

console.log(dp[N] === Infinity ? -1 : dp[N]);
