
type singleLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'
    | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X'
    | 'Y' | 'Z';
export type GCode = {
    gcode: string,
    params: { [key in singleLetter]?: number }
};

export function parseGcode(src: string) {
    let lines = src.split('\n');
    let commands: GCode[] = [];
    for (let l of lines) {

        // Normalize the line
        l = l.trim().replace(/\s/g, ''); // Remove spaces and tabs
        l = l.replace(/\s*\([^\)]*\)/g, ''); // Remove anything inside the parentheses
        l = l.replace(/\s*;.*/g, ''); // Remove anything after a semi-colon to the end of the line, including preceding spaces
        if (l.length === 0) continue;

        // Parse words
        const re = /(%.*)|({.*)|((?:\$\$)|(?:\$[a-zA-Z0-9#]*))|([a-zA-Z][0-9\+\-\.]+)|(\*[0-9]+)/igm;
        const words = l.match(re) || [];
        if (words.length === 0) continue; // Skip empty lines

        // Parse the command
        let gcode = words[0]!;

        // Parse the parameters
        let params: { [key in singleLetter]?: number } = {};
        for (let i = 1; i < words.length; i++) {
            let word = words[i]!;
            let letter = word[0]!.toUpperCase() as singleLetter;
            let value = parseFloat(word.substr(1));
            params[letter] = value;
        }

        // Add the command
        commands.push({ gcode, params });
    }

    return commands;
}