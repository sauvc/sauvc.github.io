var l = process.argv.slice(2)[0];
let code = l.slice(0,2);
let flg = code.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397) );
console.log(flg);