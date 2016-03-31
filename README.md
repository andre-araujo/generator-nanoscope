# generator-nanoscope

Generator for **nanoscope** framework, it scaffolds a project based on atomic design, using jade, sass, and harpjs

## Setup a new project
Make sure that you have yeoman installed
```
yo nanoscope <appName>
```

## Folder structure

```

/src
    /_modules
        /_atoms
            /_atom-name
                _index.jade
                _main.sass
        /_molecules
            /_molecule-name
                _index.jade
                _main.sass
        /_organisms
            /_organism-name
                _index.jade
                _main.sass
        _index.jade
        _main.sass
    /assets
        /fonts
        /img
        /scripts
            app.js
        /styles
            /_globals
                _main.sass
            main.sass
        /vendor
    _data.json
    _layout.jade
    index.jade
package.json
gulp.config.js
gulpfile.js
.bowerrc
.gitignore

```

## Subgenerators

###### yo nanoscope:module <moduleName>
create a module that can be an atom, molecule or organism
