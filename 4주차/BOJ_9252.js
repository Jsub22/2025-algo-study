const [str1, str2] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e) => e.split(""));

let dp = Array(str1.length).fill().map(() => Array(str2.length).fill(null));

function dfs(i, j) {
    if (i === str1.length || j === str2.length) {
        return [0, ""];
    }

    if (dp[i][j] !== null) {
        return dp[i][j];
    }

    let result = [0, ""];

    if (str1[i] === str2[j]) {
        let next = dfs(i + 1, j + 1);
        let res = [next[0] + 1, str1[i] + next[1]];
        if (res[0] > result[0]) {
            result = res;
        }
    }

    let res1 = dfs(i + 1, j);
    if (res1[0] > result[0]) {
        result = res1;
    }

    let res2 = dfs(i, j + 1);
    if (res2[0] > result[0]) {
        result = res2;
    }

    dp[i][j] = result;
    return result;
}

let result = dfs(0, 0);

console.log(result[0]);

if (result[0] !== 0)
    console.log(result[1]);
