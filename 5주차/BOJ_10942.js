const [N, ...arr] = require("fs")
  .readFileSync(0)
  .toString()
  .split("\n")
  .map((e, i) => i === 0 ? Number(e) : e.split(" ").map(Number));

const num = arr[0];
const M = arr[1][0];
const se = arr.filter((e, i)=> i >= 2);

let dp = Array.from({length:N+1}, ()=>Array(N+1).fill(1));

// 시작 지점
for (let i=1; i<=N; i++)
{
    // 부터의 개수
    for (let j=1; j<=N-i; j++)
    {
        // 앞뒤로 검사
        for (let k=0; k<=Math.floor(j/2); k++)
        {
            // console.log(i, j, k, num[i+k-1], num[i+j-k-1], dp[i][j]);
            if (num[i+k-1] !== num[i+j-k-1])
            {
                dp[i][j] = 0;
                break;
            }
        }
    }
}

for (let [s, e] of se)
    console.log(dp[s][e-s]);
