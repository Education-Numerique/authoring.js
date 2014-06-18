/*
* @template : admin/activities
*/

<div class="row-fluid">

  <div class="widget-box">
    <div class="widget-title">
      <h5>Les activités publiées</h5>
    </div>
    <div class="widget-content nopadding">
      <table class="mypublished table table-bordered data-table">
        <thead>
          <tr style="cursor: pointer; table-striped with-check">
            <th style="width: 10px;"></th>
            <th style="width: 10px;"></th>
            <th style="width: 10px;"></th>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Difficulté</th>
            <th>Matière</th>
            <th>Niveau</th>
            <th>Date de publication</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>  
    </div>
  </div>

  <div class="row-fluid">
  </div>

<!--   <div class="widget-box">
    <div class="widget-title">
      <h5>Les activités non encore publiées</h5>
    </div>
    <div class="widget-content nopadding">
      <table class="mydrafts table table-bordered data-table">
        <thead>
          <tr style="cursor: pointer; table-striped with-check">
            <th style="width: 10px;"></th>
            <th style="width: 10px;"></th>
            <th style="width: 10px;"></th>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Difficulté</th>
            <th>Matière</th>
            <th>Niveau</th>
            <th>Date de création</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>  
    </div>
  </div> -->

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
