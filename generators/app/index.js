/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
'use strict';

const Generator = require('yeoman-generator');
const yosay = require('yosay');

const path = require('path');

const webapp = require('./generate-web-app');
const consoleapp = require('./generate-console-app');
const electronapp = require('./generate-electron-app');
const pwaapp = require('./generate-pwa-app');
const packageapp = require('./generate-package-app');
const miletusapp = require('./generate-miletus-app');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.option('projectType', { type: String });
        this.option('projectname', { type: String });

        this.extensionConfig = Object.create(null);

        this.extensionGenerator = undefined;

        this.abort = false;
    }

    async initializing() {
        const cliArgs = this.options['_'];

        this.log(yosay('Welcome to the TMS WEB Core generator!'));
    }

    async prompting() {
        const tmsGenerators = [
            webapp, consoleapp, electronapp, pwaapp, packageapp, miletusapp
        ]

        // Ask for extension type
        const projectType = this.options['projectType'];
        if (projectType) {
            const projectTypeId = 'ext-' + projectType;
            if (tmsGenerators.find(g => g.id === projectTypeId)) {
                this.extensionConfig.type = projectTypeId;
            } else {
                this.log("Invalid project type: " + projectType + '\nPossible types are: ' + tmsGenerators.map(g => g.id.substr(4)).join(', '));
                this.abort = true;
            }
        } else {
            const choices = [];
            for (const g of tmsGenerators) {
                const name = this.extensionConfig.insiders ? g.insidersName : g.name;
                if (name) {
                    choices.push({ name, value: g.id })
                }
            }
            this.extensionConfig.type = (await this.prompt({
                type: 'list',
                name: 'type',
                message: 'What type of project do you want to create?',
                pageSize: choices.length,
                choices,
            })).type;

        }

        this.extensionGenerator = tmsGenerators.find(g => g.id === this.extensionConfig.type);
        try {
            await this.extensionGenerator.prompting(this, this.extensionConfig);
        } catch (e) {
            this.abort = true;
        }

    }
    // Write files
    writing() {
        if (this.abort) {
            return;
        }
        this.sourceRoot(path.join(__dirname, './templates/' + this.extensionConfig.type));

        return this.extensionGenerator.writing(this, this.extensionConfig);
    }

    // Installation
    install() {
        if (this.abort) {
            return;
        }
    }

    // End
    end() {
        if (this.abort) {
            return;
        }

        // Git init
        if (this.extensionConfig.gitInit) {
            this.spawnCommand('git', ['init', '--quiet']);
        }

        this.log('');

        this.log('Your project ' + this.extensionConfig.projectname + ' has been created!');
        this.log('');
        this.log('To start editing with Visual Studio Code, use the following commands:');
        this.log('');
        this.log('     cd ' + this.extensionConfig.dirname);
        this.log('     code .');
        this.log('');

        this.log('');

        if (this.extensionGenerator.endMessage) {
            this.extensionGenerator.endMessage(this, this.extensionConfig);
        }

    }
}
