/* eslint-disable */
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'

import handlers, { http, app } from './serverHandlers/handlers'
import bearerToken from './serverHandlers/bearerToken'

const corsOptions = {
    origin: true,
    methods: [
        'GET',
        'POST',
        'OPTIONS',
        'PUT',
        'PATCH',
        'DELETE'
    ],
    // allowedHeaders: ['X-Requested-With', 'Content-Type', 'X-CSRF-TOKEN']
    credentials: true,
}

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.trim().match(/\.[^\.]+$/)[0])
    }
})

let upload = multer({ storage: storage });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

// app.get('/getUser', handlers.getUser)
app.post('/checkUser', handlers.checkUser)
app.post('/regUser', handlers.regUser)
// app.use(bearerToken)
app.get('/getUserdata', bearerToken, handlers.getUserdata)
app.post('/upload', bearerToken,  upload.single('photos'), handlers.uploadIMG)
app.get('/getAllFriends', bearerToken, handlers.getAllFriends)
app.get('/getAllRequestedFriends', bearerToken, handlers.getAllRequestedFriends)
app.get('/getAllResponsedFriends', bearerToken, handlers.getAllResponsedFriends)
app.get('/getFiltred/:value', bearerToken, handlers.getFiltred)
app.post('/makeActionToUser', bearerToken, handlers.invokeAction)

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});
app.get(/^http:\/\/localhost:3003\/(?!socket\.io).*/, function root(req, res) {
    console.log(req.url)
    console.log('index');
    res.sendFile(__dirname + '/index.html')
})

// const server = http.createServer(app)
http.listen(process.env.PORT || 3003, function onListen() {
    const address = http.address()
    console.log('Listening on: %j', address)
    console.log(' -> that probably means: http://localhost:%d', address.port)
})
