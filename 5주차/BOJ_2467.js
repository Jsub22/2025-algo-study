const [N, ...[arr]] = require("fs")
  .readFileSync(0)
  .toString()
  .split("\n")
  .map((e, i) => i === 0 ? Number(e) : e.split(" ").map(Number));

let result = [0, 0, Number.MAX_VALUE];

for (let i=0; i<N; i++)
{
    let temp = binarySearch(i);
    
    if (temp[2] < result[2])
        result = temp;
    if (result[2] === 0)
        break;
}

console.log([arr[result[0]], arr[result[1]]].sort((a,b)=>a-b).join(" "));

function binarySearch(i)
{
    let left = 0;
    let right = arr.length - 1;
    let result = [0, 0, Number.MAX_VALUE];

    while (left < right)
    {
        let mid = Math.floor((left+right)/2);
        let sum = arr[mid] + arr[i]; 
        let abs = Math.abs(sum);

        if (i !== mid && abs === 0)
        {
            result = [i, mid, 0];
            break;
        }
        else if (sum < 0)
            left = mid + 1;
        else
            right = mid;
        
        if (i !== mid && abs < result[2])
            result = [i, mid, abs];
    }

    return result;
}
