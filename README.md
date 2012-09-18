clients.lxxl.authoring
======================

Authoring environment for lxxl.

How to build
----------------------

Git clone the repository.

Then install puke in order to build (https://github.com/webitup/puke) - `pip install puke`

Edit the puke-yak.yaml file to fit your mileage if you want.


How to contribute
----------------------

Fork the project in github, then get a local copy of it.

Make your changes.

Verify that it pukes right: `puke all`.

Likely, it won't puke right, because of some syntactic validation failure.

So, fix (some of) the typos: `puke flint`

Then verify things are ok: `puke lint`

Lint will tell you what's wrong. Fix it, lint again.

Commit and push.

Then ask for a pull request.


Files at the root
----------------------

The only file you may edit is the puke-yak.yaml build descriptor, in case you want to customize the build output directory.

To do so, create a node with your (unix) username and os name (`uname`), and document DEPLOY_ROOT:

```
user-YOUR_NAME-box-YOUR_OS:
    DEPLOY_ROOT: '/some-directory'
```

Unless you know "puke" well, there is little to no reason why you should hack any other file at the root.

The src/bootstrap folder
----------------------

Contains the html shell along with very basic style and waiting logo, meant to be visible only:

- while the application boots-up
- if the user doesn't have javascript enabled

You may edit at will any of the following files in that folder, namely:

- index.html - the html shell itself
- miniboot.ico - the app favicon
- miniboot.css - the basic styles

Though, you should NOT edit miniboot.js unless you have very good reasons, nor should you add too much in there.
These are placeholders files, and should have almost zero intelligence.

The libs folder
----------------------

Contains third-party dependencies. There is no reason to change these.

The lxxllib folder
----------------------

Contains the *generic* lxxl library: the one that defines the data model and that is used when producing standalone activities, which provides APIs to display and manipulate activities.

Modifying it means you impact consumers.
You should think twice about it before doing that...


The src/assets/common folder
----------------------

... contains anything "visual" about the app.

If you want to modify an icon, a color, or the way something is rendered, dig there.

Note that we use sccs - but if you don't know what this is, just do plain regular css and this will work.

Also note that if some style doesn't appear to be there, then it's defined in a root library.
You shouldn't try to modify that library, but instead override the style using proper selector and !important combination.

Remember that the application style is always laoded after any other third-party defined style, making it easier to override.

Obviously, you may create any additional file you want in the common/css folder - it will be combined inside the app stylesheet.


The src/app/common folder
----------------------

If you want to edit something that is related to displayed text, you should edit the i18n.js file.

If you want to edit something related to display, the templates folder is for you.

Anything else in there requires that you understand basics of MVC and Emberjs.

- the helpers folder is ad-hoc, and just provide casual glue / helping snippets
- the root folder just contain the actual application bootstrapping process (pretty much loading the templates and initializing the app)
- the models folder provide Emberified versions of the LxxlLib objects
- the controllers folder provide abstraction on top of the models to be used in the editing interface
- the views folder provide... views
- the states folder define the application routing


About the "common" folders everywhere
----------------------

This is provisionnal, and is meant to specialize the application for desktop / mobile, by abstracting what is common to all devices.

About stuff that is NOT there
----------------------

This project is built on top of jsboot, which itself in turn depends on airstrip, spitfire, and the dependencies fetched from there.

If you REALLY think there is a problem in these, you may report a bug there - otherwise, it's probably just something you can override.

