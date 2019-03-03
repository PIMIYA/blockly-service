try {
    const path = require('path');
    const fs = require('fs');
    const glob = require('glob');

    function copyTo(srcDir, destDir) {
        let files = glob.sync(`${srcDir}/**/*.js`, {
            ignore: ['**/node_modules/**/*']
        });
        files.forEach(fileName => {
            let relativePath = path.normalize(fileName).replace(srcDir, '');
            // console.log(relativePath);
            let destPath = path.join(destDir, relativePath);
            fs.mkdir(path.dirname(destPath), {
                recursive: true
            }, (err) => {
                if (err) throw err;

                fs.copyFileSync(fileName, destPath, fs.constants.COPYFILE_FICLONE);
            });

        });
    }

    let _srcDir = path.join(__dirname, 'common');
    let _destDirs = [
        path.join(__dirname, 'led-server', 'common'),
        path.join(__dirname, 'led-node', 'common')
    ]

    _destDirs.forEach(dir => {
        copyTo(_srcDir, dir);
    });

} catch (error) {
    console.error(error);
}
