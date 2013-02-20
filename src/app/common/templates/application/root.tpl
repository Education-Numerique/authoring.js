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
      <p>{{localize copyright}}<a {{action showCharte href=true}}>{{localize conditions}}</a>.
    </footer>
  </article>

  <div class="modal hide" id="already-locked" role="dialog" aria-hidden="true">
    <div class="modal-header">
      <h3>Application déjà utilisée</h3>
    </div>
    <div class="modal-body">
      L'application est déjà ouverte dans un autre onglet.<br />
      Veuillez fermer l'un des deux avant de poursuivre.
    </div>
  </div>


  {{view view.footerView}}
