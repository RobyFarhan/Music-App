const http = require('http');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbConnection = require('./connection/db');
const uploadFile = require('./middlewares/uploadFile');

app.set('view engine', 'hbs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //memberikan akses publik

app.use(
    session( {
            cookie: {
                maxAge: 1000 * 60 * 60 * 2, //jika selama jam tsb tidak melakukan apapun maka session di destroy
            },
            store: new session.MemoryStore(),
            resave: false,
            saveUninitialized: true,
            secret: 'SangatRahasia',
        })
);

app.use(function (req, res, next) {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

hbs.registerPartials(__dirname + '/views/partials');

const isLogin = false;
var pathFile = 'http://localhost:3000/uploads/';

app.get('/', function (request, response) {
    const title = 'APPMusic';

    const query = 'SELECT * FROM tb_artist ORDER BY id DESC';

    dbConnection.getConnection(function (err, conn) { //db.connection untuk manipulasi data ke db
        if (err) throw err;
        conn.query(query, function (err, results) {
            if (err) throw err;

            const artist = [];

            for (var result of results) {
                artist.push({
                    id: result.id,
                    name: result.name,
                    // start_career: result.start_career,
                    image: pathFile + result.image,
                    // about: result.about,
                });
            }

             if (artist.length == 0) {
        artist = false;
      }

    response.render('index', {
        title: title,
        isLogin: request.session.isLogin,
        artist,
});
        });
    });
});

app.get('/', function (request, response) {
    const title = 'APPMusic';

    const query = 'SELECT * FROM tb_music ORDER BY id DESC';

    dbConnection.getConnection(function (err, conn) { //db.connection untuk manipulasi data ke db
        if (err) throw err;
        conn.query(query, function (err, results) {
            if (err) throw err;

            const musics = [];

            for (var result of results) {
                musics.push({
                    id: result.id,
                    title: result.title,
                    cover_music: pathFile + result.cover_music,
                 
                });
            }

             if (musics.length == 0) {
        musics = false;
      }

    response.render('index', {
        title: title,
        isLogin: request.session.isLogin,
        musics,
});
        });
    });
});
    
app.get('/artistDetail/:id', function (request, response) {
    const id = request.params.id;
    const title = 'Artist Detail';
    const query = `SELECT * FROM tb_artist WHERE id = ${id}`;

    dbConnection.getConnection(function (err, conn) { //db.connection untuk manipulasi data ke db
        if (err) throw err;
        conn.query(query, function (err, results) {
            if (err) throw err;

            const artistDetail = [];

            for (var result of results) {
                artistDetail.push({
                    id: result.id,
                    name: result.name,
                    start_career: result.start_career,
                    image: pathFile + result.image,
                    about: result.about,
                });
            }
            
        
    response.render('artistDetail', {
        title: title,
        isLogin: request.session.isLogin,
        artistDetail,
});
        });
    });
    });
    
app.get('/appmusic/:id', function (request, response) {
    const id = request.params.id;
    const title = 'APPMusic';
    response.render('artistDetail', {
        title,
        isLogin: request.session.isLogin,
});
});

app.get('/register', function (request, response) {
    const title = 'Register';
    response.render('register', {
        title: title,
        isLogin,
});
});

app.post('/register', function (request, response) {
    const { username, email, password } = request.body;
    // const data = request.body;
    // console.log(data);

    if (username == '' || email == '' || password == '') {
        request.session.message = {
            type: 'danger',
            message: 'Please insert all field',
        };
        return response.redirect('/register');
    }

    const query = `INSERT INTO tb_user (username, email, password) VALUES ("${username}","${email}","${password}");`
   
    dbConnection.getConnection(function(err, conn) { //db.connection untuk manipulasi data ke db
        if (err) throw err;
        conn.query(query, function (err,results) {
            if (err) throw err;
            
        request.session.message = {
            type: 'success',
            message: 'You have registered',
        };
            response.redirect('/register');         
                 });
            });
        });

app.get('/logout', function (request, response) {
    request.session.destroy();
    response.redirect('/');
});

app.get('/login', function (request, response) {
    const title = 'Login';
    response.render('login', {
        title: title,
        isLogin,
});
});

app.post('/login', function (request, response) {
   const { email, password } = request.body;
    // const data = request.body;
    // console.log(data);

    if (email == '' || password == '') {
        request.session.message = {
            type: 'danger',
            message: 'Please insert all field',
        };
        return response.redirect('/login');
    }
    
    const query = `Select *, md5(password) as password FROM tb_user WHERE email = "${email}" AND password = "${password}"`; //(password) diambil dari db

        dbConnection.getConnection(function(err, conn) { //db.connection untuk manipulasi data ke db
        if (err) throw err;
        conn.query(query, function (err,results) {
            if (err) throw err;

            if (results.length == 0) {
                request.session.message = {
                    type: 'danger',
                    message: 'Email and password are not suitable',
                };
                response.redirect('/login');
            } else {
                request.session.message = {
                    type: 'Success',
                    message: 'You are logging in',
                };
                
                request.session.isLogin = true;

                request.session.user = {
                    id: results[0].id,
                    username: results[0].username,
                    email: results[0].email,
                    photo: results[0].photo,
                };
            
            response.redirect('/');
            // console.log(results);
                }
                 });
            });
});

app.get('/addArtist', function (request, response) {
    const title = 'Add Artist';
    response.render('addArtist', {
        title: title,
        isLogin,
        
});
});

app.post('/addArtist', uploadFile('image'), function (request, response) {
    const { name, start_career, about } = request.body;
    const data = request.body;
    var image = request.file.filename;
 

    if (name == '' || start_career == ''|| about == '' ) {
        request.session.message = {
            type: 'danger',
            message: 'Please insert all field',
        };
        return response.redirect('/addArtist');
    }

    const query = `INSERT INTO tb_artist(name, image, start_career, about) VALUES ("${name}","${image}","${start_career}","${about}");`
    dbConnection.getConnection(function(err, conn) { //db.connection untuk manipulasi data ke db
        if (err) throw err;
        conn.query(query, function (err,results) {
            if (err) throw err;
            
        request.session.message = {
            type: 'success',
            message: 'You have registered',
        };
            response.redirect('/addArtist');         
                 });
            });
});

app.get('/edit-artist/:id', function (request, response) {
    const {id} = request.params;
    const title = 'Edit Artist';

    const query = `SELECT * FROM tb_artist  WHERE id = ${id}`;
   
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err;
        conn.query(query, function (err, results) {
            if (err) throw err;

          const artistChosen = {
              id: results[0].id,
              image: pathFile + results[0].image,
              name: results[0].name,
              start_career: results[0].start_career,
              about: results[0].about,
          };
        
            response.render('editArtist', { //nama hbs
                title,
                isLogin: request.session.isLogin,
                artistChosen,
            });
        });
    });
});

app.post('/edit-artist', uploadFile('image'), function (request, response) {
  var { id, name, start_career, about, oldImage } = request.body;

  var image = oldImage.replace(pathFile, '');

  if (request.file) {
    image = request.file.filename;
  }

  const query = `UPDATE tb_artist SET image = "${image}", name = "${name}", start_career = "${start_career}", about = "${about}" WHERE id = ${id}`;

  dbConnection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(query, function (err, results) {
      if (err) throw err;

      response.redirect(`/artistDetail/${id}`);
    });
  });
});

