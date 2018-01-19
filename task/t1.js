let t = {
    "value": 5,
    "left": {
        "value": 2,
        "left": {
            "value": 1,
            "left": null,
            "right": null
        },
        "right": {
            "value": 3,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 6,
        "left": null,
        "right": {
            "value": 8,
            "left": {
                "value": 7,
                "left": null,
                "right": null
            },
            "right": null
        }
    }
};

function display(t) {
    console.log('tree : ',t);
}

function locate(t,root,n) {
    //var a=root;
    if(n === root){
        console.log('temp : ',t);
        console.log("hsh "+root);
        return root;
    }else if(n<root){
        console.log('temp : ',t);
        return locate(t.left,t.left.value,n);
    }else {
        console.log('temp : ',t);
        return locate(t.right,t.right.value,n);
    }

}
//display(t);
let n = 2;
let target =0;
target=locate(t,t.value,n);
console.log(target);
//display(locate(t,t.value,n));