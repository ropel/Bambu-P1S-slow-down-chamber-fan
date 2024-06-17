const fs = require('fs');
const path = require('path');

// Initial Directory
const directoryPath = '.';

// Find text starting with "M106 P3 S" followed by a number greater than 0
const regex = /M106 P3 S([1-9][0-9]*)/g;

// Funzione per la sostituzione
function replaceWithHalf(match, p1) {
    const originalNumber = parseInt(p1, 10);
    const newNumber = Math.floor(originalNumber / 2);
    return `M106 P3  S${newNumber}`; // one more space between P3 and S, so multiple executions will not harm
}

// Recursively scanning directories
function processDirectory(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach((file) => {
            const filePath = path.join(dirPath, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    return console.log('Error reading file stats: ' + err);
                }

                if (stats.isDirectory()) {
                    processDirectory(filePath);
                } else if (stats.isFile() && path.extname(file) === '.json') {
                    // If this is a json file, read and change the content
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            return console.log('Error reading file: ' + err);
                        }

                        // Replace the text with the new one
                        const newData = data.replace(regex, replaceWithHalf);

                        // write the new content to the file
                        fs.writeFile(filePath, newData, 'utf8', (err) => {
                            if (err) return console.log('Error writing file: ' + err);
                            console.log('File updated: ' + filePath);
                        });
                    });
                }
            });
        });
    });
}

// Start the process from the main directory
processDirectory(directoryPath);
