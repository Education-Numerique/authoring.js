/*
* @template : application/root
*/
  {{view view.navigationView}}

  <article id="content" role="main">
    <header id="content-header">
      <h1>{{pageTitle}}</h1>
    </header>

    <section class="container-fluid" id="mainsection">
      <div id="already-locked" class="alert error hide">
       <a class="close" data-dismiss="alert" href="#">&times;</a>
        L'application est déjà ouverte dans un autre onglet.<br />
        Si vous modifiez une activité simultanément dans les deux onglets, des problèmes vont apparaitre...<br />
        Il est conseillé de fermer l'un des deux onglets.
     </div>

      {{outlet}}
    </section>

    <footer id="footer">
      <p>{{localize copyright}}
        <a href="http://www.education-et-numerique.org/cgu/" target="_blank">{{localize conditions}}</a>
      </p>
    </footer>
   </article>

    <div class="modal-footer">
    </div>
  </div>
  {{view view.footerView}}
