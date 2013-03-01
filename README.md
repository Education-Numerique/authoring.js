clients.lxxl.authoring
======================

Authoring environment for lxxl.

If you want to contribute...
----------------------

You need to be familiar with:
- git, and github
- good javascript level at the very least
- knowledge of jquery and bootstrap are mandatory
- notions about handlebars and Ember.js

How to build your own
----------------------

Git clone the repository: git clone git@github.com:Éducation-Numerique/authoring.js.git

Install puke in order to build `pip install puke` (you need python obviously, along with pip, which probably means you need brew under osx - more about puke: https://github.com/webitup/puke)

Edit the config.yaml file to fit your mileage (read the file and inline comments, and copy an existing custom node).


How to deploy
----------------------

Serve the build directory with any http webserver, under the chosen domain name you used in your config.yaml.


How to contribute
----------------------

Fork the project in github, then get a local copy of it.

Make your changes.

Verify that it pukes right: `puke all`.

Likely, it won't puke right, because of your code is sloppy.

So, fix your typos: `puke flint`

Then verify things are ok: `puke lint;`

Then run `puke hint` for static audit.

Hint will tell you what's wrong. Fix. Repeat until everything is ok.

Commit and push.

Then ask for a pull request.


Files at the root
----------------------

The only file you may edit is the config.yaml build descriptor, in case you want to customize the build output directory.

To do so, create a node with your (unix) username and lowercase os name (`uname`), and document:

```
config-YOUR_NAME-YOUR_OS:
    paths:
      deploy: '/some-directory'
```

Unless you know "puke" well, there is little to no reason why you should hack any other file at the root.


The src/miniboot folder
----------------------

Contains the html shell along with very basic style and waiting logo, meant to be visible only:

- while the application boots-up
- if the user doesn't have javascript enabled
- if the user have an unsupported browser

You may edit at will any of the following files in that folder, namely:

- index.html - the html shell itself
- miniboot.ico - the app favicon
- miniboot.png - the placeholder while the app boots-up

Though, you should NOT edit miniboot.js unless you have good reasons, nor should you add too much in there.
These are placeholders files, and should have almost zero intelligence.


The libs folder
----------------------

Contains third-party dependencies. There is no reason to change any of these.


The lxxl folder
----------------------

Contains the *generic* lxxl library: the one that defines the data model and that is used when producing standalone activities, which provides APIs to display and manipulate activities.

Modifying it means you impact consumers.
You should think twice about it before doing that... but the model is defined there.


The src/assets/common folder
----------------------

... contains anything "visual" about the app.

If you want to modify an icon, a color, or the way something is rendered, dig there.

Note that we use sccs - but if you don't know what this is, just do plain regular css and this will work.

Also note that if some style doesn't appear to be there, then it's defined in a root library.
You shouldn't try to modify that library, but instead override the style using proper selector and !important combination.

Remember that the application style is always laoded after any other third-party defined style, making it easier to override.

Obviously, you may create any additional file you want in the common/css folder - it will be combined inside the app stylesheet.

If you want to quick change something, use zcustomization.css for that.


The src/app/common folder
----------------------

If you want to edit something that is related to displayed text, you may edit the i18n.js file, or any of the templates.

If you want to edit something related to display, the templates folder is for you.

Anything else in there requires that you understand basics of MVC frameworks, and probably some of Emberjs, Handlebars and jQuery.

- the helpers folder is ad-hoc, and just provide casual glue / helping snippets
- the root folder just contain the actual application bootstrapping process (pretty much loading the templates and initializing the app)
- the models folder provide some Emberified / reprocessed versions of the LxxlLib objects
- the controllers folder provide abstraction on top of the models to be used in the editing interface
- the views folder provide... views
- the states folder define the application routing - this is where you should hook if you want a new url endpoint, or edit an existing one


About the "common" folders everywhere
----------------------

This is provisionnal, and is meant to specialize the application for desktop / mobile, by abstracting what is common to all devices.



About stuff that is NOT there
----------------------

This project is built on top of jsboot, which itself in turn depends on airstrip, spitfire, and the dependencies fetched from there.

If you REALLY think there is a problem in these, you may report a bug there - otherwise, it's probably just something you can override.

Note that these dependencies are served from the production server (or development server), along with the service API (see config.yaml for detailed
url if you want to change that, and see the separate projects configurations informations if you want to go there).


About dependencies
----------------------

The project relies heavily on:
- jsBoot (https://github.com/jsBoot/jsboot.js), a mini-framework providing an API to ease dependencies loading (said dependencies being provided via airstrip.js https://github.com/jsBoot/airstrip.js), allow for easy shiming (shims being provided by underlying spitfire.js https://github.com/jsBoot/spitfire.js), a package / class manager, and a few helpers and basic types (eg: EventDispatcher, md5 and such) and a service loader component meant to be use with a jsBoot compatible stack (see service part of the project)
- jQuery
- I18n js - used anecdotically
- Bootstrap, a client-side mini framework providing behaviors and basic styles
- Handlebars, a template engine 
- EmberJS (http://emberjs.com/), a MVC framework relying on jQuery and Handlebars

All of these are packaged and maintained into the official jsBoot stack.

To a lesser extent, the project makes use of the following, also hidden by the jsBoot stack:
- LABjs
- ie7.js
- normalize
- h5bp (style only)
- stacktrace
- es5shim
- XMLHttpRequest.js

As a tier-2, the following jsBoot components are explicitely requested:
- chosen
- validate
- uniform
- datatable

The following components are used only is the project, and loaded directly (from the lib folder):
- jQueryUI
- unicorn, a bootstrap stylesheet customization
- redactor, a wysiwyg component
- mathjax
- jquery.wizard

And to a lesser use:
- jquery.flot
- jquery.flot.pie
- jquery.file-upload


All of these (but redactor) are free to use components released under open-source AGPL compatible licenses.