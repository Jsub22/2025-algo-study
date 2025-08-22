const [[N, M] ,...arr] = require("fs")
.readFileSync(0)
.toString()
.split("\n")
.map((e)=> e.split(" ").map(Number));

let parent = Array(N).fill(null).map((_, idx) => idx);
let rank = Array(N).fill(1);
let result = 0;

for (let i=0; i<M; i++)
{
    if (!connected(parent, arr[i][0], arr[i][1]))
        union(parent, rank, arr[i][0], arr[i][1]);
    else
    {
        result = i+1;
        break;
    }
}

console.log(result);

function find(parent, x) {
    if (parent[x] !== x) {
      parent[x] = find(parent, parent[x]);
    }
    return parent[x];
}

function union(parent, rank, x, y) {
    const rootX = find(parent, x);
    const rootY = find(parent, y);
    
    if (rootX !== rootY) {
      if (rank[rootX] > rank[rootY]) {
        parent[rootY] = rootX;
      } else if (rank[rootX] < rank[rootY]) {
        parent[rootX] = rootY;
      } else {
        parent[rootY] = rootX;
        rank[rootX] += 1;
      }
    }
}

function connected(parent, x, y) {
    return find(parent, x) === find(parent, y);
}
