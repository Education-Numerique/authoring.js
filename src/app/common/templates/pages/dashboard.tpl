/*
* @template : pages/dashboard
*/
<!--
  
<div class="row-fluid">
  <div class="alert alert-error"> 
    <a href="#" data-dismiss="alert" class="close">×</a>
    <h4 class="alert-heading">ATTENTION !!!!</h4>
    <p>Le service sera interrompu vendredi 20 septembre de 10h à 13h pour une mise à jour importante.<br /><br />
    Merci de votre compréhension.<br /><br />
    A bientôt,<br />
    l'équipe technique d'E&N</p>
  
    Vous pouvez prendre contact avec <a href="mailto:contact@education-et-numerique.org">contact@education-et-numerique.org</a>
  
  </div>
</div>
-->

<div class="row-fluid">
  <article id="actions" class="widget-box">
    <!--
    <header class="widget-title">
      <span class="icon">
        <i class="icon-th-list"></i>
      </span>
      <h5>Mon dashboard</h5>
    </header>
  -->
    <section class="widget-content" id='button-mid'>
      <div class="row-fluid">
        <div class="span12 center" style="text-align: center;">         
          <ul class="quick-actions">
            <li>
<!-- Nouveau catalogue Emmanuel Decembre 2013 
              <a [[action showSandbox href=true]] rel="tooltip" data-placement="bottom" title="Accéder aux activités publées">
-->
              <a href="http://catalogue.education-et-numerique.org" target="_blank" rel="tooltip" data-placement="bottom" title="Accéder aux activités publées">
                <i class="icon-eye"></i>
                Le Catalogue
              </a>
            </li>

            <li class="user-logged-out">
              <a {{action showAccountLogin href=true}}>
                <i class="icon-client"></i>
                Se connecter
              </a>
            </li>

            <li class="user-author">
              <a {{action showMyActivities href=true}} rel="tooltip" data-placement="bottom" title="Accéder à mes activités">
                <i class="icon-book"></i>
                Mes activités
              </a>
            </li>
            <li class="user-author">
              <a {{action showAccountProfile href=true}} rel="tooltip" data-placement="bottom" title="Accéder à mes données personnelles">
                <i class="icon-client"></i>
                Mon profil
              </a>
            </li>
<!--        <li class="user-author">
              <a [[action showAccountSettings href=true]] rel="tooltip" data-placement="bottom" title="Accéder à vos paramètres">
                <i class="icon-lock"></i>
                Réglages
              </a>
            </li> -->
          </ul>
        </div>  
      </div>

      <div class="row-fluid">
        <div class="span12 center" style="text-align: center;">         
          <ul class="quick-actions">
            <li class="user-reviewer">
              <a {{action showAdminActivities href=true}} rel="tooltip" data-placement="top" title="Modérer et modifier toutes les activités">
                <i class="icon-download"></i>
                Modération des activités
              </a>
            </li>
            <li class="user-admin">
              <a {{action showAdminUsers href=true}} rel="tooltip" data-placement="top" title="Gérer les comptes utilisateurs">
                <i class="icon-people"></i>
                Comptes utilisateurs
              </a>
            </li>
          </ul>
        </div>  
      </div>
    </section>
  <!-- Et maintenant les blocs ... -->

    <section class="widget-content">
      <div class="row-fluid">

        <div class="span6">
          <h3><i class="icon-eye-open"></i> Le Catalogue</h3>

          <p><strong><a href="catalogue://www.education-et-numerique.org" target="_blank">Visitez le catalogue</a></strong> : Après une gestation de près d'un an et demi, LEA (L'Environnement Auteur) est né à l'automne 2013. Le catalogue s'enrichit tous les jours avec les activités que vous créez et que vous décidez de rendre publiques.<br />
          <p><strong><a href="http://www.education-et-numerique.org" target="_blank">Visitez le site de l'Association</a></strong> : Sur le site de l'Association, vous rencontrerez ses membres que vous rejoindrez peut-être, vous découvrirez le projet dans son ensemble.<br /> 
          Vous découvrirez également les activités crées avec LEA que l'Association a décidé de mettre en avant. C'est un blog Wordpress et cela vous donnera peut-être des idées sur la manière d'intégrer des activités produites avec LEA dans votre propre blog ou dans votre site web. 
          </p>
        </div>

        <div class="span6">
          <h3><i class="icon-th-list"></i> Créez vos activités</h3>

          <p><strong>Devenez auteur</strong><br />
          C’est libre, gratuit, Open source, sous licence Creative Commons. Vous conservez tous les droits de propriété sur vos créations. 
          En quelques minutes, après avoir validé votre compte, vous pourrez créer votre première activité. <i class="icon-th-list"></i> À l’aide de gabarits conçus par E&N, vous concevez facilement fiches et exercices «&nbsp;accrochés&nbsp;» au programme, au bon thème, à la bonne notion.<br />
          Prévisualisez vos séquences au fur et à mesure de la conception, sauvegardez, publiez.<br />
          Partagez avec vos élèves ou vos collègues via votre site ou votre blog… Grâce à la compatibilité SCORM, exportez vos activités vers le LCMS (Learning Course Management System) de l'ENT de votre établissement et assurerez le suivi de vos élèves.</p> 
        </div>
      </div>

      <div class="row-fluid">
        <div class="span12">
          <h3><i class="icon-group"></i> Rejoignez l'association</h3>

          <p>Aidez-nous à concevoir de nouveaux modèles d'activités pour Éducation & Numérique.</p>
          <p>Contactez l’association : <a href="mailto:contact@education-et-numerique.org">contact@education-et-numerique.org</a></p>
        </div>
      </div>

    </section>
  </article>
</div>

</div>