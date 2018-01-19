var btn1 = document.getElementById('btn1');
btn1.addEventListener('click',init);
var m = [];
var m1 = [];
function init() {
    var div = document.getElementById('out');
    //div.innerHTML = "hello world";
    // var html = "<table border='solid 1px'>";
    // let r=0,c=0;
    //
    // for (let i=0;i<3;i++){
    //     html += "<tr>";
    //     for (let j=0;j<3;j++){
    //         html+="<td><table>";
    //         c=0;
    //         for (let k=0;k<3;k++){
    //             html += "<tr>";
    //             for (let l=0;l<3;l++){
    //                 html+="<td><input type='number' id = 'i"+r+c+"' class='txt' min=1 max=9></td>";
    //                 c++;
    //             }
    //             html += "</tr>";
    //         }
    //         r++;
    //         html+="</table></td>";
    //     }
    //     html += "</tr>";
    // }
    //
    // html+="</table><br><br><input type='button' id='solve' value='solve' onclick='solve()' >";
    // //console.log(html);
    // div.innerHTML+=html;

    var html = '';
    for (let i=0;i<9;i++){
        for (let j=0;j<9;j++){
            html +="<input type='number' id = 'i"+i+j+"' class='txt' min=1 max=9>";
        }
        html+="<br>";
    }
    html+="<br><input type='button' id='solve' value='solve' onclick='solve()' >";
    div.innerHTML+=html;
    btn1.remove();
}

function solve() {
    console.log('loading....');


    //var txts = document.querySelectorAll('.txt');
   // console.log(txts);

    var temp = [];
    var x=0;
    for(let i=0;i<9;i++){
        temp = [];
        for (let j=0;j<9;j++){
           // temp.push(document.getElementById('i'+i+j).value);
            //x++;txts[x]
            var id = "i"+i+j;
            console.log(id);
            console.log(document.getElementById(id));
            temp.push(+document.getElementById(id).value);
        }
       m.push(temp);
    }
    //console.log(x);
    console.log(m);
    answer();
}

function answer() {
    let t ;
    for(let i=0;i<9;i++) {
        for (let j = 0; j < 9; j++) {
            t = m[i][j];
            console.log('t =',t);
            if(t === 0 ){
                console.log('in if');
                let row = m[i];
                let col = [];
                //let box = [];
                //let dia = [];
                for(let l=0;l<9;l++){
                    col.push(m[l][j]);
                }
                // for(let l=i;l<9;l++){
                //     for(let n=j;n<9;n++){
                //         dia.push(m[l][n]);
                //     }
                // }
                for(let k=1;k<10;k++){

                    if(row.indexOf(k) == -1 && col.indexOf(k) == -1 ){
                        t= k;
                        console.log(k);
                        break;
                    }
                }
                m[i][j]=t;
            }

        }


    }

    console.log(m);
}


function solve1() {
    console.log('loading....');

    var txts = document.querySelectorAll('.txt');
    //console.log(txts);
    var x1=0;

    for(let i=0;i<3;i++){
       let temp3 =[];
        for (let j=0;j<3;j++){
            let temp2 = [];
            for(let k=0;k<3;k++){
                let temp1 = [];
                for(let l=0;l<3;l++){
                    temp1.push(+txts[x1].value);
                }
                temp2.push(temp1);
            }
            temp3.push(temp2);
           //
        }
        m1.push(temp3);
    }
console.log(m1);
}



function answer1() {




}