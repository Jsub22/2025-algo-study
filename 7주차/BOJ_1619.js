let [[N], ...input] = require("fs")
    .readFileSync(0)
    .toString()
    .trim()
    .split("\n")
    .map(e => e.split(" ").map(Number));

let lines = new Map();

for (let i=0; i<N; i++) {
    for (let j=i+1; j<N; j++) {
        let x1 = input[i][0], y1 = input[i][1];
        let x2 = input[j][0], y2 = input[j][1];

        let a = y2 - y1; // 기울기
        let b = x1 - x2;
        let c = -(a*x1 + b*y1); // 절편

        let g = gcd(gcd(a, b), c);
        
        if (g !== 0)
        {
            a /= g;
            b /= g;
            c /= g;
        }

        if (a < 0 || (a === 0 && b < 0))
        {
            a = -a;
            b = -b;
            c = -c;
        }

        let key = `${a}/${b}/${c}`;
        
        if (!lines.has(key))
            lines.set(key, new Set());

        lines.get(key).add(i);
        lines.get(key).add(j);
    }
}

let answer = -1;

for (let pts of lines.values())
    if (pts.size >= 3)
        answer = Math.max(answer, pts.size);

console.log(answer);

function gcd(a, b) {
    if (b === 0)
	    return Math.abs(a);
    else
	    return gcd(b, a % b);
}
