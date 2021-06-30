/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

const path = require("path");
const prompts = require("./prompts");
const generators = require("./generators");

module.exports = {
    id: 'ext-miletus-app',
    name: 'TMS WEB Miletus Application',
    /**
     * @param {import('yeoman-generator')} generator
     * @param {Object} extensionConfig
     */
    prompting: async (generator, extensionConfig) => {
        //Get the default project path, which should be unique, based on the cwd and the base name for projects
        let dprojpath = generators.getUniqueName(process.cwd(), 'Project', 'dproj', true);

        //Set the default value for the prompt
        extensionConfig.projectname = path.basename(dprojpath);

        //Ask for the project name and git support
        await prompts.askForProjectName(generator, extensionConfig);
        await prompts.askForGit(generator, extensionConfig);

        //With the project name, set all values needed to expand templates
        generators.initializeExtensionConfig(path.join(process.cwd(),extensionConfig.projectname), extensionConfig);
        extensionConfig.formbaseclass = 'TMiletusForm';
    },

    /**
     * @param {import('yeoman-generator')} generator
     * @param {Object} extensionConfig
     */
    writing: (generator, extensionConfig) => {
        generator.fs.copy(generator.sourceRoot() + '/vscode', '.vscode');

        if (extensionConfig.gitInit) {
            generator.fs.copy(generator.sourceRoot() + '/gitignore', '.gitignore');
        }

        generator.fs.copyTpl(generator.sourceRoot() + '/Project.dproj', extensionConfig.projectdprojsource, extensionConfig);
        generator.fs.copyTpl(generator.sourceRoot() + '/Project.dpr', extensionConfig.projectsource, extensionConfig);
        generator.fs.copyTpl(generator.sourceRoot() + '/Project.html', extensionConfig.projecthtmlsource, extensionConfig);
        generator.fs.copyTpl(generator.sourceRoot() + '/Unit.pas', extensionConfig.unitsource, extensionConfig);
        generator.fs.copyTpl(generator.sourceRoot() + '/Unit.dfm', extensionConfig.dfmpathsource, extensionConfig);
        generator.fs.copyTpl(generator.sourceRoot() + '/Unit.html', extensionConfig.unithtmlname, extensionConfig);

        generator.fs.copyTpl(generator.sourceRoot() + '/MiletusLinux.png', 'MiletusLinux.png', extensionConfig);
        generator.fs.copyTpl(generator.sourceRoot() + '/MiletusMac.icns', 'MiletusMac.icns', extensionConfig);
        generator.fs.copyTpl(generator.sourceRoot() + '/MiletusWindows.ico', 'MiletusWindows.ico', extensionConfig);
    }
}
