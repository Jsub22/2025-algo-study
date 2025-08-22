const [N, ...arr] = require("fs")
  .readFileSync(0)
  .toString()
  .split("\n")
  .map((e, i) => i === 0 ? Number(e) : e.split(" ").map(Number));

let min = Number.MAX_VALUE;
let dp = Array(N+1).fill().map(()=>Array(N+1).fill(Number.MAX_VALUE));

for (let i = 0; i < N; i++)
    dp[i][i] = 0;

// len 개를 계산해서 최대값을 저장함
for (let len=2; len<=N; len++)
{
    // 시작 행렬
    for (let i=0; i<=N - len; i++)
    {    
        // 끝 행렬
        let j = i + len - 1;
        
        // 분할 계산
        for (let k = i; k < j; k++)
        {
            let cost = dp[i][k] + dp[k+1][j] + arr[i][0] * arr[k][1] * arr[j][1];
            dp[i][j] = Math.min(dp[i][j], cost);
        }
        
    }
}

console.log(dp[0][N-1]);
