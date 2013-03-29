/*
* @template : pages/dashboard
*/


<div class="row-fluid">
  <div class="alert alert-info">
    <a href="#" data-dismiss="alert" class="close">×</a>
    <h4 class="alert-heading">ATTENTION !!!!</h4>
    Ceci est la version Alpha 0.0 de l'Environnement Auteur d'Éducation &amp; Numérique.<br />
    Elle ne fonctionne qu'avec GOOGLE CHROME !!! Avec tout autre navigateur, vous serez vite bloqué.<br /> 
    Cette version n'est pas encore vraiment publique. Il y a encore beaucoup de choses qui ne fonctionnent pas bien, beaucoup de bugs. Nous y travaillons d'arrache-pied ! N'hésitez surtout pas à vous inscrire, à essayer, à nous faire part de vos remarques et suggestions.<br />
    Vous pouvez prendre contact avec <a href="mailto:contact@education-et-numerique.org">contact@education-et-numerique.org</a>
  </div>
<!--
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
              <a {{action showSandbox href=true}} rel="tooltip" data-placement="top" title="Accéder aux activités publées">
                <i class="icon-home"></i>
                Le Vivier
              </a>
            </li>

            <li class="user-logged-out">
<!--              <a [[action showAccountLogin href=true]] rel="tooltip" data-placement="top" title="Connexion au service"> -->
              <a {{action showAccountLogin href=true}}>
                <i class="icon-client"></i>
                Se connecter
              </a>
            </li>

            <li class="user-author">
              <a {{action showMyActivities href=true}} rel="tooltip" data-placement="top" title="Accéder à mes activités">
                <i class="icon-book"></i>
                Mes activités
              </a>
            </li>
            <li class="user-author">
              <a {{action showAccountProfile href=true}} rel="tooltip" data-placement="top" title="Accéder à mes données personnelles">
                <i class="icon-client"></i>
                Mon profil
              </a>
            </li>
<!--            <li class="user-author">
              <a [[action showAccountSettings href=true]] rel="tooltip" data-placement="top" title="Accéder à vos paramètres">
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
              <a {{action showAdminActivities href=true}} class="tip-bottom" title="Modérer et modifier toutes les activités">
                <i class="icon-download"></i>
                Modération des activités
              </a>
            </li>
            <li class="user-admin">
              <a {{action showAdminUsers href=true}} class="tip-bottom" title="Gérer les comptes utilisateurs">
                <i class="icon-people"></i>
                Comptes utilisateurs
              </a>
            </li>
          </ul>
        </div>  
      </div>

  <!-- Et maintenant les 4 blocs ... -->

      <div class="row-fluid" style="text-align: center;"></div>
    </section>

    <section class="widget-content" id="home-collapse">
        <div style="float:left; width:46%; min-width=20em; height:240px; overflow:hidden; border:1px solid #CCC; padding:1%; margin-bottom:15px;">
          <h4> </h4>
          <section class="widget-content">
            <p>En un clic, rejoignez la communauté des auteurs <em>Éducation &amp; Numérique</em>. Mettez à disposition vos exercices, activités et méthodes éprouvés avec vos élèves.<br />
            Vous aiderez tous ceux qui préparent un examen (Brevet, Bac, concours) à réussir, en révisant et en s’entrainant efficacement.</p>
            <p>Vous demeurez propriétaire de toutes vos productions et pouvez donc les exploiter librement.<br />
            </p><ul>
            <li><a href="#" onclick="$('#modal-cgu').modal({backdrop: true, show: 'true'}); return false;">Consultez la charte des auteurs E&amp;N</a></li>
            <li><a  {{action showAccountRegister href=true}}>Inscrivez-vous </a></li>
            </ul>
            <p></p>
          </section>
        </div>

        <div style="float:right; width:46%; min-width=20em; height:240px; overflow:hidden; border:1px solid #CCC; padding:1%; margin-bottom:15px;">
          <h3>Créez vos activités</h3>
          <section class="widget-content">
           

            <p>C’est <b>libre, gratuit</b>, Open source, sous licence Creative Commons</p>

            <p>Si <b>l’ENT de votre établissement</b> accepte des contenus compatibles SCORM, vous pourrez <b>exporter vos activités</b> dans ce contexte et assurer le suivi de vos élèves.</p>       
          </section>
        </div>
    
        <div style="float:left; width:46%; min-width=20em; height:240px; overflow:hidden; border:1px solid #CCC; padding:1%; margin-bottom:15px;">
          <h3>Le Vivier</h3>
          <section class="widget-content">
            <p>Prévisualisez vos séquences telles qu’elles seront vues par les utilisateurs. Faites-les connaître à vos collègues et à vos élèves. </p>
             <p>À l’aide des gabarits conçus spécialement par <em>Éducation &amp; Numérique</em>, créez facilement activités et exercices que vous pouvez ensuite <b>publier dans le Vivier</b>. </p>
            <p></p>
            <ul><li><a {{action showSandbox href=true}} rel="tooltip" data-placement="top" title="Accéder aux activités publées">Accédez au vivier</a></li></ul>
          </section>
        </div>
    
        <div style="float:right; width:46%; min-width=20em; height:240px; overflow:hidden; border:1px solid #CCC; padding:1%; margin-bottom:15px;">
          <h3>L’environnement auteur</h3>
          <section class="widget-content">
            <p>Échangez expériences, astuces et conseils sur la meilleure manière d’aborder <b>les notions qui mettent régulièrement les élèves en difficulté</b> et donnent lieu à des types d’erreurs récurrentes.</p>
            <p>Pour partager vos idées avec vos collègues :<br />
            </p>
            <ul>
              <li><a href="http://www.education-et-numerique.org" target="_blank">Le blog d'E &amp; N</a></li>
              <li><a href="https://twitter.com/Enumerique" target="_blank">Le fil twitter d'E &amp; N</a></li>
            </ul>
            <p>Aidez-nous à concevoir de nouveaux modèles d'activités pour Éducation &amp; Numérique.<br />
            Contactez l’association : <a href="mailto:contact@education-et-numerique.org">contact@education-et-numerique.org</a></p>
            
            <p></p>
          </section>
         </div>
      </section>
  </article>
</div>

</div>