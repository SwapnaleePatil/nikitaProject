var record = [
    {id :1,name:'harry',password : 'password'},
    {id :1,name:'ron',password : 'password'}
];

function findById(id,cd) {
    process.nextTick(function () {
        var ind = id - 1;
        if(record[ind]){
            cd(null,record[ind]);
        }else{
            cd(new Error('user'+id+'not found'));
        }
        }
    );
}

function findByName(username,cb) {
    process.nextTick(function () {
        console.log('from user.js : username = ',username);
        for(var i = 0;i<record.length;i++){
            var r = record[i];
            console.log('from user.js : record[i] = ',r.name);
            if(r.name == username){
                return cb(null,r);
            }
        }
        return cb(null,null);
    });
}

module.exports = {
    findById,
    findByName

}