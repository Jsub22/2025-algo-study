let [[N], ...input] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e)=>e.split(" ").map(Number));

let M = 0;
let arr = [];
let max = 0;

for (let i=0; i<N*2-1; i+=2)
    if (max < input[i][0])
        max = input[i][0];

let check = Array(max).fill(0);

for (let i=0; i<N*2-1; i+=2)
{
    M = input[i][0];
    arr = input[i+1];
    check.fill(0);

    for (let i=0; i<M; i++)
    {
        if (check[i] !== 0)
            continue;
        if (arr[i] === i + 1)
            check[i] = 2;
        else
        {
            check[i] = 1;
            dfs(arr[i]-1);
            if (check[i] === 1)
                check[i] = 3;
        }
    }
    
    console.log(check.filter((e)=>e === 3).length);
}

function dfs(next_i)
{ 
    if (next_i === arr[next_i]-1 || check[next_i] === 2 || check[next_i] === 3)
        return;
    else if (check[next_i] === 1)
    {
        while (check[next_i] === 1)
        {
            check[next_i] = 2;
            next_i = arr[next_i]-1;
        }
    }
    else
    {
        check[next_i] = 1;
        dfs(arr[next_i]-1);
        if (check[next_i] === 1)
            check[next_i] = 3;
    }

    return;
}
