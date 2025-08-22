const [[N], ...input] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e)=>e.split(" ").map(Number));

let arr = input.sort((a,b)=> a[0]-b[0]);

// console.log(arr);
let tails = [];
let parent = Array(N).fill(-1);

// a에 대한 b들을 배열로 보고 증가하는 수열을 찾음
// 그렇게 하면 ... 증가하는 수열을 제외한 나머지를 출력하면 될 듯

for (let i=0; i<N; i++)
{
    let left = 0;
    let right = tails.length;

    while (left < right)
    {
        let mid = Math.floor((left+right)/2);

        if (arr[tails[mid]][1] < arr[i][1])
            left = mid + 1;   
        else
            right = mid;
    }

    tails[left] = i;
    
    if (left > 0)
        parent[i] = tails[left - 1];
}

const lis_len = tails.length;
console.log(input.length-tails.length);

let lis_arr = [];
let cur_i = tails[lis_len - 1];

while (cur_i !== -1)
{
    lis_arr.push(arr[cur_i][0])
    cur_i = parent[cur_i];
}

lis_arr.reverse();

let idx = 0;
for (let i=0; i<N; i++)
{
    if (input[i][0] === lis_arr[idx])
        idx++;
    else
        console.log(input[i][0]);
}
