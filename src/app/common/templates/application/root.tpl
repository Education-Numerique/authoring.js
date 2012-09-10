/*
* @template : application/root
*/
  {{view view.headerView}}

  <article id="content" role="main">
    <header id="content-header">
      <h1>Stuff</h1>
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
      <a href="#" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a>
      <a href="#" class="">Dashboard</a>
      <a href="#" class="current">Toto</a>
    </section>

    <section class="container-fluid">
      <div>main content</div>
    </section>

    <footer id="footer">
      <p>Lxxl, author environment, copyright 2012 E&amp;N</p>
    </footer>
  </article>

<!--
  <article role="main">
    <script type="text/x-handlebars" data-template-name="say-hello">
      <h1>Hello world!{{name}}</h1>
    </script>

    <h1>Class Index</h1>
    <for each="thisClass" in="data">
    <section>
        <h2>{+(new Link().toSymbol(thisClass.alias))+}</h2>
      <details>
          <summary>
            {+resolveLinks(summarize(thisClass.classDesc))+}
          </summary>
        <p>{+resolveLinks(thisClass.classDesc)+}</p>
      </details>
    </section>
    </for>
  </article>
-->
  {{view view.footerView}}
