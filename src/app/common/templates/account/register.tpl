/*
* @template : account/register
*/



<div class="row-fluid">
  <div class="alert alert-info">
    <a href="#" data-dismiss="alert" class="close">×</a>
    <h4 class="alert-heading">Inscription</h4>
    Bienvenue dans le processus d'inscription! Votre compte sera créé en quatre étapes simples.
  </div>

  <div class="progress progress-striped active">
    <div id="register-progress" style="width: 5%;" class="bar"></div>
  </div>

  <div class="widget-box">
    <div class="widget-title">
      <span class="icon">
        <i class="icon-pencil"></i>
      </span>
      <h5>Votre compte</h5>
    </div>

    <div class="widget-content">
      <div id="success-regular" class="alert alert-success" style="display: none;">
        <h5>Votre compte a été créé avec succès</h5>
        <p>Vous allez recevoir un email de confirmation qui vous permettra de valider celui-ci.
          Pensez à vérifier votre dossier spam si le mail de confirmation n'arrive pas.</p>
      </div>

      <div id="success-facebook" class="alert alert-success" style="display: none;">
        <h5>Votre compte a été créé avec succès</h5>
        <p>Vous allez être connecté immédiatement.</p>
      </div>

      <form id="form-wizard" class="form-horizontal" method="post">
        <div id="creation-error" class="alert alert-error" style="display: none"></div>

        <div id="step-regular" class="step">
          <div class="alert alert-info">Veuillez maintenant fournir les informations permettant de vous identifier sur le service.
            <a href="#" data-dismiss="alert" class="close">×</a>
          </div>

          <div class="control-group">
            <label for="email" class="control-label">Email</label>
            <div class="controls">
              <input id="email" type="text" name="email" />
            </div>
          </div>

          <div class="control-group">
            <label for="password" class="control-label">Password</label>
            <div class="controls">
              <input id="password" type="password" name="password" />
            </div>
          </div>
          <div class="control-group">
            <label for="password2" class="control-label">Confirm Password</label>
            <div class="controls">
              <input id="password2" type="password" name="password2" />
            </div>
          </div>
        </div>

        <div id="step-basic" class="step">
          <div class="alert alert-info">Prenez quelques secondes pour nous en dire plus sur vous.
            <a href="#" data-dismiss="alert" class="close">×</a>
          </div>

          <div class="control-group">
            <label for="username" class="control-label">Pseudonyme</label>
            <div class="controls">
              <input id="username" type="text" name="username" />
            </div>
          </div>

          <!-- XXX finish-up the label for attributes -->
          <div class="control-group">
            <label for="firstname" class="control-label">Prénom</label>
            <div class="controls">
              <input id="firstname" type="text" name="firstname" />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Nom</label>
            <div class="controls">
              <input id="lastname" type="text" name="lastname" />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Discipline</label>
            <div class="controls">
              <select data-placeholder="Choisissez une discipline" id="discipline" name="discipline">
                <option value=""></option>
                <option value="hg">Histoire et Géographie</option>
                <option value="fr">Français</option>
                <option value="mt">Maths</option>
                <option value="an">Anglais</option>
                <option value="ph">Physique</option>
              </select>
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">J'accepte les conditions d'utilisation</label>
            <div class="controls">
              <input id="eula" type="checkbox" name="eula" />
            </div>
          </div>
        </div>


        <div id="step-conclusion" class="step">

          <div class="alert alert-info">Si vous le souhaitez, vous pouvez compléter votre profil.
            <a href="#" data-dismiss="alert" class="close">×</a>
          </div>

          <h4 style="margin: 5px;">
            Votre établissement
          </h4>
          <div class="control-group">
            <label class="control-label">Nom de l'établissement</label>
            <div class="controls">
              <input id="company" type="text" name="company" />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Code postal de l'établissement</label>
            <div class="controls">
              <input id="company-address" type="text" name="company-address" />
            </div>
          </div>


          <h4 style="margin: 5px;">
            Vous
          </h4>
          <div class="control-group">
            <label class="control-label">Téléphone</label>
            <div class="controls">
              <input id="phone" type="text" name="phone" />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Adresse</label>
            <div class="controls">
              <input id="address" type="text" name="address" />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Code postal</label>
            <div class="controls">
              <input id="zip" type="text" name="zip" />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Ville</label>
            <div class="controls">
              <input id="town" type="text" name="town" />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Pays</label>
            <div class="controls">
              <input id="state" type="text" name="state" />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Page web</label>
            <div class="controls">
              <input id="web" type="text" name="web" />
            </div>
          </div>

        </div>

        <div class="form-actions" style="text-align: center; padding: 0; padding-top: 20px; padding-bottom: 20px;">
            <input id="back" class="btn btn-primary" type="reset" value="Back" />
            <input id="next" class="btn btn-primary" type="submit" value="Next" />
            <!--
            <div id="status">Status?</div>
            -->
        </div>
      </form>
<!--
      <div id="submitted" style="display: none;"><h5 class="throbbering">En cours de traitement</h5></div>
-->
    </div>
  </div>
</div>

