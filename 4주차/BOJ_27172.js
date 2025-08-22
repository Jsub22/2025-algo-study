const [N, ...[arr]] = require("fs")
.readFileSync(0)
.toString()
.split("\n")
.map((e, _)=> _ == 0 ? Number(e) : e.split(" ").map(Number));

let maxNum = 0;
for (const e of arr) {
    if (e > maxNum)
        maxNum = e;
}

let isCard = Array(maxNum + 1).fill(false);
for (const e of arr) {
    isCard[e] = true;
}

let scores = Array(maxNum+1).fill(0);

for (let i = 1; i <= maxNum; i++) {
    if (isCard[i]) {
        for (let j = i * 2; j <= maxNum; j += i) {
            if (isCard[j]) {
                scores[i]++;
                scores[j]--;
            }
        }
    }
}

console.log(arr.map((e)=>scores[e]).join(" "));
