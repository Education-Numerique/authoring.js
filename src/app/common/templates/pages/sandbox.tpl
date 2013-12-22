/*
* @template : pages/sandbox
*/

<div class="row-fluid">
<!-- Keep for later use !!! -->
<!--
  <div class="alert alert-info">
    <a href="#" data-dismiss="alert" class="close">×</a>
    <h4 class="alert-heading">Le Catalogue</h4>
    Retrouvez ici toutes les activités publiées par nos auteurs, en libre consultation.
  </div>
-->

  <div class="row-fluid">
    <!-- piepie Matière ****************** -->
    <div class="span6">
    <div class="widget-box">
      <div class="widget-title"><h5>Matières</h5></div>
      <div class="widget-content">
        <div id="piepie"></div>
        <ul>
        {{#each view.matters}}
          {{#if count}}
          <li>
            <a {{action clickyClickMatter id target="this"}}>
              {{title}} ({{count}})
              &nbsp;<span {{bindAttr style="style"}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </a>
          </li>
          {{/if}}
        {{/each}}
          <li class="active">
            <hr />
            <a {{action clickyClickMatter "reset" target="this"}}>
              Toutes les matières&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </li>
        </ul>
      </div>
    </div>
    </div>

    <!-- piepie Niveau ****************** -->
    <div class="span6">
    <div class="widget-box">
      <div class="widget-title"><h5>Niveaux ({{view.displayMatter}})</h5></div>
      <div class="widget-content">
        <div id="piepielevel"></div>
        <ul>
        {{#each view.levels}}
          {{#if count}}
          <li>
            <a {{action clickyClickLevel id target="this"}}>
              {{title}} ({{count}})
              &nbsp;<span {{bindAttr style="style"}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </a>
          </li>
          {{/if}}
        {{/each}}
          <li class="active">
            <hr />
            <a {{action clickyClickLevel "reset" target="this"}}>
              Tous les niveaux&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </li>
        </ul>
      </div>
      </div>
    </div>

  </div>
</div>

<div class="row-fluid">
  <h4>Filtre: {{view.displayMatter}}, {{view.displayLevel}}</h4>
</div>

<div class="widget-box">
  <div class="widget-title">
    <h5>Activités</h5>
  </div>
  <div class="widget-content nopadding">
    <table class="sandbox table table-bordered data-table">
      <thead>
        <tr style="cursor: pointer; table-striped with-check">
          <th style="width: 10px;"></th>
          <th style="width: 10px;"></th>
          <th style="width: 10px;"></th>
          <th>Titre</th>
          <th>Date de publication</th>
          <th>Nombre de vues</th>
          <!--
          <th>Durée</th>
          <th>Difficulté</th>
          -->
          <th>Auteur</th>
          <th>Id</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>  
  </div>
</div>

<div class="modal hide" id="modal-preview" role="dialog" aria-labelledby="modal-preview-label" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="modal-preview-label">Voir</h3>
  </div>
  <div class="modal-body">
    <p id="modal-preview-body"></p>
  </div>
</div>