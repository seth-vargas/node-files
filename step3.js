const fs = require("fs")
const axios = require("axios")

const args = process.argv

/* 

Add a feature where, on the command line, you can optionally provide 
an argument to output to a file instead of printing to the console. 
The argument should look like this: --out output-filename.txt readfile-or-url.

Current features should still work the same:

$ node step3.js one.txt
This is file one.

$ node step3.js http://google.com
<!doctype html><html ...
However, if --out follows your script name, it should take the next 
argument and use that as the path to write to.

For example:

$ node step3.js --out new.txt one.txt
$ # no output, but new.txt contains contents of one.txt

$ node step3.js --out new.txt  http://google.com
$ # no output, but new.txt contains google's HTML
Make sure you handle errors trying to write to the file:

$ node step3.js --out /no/dir/new.txt one.txt
Couldn't write /no/dir/new.txt:
Error: ENOENT: no such file or directory, open '/no/dir/new.txt' 
*/

loopOverArgs(args)

async function loopOverArgs(args) {
    for (let i = 2; i < args.length; i++) {
        const command = args[i]

        if (command.startsWith("--out")) {
            const filename = args[i+1] // get filename (the file we are writing to)
            const path = args[i+2] // get path (the file we are reading from)
            let content // gets passed later when writing to new.txt

            if (path.startsWith("http")) {
                content = await webCat(path)// call webCat, save to content
            } else {
                content = await cat(path) // call cat, save to content
            }

            fs.writeFile(filename, `${content}`, (err) => {
                if (err) {
                    console.log(`Couldn't write ${filename}`)
                    console.log("Error: ", err)
                    process.kill()
                }
            })
            return
        } else if (command.startsWith("http")) {
            const resp = await webCat(command) // call webCat, console.log it
            console.log(resp)
        } else {
            const resp = await cat(command) // call cat, console.log it
            console.log(resp)
        }
    }
}

async function cat(path) {
    return fs.readFileSync(`${path}`, "utf8", (err, data) => { // old: fs.readFile( ...
        if (err) {
            console.log("Error: " + err)
            process.kill()
        }
    })
}

async function webCat(url) {
    try {
        const resp = await axios.get(`${url}`) // old: axios.get(url)
        return resp.data
    } catch (err) {
        console.log("Error: " + err)
        process.kill()
    }

}