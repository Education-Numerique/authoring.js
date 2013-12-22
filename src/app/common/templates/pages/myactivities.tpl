/*
* @template : pages/myactivities
*/

<div class="row-fluid">
<!--
  [[#if view.activities.length]]
  <div class="alert alert-info">
    <a href="#" data-dismiss="alert" class="close">×</a>
    <h4 class="alert-heading">Mes activités</h4>
    Retrouvez ici toutes vos activités, publiées et non publiées.<br />
    Vous pouvez également, <a [[action showNewActivity href=true]]>créer une nouvelle activité.</a>
  </div>
  [[/if]]
-->
  {{#unless view.activities.length}}
  <div class="alert alert-info">
    <a href="#" data-dismiss="alert" class="close">×</a>
    <h4 class="alert-heading">Bienvenue dans votre environnement auteur</h4>
    Les deux tableaux contiennent vos activités publiées et vos brouillons.
    Pour l'instant, ils sont vides... 
    Pour créer votre première activité, cliquez sur le bouton VERT.<br />
    Relisez-vous bien avant de publier, il y va de votre renommée d'auteur ;)
  </div>
{{/unless}}

  <div class="widget-box">
    <div class="widget-title">
      <h5>Mes activités publiées</h5>
    </div>
    <div class="widget-content nopadding">
      <table class="mypublished table table-bordered data-table">
        <thead>
          <tr style="cursor: pointer; table-striped with-check">
            <th style="width: 10px;"></th>
            <th style="width: 10px;"></th>
            <th style="width: 10px;"></th>
            <th>Titre</th>
<!--            <th>Durée</th>-->
            <th>Difficulté</th>
            <th>Matière</th>
            <th>Niveau</th>
            <th>Date de publication</th>
<!--            <th>Nombre de vues</th>
            <th>Auteur</th>-->
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>  
    </div>
  </div>
  <!-- Can't do that because of concurrency with arrayObservers which kick in before this shit -->
  {{#if publishedActivities.length}}
  {{/if}}

  {{#if draftActivities.length}}
  {{/if}}

  <div class="row-fluid">
  </div>

  <div class="widget-box">
    <div class="widget-title">
      <h5 style="margin-top:-3px;">Mes activités non publiées</h5>
      <div style="margin-top:7px;"><a {{action showNewActivity href=true}} id='bug2' class="btn btn-success btn-mini"><i class="icon-plus icon-white spacify"></i>Créer une activité</a></div>
<!-- ???????????????????????????????????????????????????? -->
<!--          BUG ALERT                                   -->
<!-- ???????????????????????????????????????????????????? -->
      <script>
      $(document).on('click', '#bug2', function ()
      {
        alert("Bug: lorsque vous créez une nouvelle activité, la machine plante. Il suffit de rafraîchir la page (ctrl + r / pomme + r), et de  vous rendre dans vos activités pour continuer sans difficulté. Merci de votre indulgence !");
      });
      </script>
<!-- ??????????????????????????????????????????????????? -->

    </div>
    <div class="widget-content nopadding">
      <table class="mydrafts table table-bordered data-table">
        <thead>
          <tr style="cursor: pointer; table-striped with-check">
            <th style="width: 10px;"></th>
            <th style="width: 10px;"></th>
            <th style="width: 10px;"></th>
            <th>Titre</th>
<!--
            <th>Durée</th>
          -->
            <th>Difficulté</th>
            <th>Matière</th>
            <th>Niveau</th>
            <th>Date de création</th>
<!--            <th>Nombre de vues</th>
            <th>Auteur</th>-->
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>  
    </div>
  </div>

</div>

<div class="modal hide" id="modal-preview" role="dialog" aria-labelledby="modal-preview-label" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="modal-preview-label">Prévisualisation</h3>
  </div>
  <div class="modal-body">
    <p id="modal-preview-body"></p>
  </div>
</div>