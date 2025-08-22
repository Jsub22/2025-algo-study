let S = Number(require("fs")
    .readFileSync(0)
    .toString()
    .trim());

let queue = [];
let check = Array.from({length:S+1}, ()=>Array(S+1).fill(Infinity));

queue.push([0, 1, 0]);

while (queue.length > 0)
{
    let [clip, len, cnt] = queue.shift();
    
    if (S < len)
    {
        cnt = cnt + (len - S);
        len = S;
    }

    if (check[len][clip] > cnt)
        check[len][clip] = cnt;
    else
        continue;
    
    if (S === len)
        continue;
    
    // 화면에 있는 이모티콘을 모두 복사해서 클립보드에 저장한다.
    if (clip !== len)
        queue.push([len, len+len, cnt+2]);
    
    // 클립보드에 있는 모든 이모티콘을 화면에 붙여넣기 한다.
    if (clip !== 0)
        queue.push([clip, len+clip, cnt+1]);
    
    // 화면에 있는 이모티콘 중 하나를 삭제한다.
    if (len >= 1)
        queue.push([clip, len-1, cnt+1]);
}

console.log(Math.min(...check[S]));
