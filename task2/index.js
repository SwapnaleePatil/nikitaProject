let str = 'abcdefghijklmopqrstuvwxyz';
let map = new Map();
let answer = '';

for(let i=0;i<26;i++ ){
    map.set(str[i],i);
}

//console.log(map);

sub('abbc','ab');
function sum(s) {
    let add =0;
    for(let i=0;i<s.length;i++){
        add+=Math.pow(2,map.get(s[i]));
    }

    console.log('SUM ='+add+' : '+typeof add);
    return add;
}

function sub(s1,s2) {

    let num = sum(s1)-sum(s2);
    console.log(num);
    //let r;
    // do{
    //
    //     // r=num%2;
    //     // num = num-2;
    //
    //     if(num%2){
    //
    //         num = num -2;
    //
    //     }else{
    //
    //     }
    //
    //
    //     answer += str[r];
    //     console.log(num+' : '+answer);
    // }while (r==0)
    num = 12;
    if(num%2!==0) {
        num = num - 1;
        answer += str[0];
        console.log(answer);
    }
    console.log(num);
    let  i = find(num);
   // i--;
    console.log('i : ',i);
    num = num -Math.pow(2,i);

    console.log(num);
    answer+=str[i];


    console.log(answer);
}

function find(num) {
    let i=0;
    while(true){
        if(num <Math.pow(2,i)){
            return --i;
        }
        i++;
    }
}

// function power_of_2(n) {
//     if (typeof n !== 'number')
//         return 'Not a number';
//
//     console.log(n & (n - 1));
//     return n && (n & (n - 1)) === 0;
// }
//
// console.log(power_of_2(16));
// // console.log(power_of_2(18));
// // console.log(power_of_2(256));