app.get('/delete-artist/:id', function (request, response) { //harus login dulu
    const {id} = request.params;
    const query = `DELETE FROM tb_artist WHERE id = ${id}`;

    dbConnection.getConnection(function (err, conn) {
        if (err) throw err;
        conn.query(query, function (err, results) {
            if (err) throw err;

            response.redirect('/');
        });
    });
});

app.get('/add-music', function (request, response) {
    const title = 'Add Music';
    response.render('addMusic', {
        title: title,
        isLogin,
        
});
});

app.post('/add-music', uploadFile('music','cover_music'), function (request, response) {
    const { title } = request.body;
    // const data = request.body;
    var music = request.file.filename;
    var cover_music = request.file.filename;
    
 
    if (title == '') {
        request.session.message = {
            type: 'danger',
            message: 'Please insert all field',
        };
        return response.redirect('/addMusic');
    }

    const query = `INSERT INTO tb_music(title, music, cover_music) VALUES ("${title}","${music}","${cover_music}");`
    dbConnection.getConnection(function(err, conn) { //db.connection untuk manipulasi data ke db
        if (err) throw err;
        conn.query(query, function (err,results) {
            if (err) throw err;
            
        request.session.message = {
            type: 'success',
            message: 'You have registered',
        };
            response.redirect('/addMusic');         
        });
    });
});

