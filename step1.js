const fs = require("fs")

/* write a function, cat.

It should take one argument, path, and it should read the file with that path, and print the contents of that file.

Then, write some code that calls that function, allowing you to specify the path argument via the command line. */

function cat(path) {
    fs.readFile(`${path}`, "utf8", (err, data) => {
        if (err) {
            console.log("Error: " + err)
            process.kill()
        }
        console.log(data)
    })
}

const args = process.argv

for (let i = 2; i < args.length; i++) {
    cat(args[i])
}