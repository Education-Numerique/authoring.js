/*
* @template : pages/dashboard
*/
<!--
<div class="row-fluid">
  <div class="alert-info alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span></button>
    Parce que nous croyons à l’égalité des chances dans l’éducation,<br /> nous sommes attachés à la gratuité.<br />
    Pour que la communauté éducative dispose de toujours plus de ressources<br />libres et sans publicité.<br />
    Pour que E&N puisse créer de nouvelles fonctionnalités, soutenez nous !<br />
    Faites un don de 2€, 5€, 20 € ou plus :-), en un clic<br /><br />
    <div align='middle'>
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
    <input type="hidden" name="cmd" value="_s-xclick">
    <input type="hidden" name="hosted_button_id" value="WGAAGJ8F7RGGN">
    <input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - la solution de paiement en ligne la plus simple et la plus sécurisée !">
    <img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1">
    </form>
    </div>
    Où va votre don ?<br />
     Votre don confortera l’organisation. E&N est une petite équipe composée d’un éditeur assisté de professeurs responsables matière qui correspondent avec les enseignants auteurs, de 2 chargées de communication qui mettent en avant vos ressources et vous informent chaque semaine des nouveautés, et enfin de 2 développeurs qui assurent  le bon fonctionnement de la plateforme pour le nombre croissant d’utilisateurs (serveurs et maintenance) et le développement de nouvelles fonctionnalités.<br /><br />
    <small>Les dons aux associations d’intérêt général ouvrent droit à une réduction d’impôt sur 66% des sommes versées dans la limite de 20% du revenu imposable. (<a href='http://vosdroits.service-public.fr/particuliers/F426.xhtml#N100DA' target='_blank'><em>cliquez ici pour en savoir plus<em></a>)</small>
  </div>
</div>
-->
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
            <!-- <li class="user-author">
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
          <h3><i class="icon-eye-open"></i> Les activités publiées</h3>

          <p><strong><a href="http://catalogue.education-et-numerique.org" target="_blank">Visitez le catalogue</a></strong> : Il contient TOUTES les activités que les auteurs (vous) décident de publier. Les meilleures y sont mélangées aux activités incomplètes, aux essais de tous genres. Il est assez dur d'y repérer le bon grain au milieu de l'ivraie.<br />Mais c'est grâce à lui que vous pouvez partager ce que vous produisez avec tout le monde. Naviguez dans les filtres matière/niveau ou utilisez l'outil de recherche pour retrouver une activité. Cliquez dessus, elle s'ouvre dans une nouvelle fenêtre. Pour la signaler à quelqu'un, il suffit de recopier son adresse dans la barre d'adresse du navigateur.<br />Le lien ressemble à&nbsp;: <a href="http://www.education-et-numerique.fr/0.3/activity/embed.html?id=510eaff63361eb667e4c26f7" target="_blank">www.education-et-numerique.fr/0.3/activity/embed.html?id=510eaff63361eb667e4c26f7</a></p>
          <p><strong><a href="http://www.education-et-numerique.org" target="_blank">Visitez le site de l'Association</a></strong> : Les éditeurs et directeurs de collections de l'association explorent régulièrement le catalogue à la recherche des pépites que vous y déposez. Ils prennent contact avec les auteurs et travaillent avec eux, les aider à améliorer leur production, leur donner des conseils, parler pédagogie numérique, se lier d'amitié.<br /> 
          Et bien sûr, fiers de ce que nous faisons, promouvoir autant que nous le pouvons le meilleur de ce que vous produisez : lettre d'information envoyée à plus de 60&nbsp;000 membres de la communauté éducative francophone, Twitter, Facebook, presse, bouche à oreille ... Cette seconde année d'existence nous permet d'affirmer que nous occupons aujourd'hui une belle place dans le paysage des ressources pédagogiques numériques. Certaines de vos activités ont été consultées plus de 50&nbsp;000 fois !!!</p>
        </div>

        <div class="span6">
          <h3><i class="icon-th-list"></i> Créez vos activités</h3>

          <p><strong>Devenez auteur</strong><br />
          C’est libre, gratuit, Open source, sous licence Creative Commons. Vous conservez tous les droits de propriété sur vos créations.<br />
          En quelques minutes, après avoir validé votre compte, vous pourrez créer votre première activité.<br /><i class="i con-th-list"></i> À l’aide de gabarits conçus par E&N, vous concevez facilement fiches et exercices «&nbsp;accrochés&nbsp;» au programme, au bon thème, à la bonne notion.<br />
          Prévisualisez vos séquences au fur et à mesure de la conception, sauvegardez, publiez.<br />
          Découvrez ce que vous pourrez produire grâce à LEA en regardant les activités publiées dans le <a href="http://catalogue.education-et-numerique.org" target="_blank">catalogue</a>.<br />
          Prenez le temps de découvrir les tutos. Par exemple la présentation générale de la plateforme : <a href="http://www.education-et-numerique.fr/0.3/activity/embed.html?id=510eaff63361eb667e4c26f7" target="_blank">Elena</a> ou <a href="http://www.education-et-numerique.org/tutoriels-education-et-numerique/" target="_blank">la page du blog réservée aux tutos</a></br />.
          Pensez à validez les exercices que vous proposez avec des utilisateurs et observez leurs réactions.<br />  
          Partagez avec vos élèves ou vos collègues via votre site ou votre blog… Grâce à la compatibilité SCORM, exportez vos activités vers le LCMS (Learning Course Management System) de l'ENT de votre établissement et assurerez le suivi de vos élèves.</p> 
        </div>
      </div>

      <div class="row-fluid">
        <div class="span12">
          <h3><i class="icon-thumbs-up"></i> Rejoignez l'association</h3>

          <p>Nous avons plein de projets, vous en avez peut-être aussi ... Si vous souhaitez nous rejoindre, contactez nous : <a href="mailto:contact@education-et-numerique.org">contact@education-et-numerique.org</a></p>
          <p><a href="http://www.education-et-numerique.org/a-propos-de-education-et-numerique/rendez-vous sur le site" target="_blank"></a></p>
        </div>
      </div>
    </section>
  </article>
</div>