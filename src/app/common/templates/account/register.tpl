/*
* @template : account/register
*/

<div class="row-fluid">
  <!--
  <div class="alert alert-info">
    <a href="#" data-dismiss="alert" class="close">×</a>
    <h4 class="alert-heading">Inscription</h4>
    Bienvenue dans la procedure. Votre compte sera créé en trois étapes.
  </div>
  -->
  <div class="progress progress-striped active">
    <div id="register-progress" style="width: 30%;" class="bar"></div>
  </div>

  <div class="widget-box" style="padding-bottom: 200px;">
    <div class="widget-title">
      <span class="icon">
        <i class="icon-pencil"></i>
      </span>
      <h5>Votre compte</h5>
    </div>

    <div class="widget-content">
      <div id="success-regular" class="alert alert-success" style="display: none;">
        <h5>Votre compte a été créé avec succès.</h5>
        <p>Vous allez recevoir un courrier électronique de confirmation pour le valider.
          Pensez à vérifier votre dossier de courriers indésirables (spam) si le courrier n'arrive pas.<br /> <br />
          <button class="btn btn-primary btn-large" {{action showAccountValidate href=true}}>Valider mon compte</button></p>
      </div>

      <div id="success-facebook" class="alert alert-success" style="display: none;">
        <h5>Votre compte a été créé avec succès</h5>
        <p>Vous allez être connecté immédiatement.</p>
      </div>

      <form id="form-wizard" class="form-horizontal" method="post">
        <div id="creation-error" class="alert alert-error" style="display: none"></div>

<!-- Etape 1 de la procédure d'inscription -->
        <div id="step-regular" class="step">

          <div class="alert alert-info">Entrez ci-dessous les informations qui permettont de vous identifier.
            <!-- <a href="#" data-dismiss="alert" class="close">×</a> -->
          </div>

          <div class="control-group">
            <label for="email" class="control-label">Adresse électronique</label>
            <div class="controls">
              <input id="email" type="text" name="email" />
            </div>
          </div>

          <div class="control-group">
            <label for="password" class="control-label">Mot de passe</label>
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

          <div class="control-group">
            <label class="control-label">J'accepte<br />les <a href="http://www.education-et-numerique.org/cgu/" title="CGU" target="_blank">conditions d'utilisation</a></label>
            <div class="controls">
              <input id="eula" type="checkbox" name="eula" />
            </div>
          </div>

        </div>

<!-- Etape 2 de la procédure d'inscription -->
        <div id="step-basic" class="step">

          <div class="alert alert-info">
          <strong>Attention</strong> : choisissez bien votre nom d'auteur.<br />C'est le nom sous lequel seront publiées vos ativités. Vous ne pourrez pas le modifier.<br />
          Nous vous conseillons de mettre ici votre vrai nom comme par exemple : JH Pestalozzi.
            <!-- <a href="#" data-dismiss="alert" class="close">×</a> -->
          </div>

          <div class="control-group">
            <label for="username" class="control-label">Votre nom d'auteur</label>
            <div class="controls">
              <input id="username" type="text" name="username" />
            </div>
          </div>

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

    <!-- je ne comprends pas que cette table soit en dur (JBT) !!! -->
          <div class="control-group">
            <label class="control-label">Discipline</label>
            <div class="controls">
              <select data-placeholder="Choisissez une discipline" id="discipline" name="discipline">
              <option value='all'>Allemand</option>
              <option value='eng'>Anglais</option>
              <option value='artpla'>Arts Appliqués</option>
              <option value='artsza'>Arts Plastiques</option>
              <option value='mat6'>Biochimie-Génie biologique</option>
              <option value='mat7'>Biotechnologies</option>
              <option value='chin'>Chinois</option>
              <option value='mat11'>Droit</option>
              <option value='mat12'>Economie et Gestion</option>
              <option value='mat13'>EDD</option>
              <option value='eps'>EPS</option>
              <option value='esp'>Espagnol</option>
              <option value='mat17'>FLE / FLS</option>
              <option value='fra'>Français </option>
              <option value='mat19'>Génie civil, mécanique, électrique</option>
              <option value='mat20'>Génie Industriel</option>
              <option value='gre'>Grec</option>
              <option value='mat22'>HDA</option>
              <option value='docu'>Documentation Information</option>
              <option value='inf'>Informatique</option>
              <option value='mat28'>ISN</option>
              <option value='ita'>Italien</option>
              <option value='jap'>Japonais</option>
              <option value='lat'>Latin</option>
              <option value='let'>Lettres</option>
              <option value='lit'>Littérature</option>
              <option value='mat'>Mathématiques</option>
              <option value='meca'>Mécanique</option>
              <option value='mus'>Musique</option>
              <option value='phi'>Philosophie</option>
              <option value='mat41'>Primaire</option>
              <option value='sci'>Sciences</option>
              <option value='phys'>Sciences Physiques</option>              
              <option value='sciec'>SES</option>              
              <option value='svt'>SVT</option>              
              <option value='tech'>Technologie</option>              
              <option value='tice'>TICE</option>
              <option value='other'>Autre</option>              

            </select>
            </div>
          </div>

        </div>

<!-- Etape 3 de la procédure d'inscription 
        <div id="step-conclusion" class="step">

          <div class="alert alert-info">
            Ces informations sont optionnelles.<br />Vous pourrez les compléter plus tard en modifiant votre profil.
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
            Vos informations personnelles
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
-->

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

