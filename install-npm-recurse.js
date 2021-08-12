
var fs = require('fs')
var resolve = require('path').resolve
var join = require('path').join
var cp = require('child_process')
var os = require('os')

getChildren = (lib) => {
    //console.log(lib);
    const entries = fs.readdirSync(lib, { withFileTypes: true});

    const files = entries.filter(file => !file.isDirectory())
                          .filter(file => file.name.startsWith('package.json'))

    const folders = entries.filter(folder => folder.isDirectory())
                            .filter(folder => !folder.name.startsWith('.'))
                            .filter(folder => !folder.name.startsWith('node_modules'))

    files.forEach(() => {
     // console.log('installing inside ' + lib );

      var npmCmd = 'cd ' + lib + ' && npm install';
      console.log(npmCmd);
      cp.exec(npmCmd);

    })

    folders.forEach((folder) => {
      var path = join(lib, folder.name)
      // console.log('calling with ' + path)
      getChildren(path);
    })

        // npm binary based on OS
      
        // install folder
       // cp.spawn(npmCmd, ['i'], { env: process.env, cwd: modPath, stdio: 'inherit' });

  
};

// get library path
var lib = resolve(__dirname, './All/')

getChildren(lib);

console.log("finished.")