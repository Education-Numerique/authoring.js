/*
* @template : application/root
*/
  {{view view.navigationView}}

  <article id="content" role="main">
    <header id="content-header">
      <h1>{{pageTitle}}</h1>
    </header>

    <!-- Kick out old crap... -->
    <section style="text-align: center;" class="row-fluid">

    <div class="alert alert-success">{{localize welcome}}<a href="#" data-dismiss="alert" class="close">×</a></div>

    <!--[if lt IE 9]>
      <p class="alert alert-error" id="very-outdated-browser">
      <strong>
      Votre navigateur est obsolète, et ne marche pas du tout avec notre produit. Vous devriez <a href="http://browsehappy.com/">vraiment le mettre à jour.</a>, ou <a href="//www.google.com/chromeframe/?redirect=true">installer Google Chrome Frame</a>.
      </strong>
      </p>
    <![endif]-->

    <p class="alert alert-error unsupported-browser">
    <button class="close" data-dismiss="alert">×</button>
    <strong>
    Votre navigateur n'est peut-être pas pris en charge...<br/> <a href="https://www.google.com/intl/fr/chrome/browser/?hl=fr">Google Chrome</a> est le seul navigateur officiellement supporté dans le cadre de ce prototype.<br/>
    Firefox ESR, les derniers Safari et Opera devraient fonctionner correctement cependant.<br />
    Pour tout autre navigateur, certaines fonctionnalités peuvent ne pas être opérationnelles, ou le produit pourrait ne pas fonctionner du tout...
    </strong>
    </p>


    </section>

    <section id="breadcrumb">
      <a {{action showActions href="true"}}><i class="icon-home"></i> {{localize breadHome}}</a>

      {{#each breadcrumbs}}
        <a {{bindAttr class="className"}}>{{displayName}}</a>
      {{/each}}
    </section>

    <section class="container-fluid" id="mainsection">
      {{outlet}}
    </section>

    <footer id="footer">
      <p>{{localize copyright}}<a {{action showCnil href=true}}>{{localize conditions}}</a>.
    </footer>
  </article>

  {{view view.footerView}}
