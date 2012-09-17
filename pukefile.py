#!/usr/bin/env puke
# -*- coding: utf8 -*-


global PH
import pukehelpers as PH

@task("Default task")
def default():
  Cache.clean()
  executeTask("build")
  executeTask("deploy")

@task("All")
def all():
  Cache.clean()
  executeTask("lint")
  executeTask("build")
  executeTask("mint")
  executeTask("deploy")
  executeTask("stats")

@task("Deploy package")
def deploy():
  PH.deployer(False)

@task("Lint")
def lint():
  PH.linter("src/app")
  PH.linter("src/assets")
  PH.linter("src/bootstrap")

@task("Flint")
def flint():
  PH.flinter("src/app")
  PH.flinter("src/assets")
  PH.flinter("src/bootstrap")

@task("Minting")
def mint():
  PH.minter(Yak.BUILD_ROOT)

@task("Stats report deploy")
def stats():
  # PH.stater(Yak.DOC_ROOT)
  PH.stater(Yak.BUILD_ROOT)

@task("Building the taupe!")
def build():
  istrunk = Yak.VARIANT == 'bleed'
  sed = Sed()
  PH.replacer(sed)

  # ================================
  # Modeling as an Ember application
  # ================================

  # ================================
  # Bootstrap
  # ================================
  VERSIONED_ROOT = FileSystem.join(Yak.BUILD_ROOT, Yak.PACKAGE['VERSION']);

  # First, merge in bootstraps
  js = FileList("src/bootstrap/common/" , filter="*.js")
  # js.merge(FileList("src/bootstrap/desktop/", filter = "*.js"))

  css = FileList("src/bootstrap/common/" , filter="*.css,*.scss")
  # css.merge(FileList("src/bootstrap/desktop/", filter = "*.css,*.scss"))

  # Now generate min and non min version

  sed.add('{PUKE-BOOT-ROOT}', Yak.PACKAGE['VERSION'])

  copyfile("src/bootstrap/favicon.ico", Yak.BUILD_ROOT + "/miniboot.ico")
  copyfile("src/bootstrap/miniboot.png", Yak.BUILD_ROOT + "/miniboot.png")

  bootman = PH.getmanifest('jsboot', '0.1', usemin = True)
  sed.add('{SPIT-JSBOOT}', bootman['jsbootstrap'])
  sed.add('{SPIT-CSSBOOT}', bootman['cssbootstrap'])

  sed.add('{MIN}', '-min')
  combine(js, Yak.BUILD_ROOT + "/miniboot-min.js", replace=sed)
  combine(css, Yak.BUILD_ROOT + "/miniboot-min.css", replace=sed)

  combine('src/index.html', Yak.BUILD_ROOT + '/index.html', replace=sed)

  bootman = PH.getmanifest('jsboot', '0.1', False)
  sed.add('{SPIT-JSBOOT}', bootman['jsbootstrap'])
  sed.add('{SPIT-CSSBOOT}', bootman['cssbootstrap'])

  sed.add('{MIN}', '')
  combine(js, Yak.BUILD_ROOT + "/miniboot.js", replace=sed)
  combine(css, Yak.BUILD_ROOT + "/miniboot.css", replace=sed)

  combine('src/index.html', Yak.BUILD_ROOT + '/index-full.html', replace=sed)


  # XXX
  combine('src/test.jqz', Yak.BUILD_ROOT + '/test.jqz', replace=sed)



  # ================================
  # Helpers libraries
  # ================================
  helpers = FileList('src', filter = '*libs*')
  deepcopy(helpers, Yak.BUILD_ROOT);

  # ================================
  # Versioned part of the app
  # ================================

  #js application
  js = FileList("src/app/common/", filter = "*i18n.js,*unicorn.js,*app.js")
  js.merge(FileList("src/app/common/states", filter = "*.js"))
  js.merge(FileList("src/app/common/models", filter = "*.js"))
  js.merge(FileList("src/app/common/controllers", filter = "*.js"))
  js.merge(FileList("src/app/common/views", filter = "*.js"))
  # js.merge(FileList("src/app/desktop/", filter = "*app.js"))
  # js.merge(FileList("src/app/desktop/states", filter = "*.js"))
  # js.merge(FileList("src/app/desktop/models", filter = "*.js"))
  # js.merge(FileList("src/app/desktop/controllers", filter = "*.js"))
  # js.merge(FileList("src/app/desktop/views", filter = "*.js"))

  combine(js, VERSIONED_ROOT + "/lxxl.js", replace=sed)

  # js.merge(FileList("src/app/desktop/", filter = "*routing.js"))
  # js.merge(FileList("src/app/desktop/", filter = "*hotkeys.js"))
  # js.merge(FileList("src/app/desktop/model/", filter = "*.js"))
  # js.merge(FileList("src/app/desktop/views/", filter = "*.js"))
  # js.merge(FileList("src/app/desktop/states/", filter = "*.js"))


  # css application
  css = FileList("src/assets/common/css", filter = "*.css,*.scss")
  # css.merge(FileList("src/assets/desktop/css", filter = "*.css,*.scss"))
  combine(css, VERSIONED_ROOT + "/lxxl.css", replace=sed)

  # fonts copy
  # fonts = FileList("src/assets/common/fonts/")
  # fonts.merge(FileList("src/assets/desktop/fonts/"))
  # deepcopy(fonts, VERSIONED_ROOT + '/fonts/')

  # images copy
  images = FileList('src/assets/common/images', filter = "*.jpg,*.png,*.gif,*.ico")
  # images.merge(FileList('src/assets/desktop/images', filter = "*.jpg,*.png,*.gif,*.ico"))
  deepcopy(images, VERSIONED_ROOT + "/images/")

  # templates merge
  templates = FileList('src/app/common/templates', filter = "*.tpl")
  # templates.merge(FileList("src/app/desktop/templates/", filter = "*.tpl"))
  combine(templates, VERSIONED_ROOT +  "/lxxl.tpl")



