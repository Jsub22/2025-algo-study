const [N, ...[arr]] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e, _)=> _ == 0 ? Number(e) : e.split(" ").map(Number));

let tails = [];
let parent = Array(N).fill(-1);

for (let i=0; i<N; i++)
{
    let left = 0;
    let right = tails.length;

    while (left < right)
    {
        let mid = Math.floor((left + right) / 2);

        if (arr[tails[mid]] < arr[i])
            left = mid + 1;
        else
            right = mid;
    }

    tails[left] = i;

    if (left > 0)
        parent[i] = tails[left - 1];
}

const lis_len = tails.length;
console.log(lis_len);

let lis_arr = [];
let cur_i = tails[lis_len - 1];

while (cur_i !== -1)
{
    lis_arr.push(arr[cur_i]);
    cur_i = parent[cur_i];
}

lis_arr.reverse();
console.log(lis_arr.join(" "));