app.get('/edit-music/:id', function (request, response) {
    const {id} = request.params;
    const title = 'Daftar Lagu';

    const query = `SELECT * FROM tb_music  WHERE artist_id = ${id}`;
   
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err;
        conn.query(query, function (err, results) {
            if (err) throw err;

          const songChosen = {
              artist_id: results[0].artist_id,
              title: results[0].title,
                 music: results[0].music,
                 cover_music: results[0].cover_music,
             

      };
        
            response.render('editMusic', { //nama hbs
                title,
                 isLogin: request.session.isLogin,
                songChosen,
            });
        });
    });
});

app.post('/edit-music', uploadFile('music','cover_music'), function (request, response) {
  var { id, title, oldMusic, oldcover_music } = request.body;

    var music = oldMusic.replace(pathFile, '');
     var cover_music = oldcover_music.replace(pathFile, '');

  if (request.file) {
      music = request.file.filename;
      cover_music = request.file.filename;
  }

  const query = `UPDATE tb_music SET title = "${title}", music = "${music}", cover_music = "${cover_music}" WHERE id = ${id}`;

  dbConnection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(query, function (err, results) {
      if (err) throw err;

      response.redirect(`/editMusic/${id}`);
    });
  });
});


app.get('/song-list/:id', function (request, response) {
    const {id} = request.params;
    const title = 'Daftar Lagu';

    const query = `SELECT * FROM tb_music  WHERE artist_id = ${id}`;
   
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err;
        conn.query(query, function (err, results) {
            if (err) throw err;

            const songChosen = [];
            
            for (var result of results) {
                songChosen.push({
                    artist_id: result.artist_id,
                    title: result.title,
                });
        }
        
            response.render('daftarLagu', { //nama hbs
                title,
                 isLogin: request.session.isLogin,
                songChosen,
            });
        });
    });
});

app.get('/playing/:id', function (request, response) {
    const {id} = request.params;
    const title = 'Daftar Lagu';

    const query = `SELECT * FROM tb_music  WHERE artist_id = ${id}`;
   
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err;
        conn.query(query, function (err, results) {
            if (err) throw err;

          const songChosen = {
              title: results[0].title,
              music: pathFile + results[0].music,
              cover_music: pathFile + results[0].cover_music,
               artist_id: results[0].artist_id,
      };
        
            response.render('laguPlaying', { //nama hbs
                title,
                 isLogin: request.session.isLogin,
                songChosen,
            });
        });
    });
});

app.get('/music', function (request, response) {
    // var http = require('http')
    
    const title = 'music list';

    const query = 'SELECT * FROM tb_music ORDER BY id DESC';

    dbConnection.getConnection(function (err, conn) { //db.connection untuk manipulasi data ke db
        if (err) throw err;
        conn.query(query, function (err, results) {
            if (err) throw err;

            const musics = [];

            for (var result of results) {
                musics.push({
                    id: result.id,
                    title: result.title,
                    music:  pathFile + result.music,
                    cover_music: pathFile + result.cover_music,
                    
                });
            }

             if (musics.length == 0) {
        musics = false;
      }

    response.render('musicPlaying', {
        title: title,
        isLogin: request.session.isLogin,
        musics,
});
        });
    });
});


const port = 3000;
const server = http.createServer(app);
server.listen(port);
console.debug(`Server Listening on port ${port}`);

