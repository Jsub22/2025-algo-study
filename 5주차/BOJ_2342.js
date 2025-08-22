const input = require("fs")
  .readFileSync(0)
  .toString()
  .split(" ")
  .map(Number);

let arr = [0, ...input.slice(0, input.length - 1)];
let min = Number.MAX_VALUE;
let dp = Array.from({length:arr.length}, ()=>Array.from({length:5}, ()=>Array(5).fill(min)));

dp[0][0][0] = 0;

// d,x, y의 3차원 배열으로, i 번째까지 포함한 x,y 지점의 최솟값에 대해 계산함
for (let i=1; i<=arr.length-1; i++)
{
    let target = arr[i];
    
    for (let d=0; d<5; d++)
    {
        for (let k=0; k<5; k++)
        {
            if (dp[i-1][d][k] === min)
                continue;
    
            // 왼쪽을 옮기는 경우
            if (k !== target)
            {
                let cost;

                if (d === target)
                    cost = 1;
                else if (d === 0)
                    cost = 2;
                else if (Math.abs(d - arr[i]) === 2)
                    cost = 4;
                else
                    cost = 3;

                dp[i][target][k] = Math.min(dp[i][target][k], dp[i-1][d][k] + cost);
            }
            
            // // 오른쪽을 옮기는 경우
            if (d !== target)
            {
                let cost;

                if (k === target)
                    cost = 1;
                else if (k === 0)
                    cost = 2;
                else if (Math.abs(k - arr[i]) === 2)
                    cost = 4;
                else
                    cost = 3;

                dp[i][d][target] = Math.min(dp[i][d][target], dp[i-1][d][k] + cost);
            }
        }
    }
}

for (let i=0; i<5; i++)
    min = Math.min(min, ...dp[arr.length-1][i]);

console.log(min);
