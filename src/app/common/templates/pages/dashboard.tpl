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

  <article id="home" class="widget-box">
    <div>
      En attente validation et fourniture contenus / textes lot 2
    </div>
  </article>
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
    <section class="widget-content">
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
<!--              <a [[action showAccountLogin href=true]] rel="tooltip" data-placement="bottom" title="Connexion au service"> -->
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
<!--            <li class="user-author">
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
  <!-- Et maintenant les 4 blocs ... -->

    <section class="widget-content" id="home-collapse">
        <div style="float:left; width:46%; min-width=20em; height:240px; overflow:hidden; border:1px solid #CCC; padding:1%; margin-bottom:15px;">
          <h3><i class="icon-eye-open"></i> Le Catalogue</h3>
          <section class="widget-content">
            <p><strong>Visitez le catalogue</strong> : il contient les activités élèves déjà publiées sur la plateforme que des collègues ont mises à la disposition de la communauté et des élèves. Vous vous ferez une idée du type de contenus que vous pouvez concevoir et de leur rendu. Le catalogue est encore restreint, mais nous comptons sur vous pour l’enrichir.</p>
          </section>
        </div>

        <div style="float:right; width:46%; min-width=20em; height:240px; overflow:hidden; border:1px solid #CCC; padding:1%; margin-bottom:15px;">
          <h3><i class="icon-th-list"></i> Créez vos activités</h3>
          <section class="widget-content">
            <p><strong>Devenez auteur</strong><br />
            C’est libre, gratuit, Open source, sous licence Creative Commons.
            En quelques minutes, après avoir validé votre compte, vous pourrez créer votre première activité. <i class="icon-th-list"></i> À l’aide de gabarits conçus par E&N, concervez facilement fiches et exercices «&nbsp;accrochés&nbsp;» au programme, au bon thème, à la bonne notion.<br />
            Prévisualisez vos séquences en cours de route telles qu’elles seront vues par les utilisateurs. Sauvegardez, Publiez. Partagez avec vos élèves ou vos collègues via votre site ou votre blog… Bientôt, grâce à la compatibilité SCORM vous exporterez vos séquences vers l’ENT de votre établissement et assurerez le suivi de vos élèves.</p> 
          </section>
        </div>
    
        <div style="float:left; width:46%; min-width=20em; height:240px; overflow:hidden; border:1px solid #CCC; padding:1%; margin-bottom:15px;">
          <h3>L’association Éducation & Numérique</h3>
          <section class="widget-content">
            <p><strong>Mettez à disposition vos exercices, activités et méthodes éprouvés avec vos élèves.</strong><br />
            Vous aiderez tous ceux qui préparent un examen (Brevet, Bac, concours) à réussir, en révisant et en s’entrainant efficacement.<br />
            Vous demeurez propriétaire de toutes vos productions et pouvez donc les exploiter librement.</p>
          </section>
        </div>
    
        <div style="float:right; width:46%; min-width=20em; height:240px; overflow:hidden; border:1px solid #CCC; padding:1%; margin-bottom:15px;">
          <h3>Et aussi…</h3>
          <section class="widget-content">
            <p><strong>Échangez</strong> expériences, astuces et conseils sur la meilleure manière d’aborder les notions qui mettent régulièrement les élèves en difficulté et donnent lieu à des types d’erreurs récurrentes.<br />
            Pour partager vos idées avec vos collègues :</p>
            <ul>
              <li>Le blog d'E & N : <a href="http://www.education-et-numerique.org" target="_blank">www.education-et-numerique.org</a></li>
              <li>Le fil twitter d'E & N : <a href="https://twitter.com/Enumerique" target="_blank">twitter.com/Enumerique</a></li>
            </ul>
            <p>Aidez-nous à concevoir de nouveaux modèles d'activités pour Éducation & Numérique.</p>
            <p>Contactez l’association : <a href="mailto:contact@education-et-numerique.org">contact@education-et-numerique.org</a></p>
          </section>
         </div>
      </section>
  </article>
</div>

</div>