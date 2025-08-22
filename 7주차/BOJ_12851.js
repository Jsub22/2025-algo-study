let [N, K] = require("fs")
    .readFileSync(0)
    .toString()
    .split(" ")
    .map(Number);

let max = N > K ? N : K;
let check = Array.from({length:max+1}, ()=>[Infinity, 1]);
let queue = [];
let head = 0;

check[N][0] = 0;
check[N][1] = 1;

queue.push([N, 0]);

while (head < queue.length)
{
    let [location, count] = queue[head++];
    
    let data = [location-1, location+1, location*2];

    for (let i=0; i<data.length; i++)
    {
        if (i === 0 && location <= 0)
            continue;
        if (i === 1 && location >= max)
            continue;
        if (i === 2 && (location <= 0 || location >= max))
            continue;
        
        if (data[i] > K)
        {
            count += (data[i] - K);
            data[i] = K;
        }
        
        if (check[data[i]][0] < count+1)
            continue;
            
        if (check[data[i]][0] > count+1)
        {
            check[data[i]][0] = count+1;
            check[data[i]][1] = check[location][1];
        }
        else
        {
            check[data[i]][1] += check[location][1];
            continue;
        }
    
        if (data[i] === K)
            continue;
            
        queue.push([data[i], count+1]);
    }
}

console.log(check[K].join("\n"));
