var fs = require('fs');
var sax = require('./sax');
parser = sax.parser(true);

try {
    var file_buf = fs.readFileSync('prueba.xml');
    parser.write(file_buf.toString('utf8'));
    parser.write('<xml>Hello, <who name="world">world</who>!</xml>').close();

} catch(ex) {
    console.log('error');
}




