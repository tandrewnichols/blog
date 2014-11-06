[![Build Status](https://travis-ci.org/tandrewnichols/grunt-simple-istanbul.png)](https://travis-ci.org/tandrewnichols/grunt-simple-istanbul) [![downloads](http://img.shields.io/npm/dm/grunt-simple-istanbul.svg)](https://npmjs.org/package/grunt-simple-istanbul) [![npm](http://img.shields.io/npm/v/grunt-simple-istanbul.svg)](https://npmjs.org/package/grunt-simple-istanbul) [![Code Climate](https://codeclimate.com/github/tandrewnichols/grunt-simple-istanbul/badges/gpa.svg)](https://codeclimate.com/github/tandrewnichols/grunt-simple-istanbul) [![Test Coverage](https://codeclimate.com/github/tandrewnichols/grunt-simple-istanbul/badges/coverage.svg)](https://codeclimate.com/github/tandrewnichols/grunt-simple-istanbul) [![dependencies](https://david-dm.org/tandrewnichols/grunt-simple-istanbul.png)](https://david-dm.org/tandrewnichols/grunt-simple-istanbul)

[![NPM info](https://nodei.co/npm/grunt-simple-istanbul.png?downloads=true)](https://nodei.co/npm/grunt-simple-istanbul.png?downloads=true)

# grunt-simple-istanbul

A grunt wrapper for istanbul

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-simple-istanbul --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with:

```javascript
grunt.loadNpmTasks('grunt-simple-istanbul');
```

Alternatively, install and use [task-master](https://github.com/tandrewnichols/task-master), and it will handle this (and a lot more!) for you.

## The "istanbul" task

This module uses the [simple-cli](https://github.com/tandrewnichols/simple-cli) library to create a simple wrapper around [istanbul](https://github.com/gotwarlost/istanbul).

### Overview

The `istanbul` task is a multiTask, where the target is (usually) the istanbul command to run. You can configure as many istanbul commands as are useful to you either in your `grunt.initConfig` call or, as mentioned above, by using [task-master](https://github.com/tandrewnichols/task-master). I strongly recommend using task-master . . . not just because I wrote it. I wrote it because grunt configuration is messy and annoying and sometimes, at least with `loadNpmTasks`, redundant (I was shocked to learn that you can't pass more than one string to `loadNpmTasks` - it's plural . . . doesn't that mean I should be able to do `grunt.loadNpmTasks('grunt-foo', 'grunt-bar', 'grunt-baz')`? . . . apparently not). I've been using task-master for everything I write now for a few months, and it just makes grunt more pleasurable to use. Things are nicely separated . . . but I digress. Here's a sample configuration:

```javascript
grunt.initConfig({
  istanbul: {
    instrument: {
      options: {
        output: 'instrumented',
        x: ['**/node_modules/**', '**/coverage/**', '**/instrumented/**'],
        noCompact: true
      },
      cmd: 'instrument app'
    }
  }
});
```

### Options

Any istanbul option can be specified, though there are some variations. See [simple-cli](https://github.com/tandrewnichols/simple-cli) for documentation on how to pass options.
