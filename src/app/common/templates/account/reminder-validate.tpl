/*
* @template : account/remindervalidate
*/

<div class="row-fluid">
  <div class="alert alert-info">
    <a href="#" data-dismiss="alert" class="close">×</a>
        Vous avez dû recevoir un email de confirmation qui vous permettra de changer votre mot de passe.
          Pensez à vérifier votre dossier spam si le mail de confirmation n'arrive pas.
  </div>

  <div class="widget-box">
    <div class="widget-title">
      <span class="icon">
        <i class="icon-pencil"></i>
      </span>
      <h5>Code d'activation</h5>
    </div>

    <div class="widget-content">
      <div id="success-validation" class="alert alert-success" style="display: none;">
        <h5>Votre mot de passe a été changé avec succès</h5>
        <p>Vous pouvez maintenant vous connecter et accéder à l'environnement auteur.</p>
        <button class="btn btn-primary btn-large" {{action showAccountLogin href=true}}>Se connecter</button>
      </div>

      <form id="form-wizard" class="form-horizontal" method="post">
        <div id="creation-error" class="alert alert-error" style="display: none"></div>

        <div id="step-regular" class="step">


          <div class="control-group">
            <label for="email" class="control-label">Email</label>
            <div class="controls">
              <input id="email" type="text" name="email" {{bindAttr value="content"}} />
            </div>
          </div>

          <div class="control-group">
            <label for="password" class="control-label">Code</label>
            <div class="controls">
              <input id="code" type="text" name="code" />
            </div>
          </div>

          <div class="control-group">
            <label for="password" class="control-label">Nouveau mot de passe</label>
            <div class="controls">
              <input id="password" type="password" name="password" />
            </div>
          </div>
          <div class="control-group">
            <label for="password2" class="control-label">Confirmez votre mot de passe</label>
            <div class="controls">
              <input id="password2" type="password" name="password2" />
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

