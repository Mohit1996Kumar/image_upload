//node modules
let express = require('express')
let bodyParser = require('body-parser');
let multer = require('multer');

//require files
const connection = require('./db_connection/mongo')
let controler = require('./controler')
const upload = multer({ dest: './uploads/' });
const CONSTANTS = require('./constants')

//app intance
let app = express()

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//APIs
app.get('/home', controler.imageController.welcomePage)
app.post('/upload_image', upload.single("file"), controler.imageController.insertImage)
app.get('/get_image', controler.imageController.findImage)

//Running Server
app.listen(CONSTANTS.PORT, (err) => {
    if (err)
        console.log(err)
    else
        console.log("App is runnning on port ", CONSTANTS.PORT);
})