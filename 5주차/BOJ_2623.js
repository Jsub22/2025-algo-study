const [[N,M], ...input] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e)=>e.split(" ").map(Number));

let arr = Array.from({length:N}, ()=>[]);
let degree = Array(N).fill(0);
let check = Array(N).fill(0);

let result = 0;

for (let i=0; i<M; i++)
{
    for (let j=1; j<input[i][0]; j++)
    {
        let i1 = input[i][j]-1;
        let i2 = input[i][j+1]-1;
        arr[i1].push(i2);
        degree[i2]++;
    }
}

let queue = [];
let min = Math.min(...degree);

for (let i=0; i<N; i++)
{
    if (degree[i] === min)
        queue.push([i, 1]);
}

while (queue.length > 0)
{
    let [node, num] = queue.shift();

    check[node] = num;
    
    for (let next of arr[node])
    {
        if (check[next] !== 0)
            continue;
        
        if (--degree[next] === 0)
            queue.push([next, num+1]);
    }
}

if (Math.min(...check) === 0)
    console.log(0);
else
{
    for (let i=0; i<N; i++)
    {
        for (let j=0; j<N; j++)
        {
            if (check[j] === i+1)
                console.log(j+1);
                
        }
    }
}
