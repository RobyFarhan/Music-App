let mysql = require('mysql');
 
let connectionPool = mysql.createPool({
   host:        'localhost',
   user:        'root',
   password:    '',
   database:    'app_music'
 });

// connection.connect(function(err){
//    if(!!err){
//      console.log(err);
//    }else{
//      console.log('Koneksi Berhasil!');
//    }
//  })

module.exports = connectionPool;