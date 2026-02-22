const {program} = require('commander');
const fs = require('fs');

function readInputFile(file) {
    try {
        return fs.readFileSync(file, 'utf-8');
    } catch {
        console.error('Cannot find input file.');
        process.exit(1);
    }
}

function main() {
    program.option('-i, --input <path>').option('-o, --output <path>').option('-d, --display');
    program.parse(process.argv);
    const options = program.opts();

    if (!options.input) {
        console.error('Please, specify input file.');
        process.exit(1);
    }

    const result = JSON.parse(readInputFile(options.input));

    if (options.display) {
        console.log(result);
    }

    try {
        if (options.output){
            fs.writeFileSync(options.output, JSON.stringify(result));
        }
    } catch {
        console.error('Cannot find output file.');
        process.exit(1);
    }
}

main();