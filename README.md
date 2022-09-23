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

## Just a Backend and Templates
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
