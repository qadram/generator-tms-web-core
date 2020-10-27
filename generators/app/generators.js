const path = require("path");
const fs = require("fs");

/**
 * Returns a file name that is meant to be unique on the base path
 * @param basepath Folder where to look for
 * @param basename Base name of the file to get the unique name (i.e. Project)
 * @param extension Extension of the file
 * @param iterate Iterates looking for a free file name, or simple tries to return the name
 */
module.exports.getUniqueName = function (basepath, basename, extension, iterate = true) {
    let filename = '';
    //If not iterate, then let's see if we can use that filename because it doesn't exists
    if (!iterate) {
        filename = path.join(basepath, basename + '.' + extension);
        if (!fs.existsSync(filename)) {
            return (filename);
        }
    }

    let i = 1;
    filename = path.join(basepath, basename + i + '.' + extension);
    while (fs.existsSync(filename)) {
        i++;
        filename = path.join(basepath, basename + i + '.' + extension);
    }
    return (filename);
}

module.exports.initializeExtensionConfig = function (filepath, extensionConfig) {
    extensionConfig.dirname = path.dirname(filepath);
    extensionConfig.projectbasename = path.basename(filepath, '.dproj');
    let iterate = false;
    extensionConfig.unitpath = this.getUniqueName(extensionConfig.dirname, 'Unit', 'pas');
    extensionConfig.unitname = path.basename(extensionConfig.unitpath, '.pas');
    extensionConfig.unitsource = path.basename(extensionConfig.unitpath);
    extensionConfig.formname = 'Form1';
    extensionConfig.formbaseclass = 'TWebForm';
    extensionConfig.formclass = 'TForm1';
    extensionConfig.dfmpath = this.getUniqueName(extensionConfig.dirname, 'Unit', 'dfm');
    extensionConfig.dfmpathsource = path.basename(extensionConfig.dfmpath)
    extensionConfig.unithtml = this.getUniqueName(extensionConfig.dirname, 'Unit', 'html');
    extensionConfig.unithtmlname = path.basename(extensionConfig.unithtml)
    extensionConfig.unithtmlsource = path.basename(extensionConfig.unithtml, '.html');
    if (extensionConfig.unithtmlsource.toLowerCase() === extensionConfig.unitname.toLowerCase()) {
        extensionConfig.unithtmlsource = '*.html';
    }
    else {
        extensionConfig.unithtmlsource = extensionConfig.unithtmlsource + '.html';
    }
    extensionConfig.projectdproj = this.getUniqueName(extensionConfig.dirname, extensionConfig.projectbasename, 'dproj', iterate);
    extensionConfig.projectdprojsource = path.basename(extensionConfig.projectdproj)
    extensionConfig.projectdpr = this.getUniqueName(extensionConfig.dirname, extensionConfig.projectbasename, 'dpr', iterate);
    extensionConfig.projectname = path.basename(extensionConfig.projectdpr, '.dpr');
    extensionConfig.projectsource = path.basename(extensionConfig.projectdpr);
    extensionConfig.projecthtml = this.getUniqueName(extensionConfig.dirname, extensionConfig.projectbasename, 'html', iterate);
    extensionConfig.projecthtmlsource = path.basename(extensionConfig.projecthtml);
}