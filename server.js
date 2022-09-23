\*

  This all needs to get cleaned up but its working
  Note that the file structure and dependancies are missing right now
  This repo will get merged with the servers functioning code base soon
  It is working though and actively running at http:// 98 [point] 41 [point] 25 [point] 195
  It's really on the internet which is crazy!

*\

const express = require('express')
const app = express()
const fs = require('fs')
const port = 80
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require("path");

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('views'))
app.get("/", express.static(path.join(__dirname, "./views")));

const handleError = (err, res) => {
    res.status(500).contentType('text/plain').end("Somethin' bad happened...")
}

const upload = multer({
    dest: "/files"
    // limits? https://github.com/expressjs/multer#limits
})

app.get('/', (req, res) => {
    fs.readFile('./uploads/test.txt', 'utf8', (err, data) => {
    res.render('index', {data: data.split('%').slice(1)})
  })
})

app.post('/', (req, res) => {
    console.log('posted!')
    fs.appendFile('./uploads/test.txt', `%${req.body.test}`, err => {
        if (err) console.log(err)
        else {
            console.log('success!')
            res.redirect('/')
        }
    })
})


app.post(
    "/upload",
    upload.single("file"),
    (req, res) => {
      const tempPath = req.file.path;
      
    //   if (
    //         path.extname(req.file.originalname).toLowerCase() === ".jpg" ||
    //         path.extname(req.file.originalname).toLowerCase() === ".png"
    //     ) {

        const newName = Date.now() + '-' + req.file.originalname
            
        fs.appendFile('./uploads/test.txt', `%<img>./files/${newName}`, err => {})

        const targetPath = path.join(__dirname, `./views/files/${newName}`);
        
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);

            res.redirect('/')
        });
    // } else {
    //     fs.unlink(tempPath, err => {
    //         if (err) return handleError(err, res);
    //         res.redirect('/')
    //     });
    //   }
    }
  );


app.post('/delete', (req, res) => {
    console.log('deleted!')
    fs.writeFile('./uploads/test.txt', "", err => {
        if (err) console.log(err)
        else {
            res.redirect('/')
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
