var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
const { dirname } = require('path');

var manifest = {
    packageUrl: 'https://3335509.com/hotupdate/',
    remoteManifestUrl: 'https://3335509.com/hotupdate/project.manifest',
    remoteVersionUrl: 'https://3335509.com/hotupdate/version.manifest',
    version: '1.0.21',
    assets: {},
    searchPaths: []
};

var dest = './remote-assets/';
var src = './jsb/';

// Parse arguments
var i = 2;
while (i < process.argv.length) {
    var arg = process.argv[i];

    switch (arg) {
        case '--url':
        case '-u':
            var url = process.argv[i + 1];
            manifest.packageUrl = url;
            manifest.remoteManifestUrl = url + 'project.manifest';
            manifest.remoteVersionUrl = url + 'version.manifest';
            i += 2;
            break;
        case '--version':
        case '-v':
            manifest.version = process.argv[i + 1];
            i += 2;
            break;
        case '--src':
        case '-s':
            src = process.argv[i + 1];
            i += 2;
            break;
        case '--dest':
        case '-d':
            dest = process.argv[i + 1];
            i += 2;
            break;
        default:
            i++;
            break;
    }
}


function readDir(dir, obj) {
    var stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = fs.readdirSync(dir),
        subpath, size, md5, compressed, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = path.join(dir, subpaths[i]);
        stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            readDir(subpath, obj);
        } else if (stat.isFile()) {
            // Size in Bytes
            size = stat['size'];
            md5 = crypto.createHash('md5').update(fs.readFileSync(subpath)).digest('hex');
            compressed = path.extname(subpath).toLowerCase() === '.zip';

            relative = path.relative(src, subpath);
            relative = relative.replace(/\\/g, '/');
            relative = encodeURI(relative);
            obj[relative] = {
                'size': size,
                'md5': md5
            };
            if (compressed) {
                obj[relative].compressed = true;
            }
        }
    }
}

// var mkdirSync = function (path) {
//     try {
//         fs.mkdirSync(path);
//     } catch(e) {
//         if ( e.code != 'EEXIST' ) throw e;
//     }
// }

var mkdirSync = function(pathname) {
    try {
        if (fs.existsSync(pathname)) {
            console.log("#########.......  ", pathname, "  exist  ")
            return true
        } else {
            console.log("########.......  pathname11 ", path.dirname(pathname))
            if (mkdirSync(path.dirname(pathname))) {
                console.log("########.......  pathname ", pathname)
                fs.mkdirSync(pathname)
                return true
            }
        }
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
}


// Iterate res and src folder
readDir(path.join(src, 'src'), manifest.assets);
readDir(path.join(src, 'assets'), manifest.assets);

var destManifest = path.join(dest, 'project.manifest');
var destVersion = path.join(dest, 'version.manifest');

console.log("##########........  dest   ", dest)
mkdirSync(dest);

fs.writeFile(destManifest, JSON.stringify(manifest), (err) => {
    if (err) throw err;
    console.log('Manifest successfully generated');
});

delete manifest.assets;
delete manifest.searchPaths;
fs.writeFile(destVersion, JSON.stringify(manifest), (err) => {
    if (err) throw err;
    console.log('Version successfully generated');
});