/*
* @template : application/root
*/
  {{view view.navigationView}}

  <article id="content" role="main">
    <header id="content-header">
      <h1>{{pageTitle}}</h1>
    </header>

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
