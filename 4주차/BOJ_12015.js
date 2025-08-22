const [N, ...[arr]] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e, _)=> _ == 0 ? Number(e) : e.split(" ").map(Number));

let tails = [];

for (let e of arr)
{
    let left = 0;
    let right = tails.length;

    while (left < right)
    {
        let mid = Math.floor((left + right) / 2);

        if (tails[mid] < e)
            left = mid + 1;
        else
            right = mid;
    }
    tails[left] = e;
}

console.log(tails.length);
