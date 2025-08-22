let [N, K] = require("fs")
    .readFileSync(0)
    .toString()
    .split(" ")
    .map(Number);

let dp = Array.from({length:K+1}, ()=>Array(N+1).fill(0));

for (let i=0; i<=K; i++)
    dp[i][0] = 1;

for (let i=0; i<=N; i++)
	dp[1][i] = 1;

for (let i=2; i<=K; i++)
	for (let j=1; j<=N; j++)
		dp[i][j] = (dp[i-1][j] + dp[i][j-1]) % 1000000000;

console.log(dp[K][N]);
