let [[N, M, K], ...input] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e)=>e.split(" ").map(Number));

input.sort((a,b)=>a[1] - b[1]);

let lt = input[0][1];
let rt = input[K - 1][1];
let answer = -1;

while (lt <= rt)
{
    const mid = Math.floor(lt + (rt - lt) / 2);

    if (canDrink(mid))
    {
        answer = mid;
        rt = mid - 1;
    }
    else
    {
        lt = mid + 1;
    }
}

console.log(answer);

function canDrink(max)
{
    const prefs = input.filter((e) => e[1] <= max).map((e) => e[0]);

    if (prefs.length < N)
        return false;

    prefs.sort((a, b) => b - a);

    let sum = 0;
    
    for (let i=0; i<N; i++)
    {
        sum += prefs[i];
        
        if (sum >= M)
            return true;
    }
    
    return false;
}
