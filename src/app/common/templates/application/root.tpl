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

    <!--[if lt IE 7]>
      <p class="alert alert-error" id="very-outdated-browser">
      <strong>
      Your browser is very outdated, and will likely not work well with our product. You really <a href="http://browsehappy.com/">should consider upgrading</a>, or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this product.
      </strong>
      </p>
    <![endif]-->

    <!--[if lt IE 9]>
      <p class="alert" id="outdated-browser">
      <button class="close" data-dismiss="alert">×</button>
      <strong>
      Your browser is outdated. We will try our best, but you <a href="http://browsehappy.com/">should consider upgrading</a>, or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this product.
      </strong>
      </p>
    <![endif]-->

    </section>

    <section id="breadcrumb">
      <a {{action showDashboard href="true"}} title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a>

      {{#each breadcrumbs}}
        <a {{bindAttr class="className"}}>{{displayName}}</a>
      {{/each}}
    </section>

    <section class="container-fluid" id="mainsection">
      {{outlet}}
    </section>

    <footer id="footer">
      <p>Copyright © 2011 LxxL - Education & Numérique. Tous droits réservés. | <a {{action showCnil href=true}}>Conditions générales &amp; Respect de la vie privée</a>.
    </footer>
  </article>

  {{view view.footerView}}


