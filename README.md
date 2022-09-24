# Sandbox Server One 🌱

Playing around with my first at-home server. No particular purpose, just enjoying the magic.

---

## Make a Local Server
* make an `index.html` with a `<h1>hello world!</h1>`
* `npm install http-server` (or equivalent)
* find your machine's internal / private internet protocol (ip) address
* you can do this with `ipconfig` in powershell or `ifconfig` in terminal
* you're probably looking for something that starts with 10.0.0.XX
* then run `http-server` in your project directory
* you should be able to see your 'hello world' page from any machine on your wifi
* just type that private ip address number into a browser

---

## Make it Internet Accessible
* this is (unfortunately) specific to your internet provider
* frist you'll have to log in to their interface
* for comcast at least you can go to `http://10.0.0.1/` to start
* now you'll have to menu-dive to set your specific machine to a static internal ip address
* this might be called different things for different providers
* assign it to something simple like `10.0.0.100`
* now you'll have to menu dive to find out where you can set up `port forwarding`
* you'll want to forward incoming requests to the internal ip of your server machine
* get your router's ip address from `ipchicken.com` (or wherever)
* restart your server by running `$ http-server` again
* now test it by turning off the wifi on your phone and going to your router's ip address in a browser
* you should see your `hello world!` page
* this is accessible anywhere now!

---

## Just a Templates Backend
* just playing around with this
* no particular reason to avoid a db except simplicity
* started off using just a form in an index.html file
* realized this would lead naturally to needing a backend api running on another port maybe
* seemed unecessary
* decided to pivot early to just having an express app running
* this can serve static html files or ejs files
* ejs files require processing which complicates things
* in fact the express app itself is probably requiring unecessary processing / power
* this could all work with a static html form and a static page generator
* the generator could just be a bash script that rebuilt html pages when necessary based on user input from forms
* this would minimize processing and pivot to simple file serving when possible
* supposidly this saves power but is more about simplicity for simplicity's sake
* in any case I went with just a simple express app serving ejs templates for now


--- 

## The Server File
```javascript
const express = require('express'); 
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require("path");
const fs = require('fs');

const port = 80;
const app = express();

app.set('view engine', 'ejs');
app.get("/", express.static(path.join(__dirname, "./stuff")));
app.use(express.static('./stuff'));
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: "/images"});

app.get('/', (req, res) => {
    fs.readFile('./stuff/database.txt', 'utf8', (err, data) => {
        console.log(`--> fetching database - ${Date.now()}`);
        if (err) console.log(`--> error - ${err} - ${Date.now()}`);
        else console.log(`--> database fetched! - ${Date.now()}`);
        res.render('home', {data: data.split(/\r?\n/)});
    });
});

app.post('/', (req, res) => {
    console.log(`--> posting text - ${Date.now()}`);
    fs.appendFile('./stuff/database.txt', `\n${req.body.test}`, err => {
        if (err) console.log(`--> error - ${err} - ${Date.now()}`);
        else console.log(`--> post successful! - ${Date.now()}`);
        res.redirect('/');
    })
})


app.post("/upload", upload.single("file"), (req, res) => {
    console.log(`--> posting image - ${Date.now()}`);

    const filePath = req.file.path;
    const fileName = Date.now() + '-' + req.file.originalname
        
    fs.appendFile('./stuff/database.txt', `\n<img>./images/${fileName}`, err => {
        if (err) console.log(`--> error - ${err} - ${Date.now()}`);
        else {
            console.log(`--> image added to database! - ${Date.now()}`);
            const newPath = path.join(__dirname, `./stuff/images/${fileName}`);
            fs.rename(filePath, newPath, err => {
                if (err) return console.log(`--> error - ${err} - ${Date.now()}`);
                else console.log(`--> image added to file system! - ${Date.now()}`);
            });
        }
    })
    res.redirect('/')
});


app.post('/delete', (req, res) => {
    console.log(`--> deleting everything - ${Date.now()}`);
    fs.writeFile('./stuff/database.txt', "", err => {
        if (err) console.log(err);
        else console.log(`--> everything deleted! - ${Date.now()}`);
        res.redirect('/');
    })
})

app.listen(port, () => console.log(`--> listening on port ${port} - ${Date.now()}`));
```
