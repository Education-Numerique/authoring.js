/*
* @template : pages/sandbox
*/


<div class="row-fluid">

<div id="example" class="btn btn-success">hover for popover</div>

  <div class="alert alert-info">
    <a href="#" data-dismiss="alert" class="close">×</a>
    <h4 class="alert-heading">Le vivier</h4>
    Retrouvez ici toutes les activités publiées par nos auteurs, en libre consultation.
  </div>

  <div class="widget-box">
    <div class="widget-title">
      <h5>Liste des activités dans la sandbox</h5>
    </div>
    <div class="widget-content nopadding">
      <table class="sandbox table table-bordered data-table">
        <thead>
          <tr style="cursor: pointer; table-striped with-check">
            <th style="width: 10px;"></th>
            <th style="width: 10px;"></th>
            <th>Titre</th>
            <th>Date de publication</th>
            <th>Nombre de visualisations</th>
            <th>Durée</th>
            <th>Difficulté</th>
            <th>Auteur</th>
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
    <h3 id="modal-preview-label">Preview</h3>
  </div>
  <div class="modal-body">
    <p id="modal-preview-body"></p>
  </div>
</div>