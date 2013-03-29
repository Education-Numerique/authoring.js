/*
* @template : account/reminder
*/

<div class="row-fluid">
  <div class="widget-box">
    <div class="widget-title">
      <span class="icon">
        <i class="icon-pencil"></i>
      </span>
      <h5>Retrouvez votre compte</h5>
    </div>

    <div class="widget-content">
      <form id="form-wizard" class="form-horizontal" method="post">
        <div id="creation-error" class="alert alert-error" style="display: none">Aucun compte n'est associé à cette adresse email</div>

        <div id="step-regular" class="step">


          <div class="control-group" id="email-wrapper">
            <label for="email" class="control-label">Email</label>
            <div class="controls">
              <input id="email" type="text" name="email" />
            </div>
          </div>

        </div>

        <div class="form-actions" style="text-align: center; padding: 0; padding-top: 20px; padding-bottom: 20px;">
            <input id="send" class="btn btn-primary" type="submit" value="Valider" />

        </div>
      </form>

    </div>
  </div>
</div>

