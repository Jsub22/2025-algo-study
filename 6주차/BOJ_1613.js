let [[N, k], ...input] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e)=>e.split(" ").map(Number));

let result = [];
let check = Array.from({length:N}, ()=> Array(N).fill(2));

for (let i=0; i<k; i++)
{
    let a = input[i][0]-1;
    let b = input[i][1]-1;

    check[a][b] = -1;
    check[b][a] = 1
}

for (let k=0; k<N; k++)
{
    for (let i=0; i<N; i++)
    {
        for (let j=0; j<N; j++)
        {
            if (i === j) continue;

            if (check[i][k] === 1 && check[k][j] === 1)
                check[i][j] = 1;
            else if (check[i][k] === -1 && check[k][j] === -1)
                check[i][j] = -1;
        }
    }
}

let s = input[k][0];

for (let i=k+1; i<k+1+s; i++)
{
    let a = input[i][0]-1;
    let b = input[i][1]-1;

    if (check[a][b] != 2)
        result.push(check[a][b]);
    else
        result.push(0);
}

console.log(result.join("\n"));
