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
    program
        .option('-i, --input <path>')
        .option('-o, --output <path>')
        .option('-d, --display')
        .option('-h, --humidity')
        .option('-r, --rainfall <value>');

    program.parse(process.argv);
    const options = program.opts();

    if (!options.input) {
        console.error('Please, specify input file.');
        process.exit(1);
    }

    let result = JSON.parse(readInputFile(options.input));

    if (options.rainfall) {
        const minRainfall = parseFloat(options.rainfall);
        result = result.filter(item => parseFloat(item.Rainfall) > minRainfall);
    }

    result = result.map(item => {
        const rainfall = item.Rainfall ? item.Rainfall : '';
        const pressure = item.Pressure3pm ? item.Pressure3pm : '';
        
        let line = `${rainfall} ${pressure}`;

        if (options.humidity && item.Humidity3pm) {
            line += ` ${item.Humidity3pm}`;
        }

        return line.trim();
    }).join('\n');

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