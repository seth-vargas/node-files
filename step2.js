const fs = require("fs")
const axios = require("axios")

/* Copy over your step1.js code to step2.js

Add a new function, webCat. This should take a URL and, using axios, 
should read the content of that URL and print it to the console.

Modify the code that invoked cat so that, based on the command-line args, 
it decides whether the argument is a file path or a URL and calls either 
cat or webCat, respectively. */

const args = process.argv

for (let i = 2; i < args.length; i++) {
    if (args[i].startsWith("http")) {
        webCat(args[i])
    } else {
        cat(args[i])
    }
    
}

function cat(path) {
    fs.readFile(`${path}`, "utf8", (err, data) => {
        if (err) {
            console.log("Error: " + err)
            process.kill()
        }
        console.log(data)
    })
}

async function webCat(url) {
    try {
        const resp = await axios.get(url)
        console.log(resp.data)
    } catch (error) {
        console.log(error)
        process.kill()
    }

}