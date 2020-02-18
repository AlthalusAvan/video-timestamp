const fs = require('fs');

const readline = require("readline");

const startTime = new Date();

console.log("Start time: " + startTime.toLocaleTimeString());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var timestamps = [];


function createTimestamps() {
    rl.question("Press enter to log a timestamp, or type \"exit\" when you're finished\n", (input) => {
        if(input === "exit") {
            rl.close();
        } else {
            rl.question("Enter your timestamp description\n", (answer) => {
                let timeSinceStart = new Date() - startTime;
    
                timestamps.push(msToHMS(timeSinceStart) + " - " + answer);

                createTimestamps();
            });
        }
    });
}

createTimestamps();

rl.on("close", () => {
    let currentDateTime = new Date();
    let timeSinceStart = currentDateTime - startTime;
    console.log("\nTotal stream time: " + msToHMS(timeSinceStart));
    
    let formattedDateTime = currentDateTime.getFullYear() + "-" + (currentDateTime.getMonth() + 1) + "-" + currentDateTime.getDate() + "-" + currentDateTime.getHours() + "-" + currentDateTime.getMinutes() + "-" + currentDateTime.getSeconds() 

    fs.writeFile(
        `./timestamps-${formattedDateTime}.txt`,
        timestamps.map(function(v){ return v }).join('\n'),
        function (err) { console.log(err ? 'Error :'+err : 'ok') }
   );

});

function msToHMS( ms ) {
    // 1- Convert to seconds:
    var seconds = ms / 1000;
    // 2- Extract hours:
    var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = Math.round(seconds % 60);
    return( pad(hours) + ":" + pad(minutes) + ":" + pad(seconds));
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}
