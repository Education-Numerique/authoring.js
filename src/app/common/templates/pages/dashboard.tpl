/*
* @template : pages/dashboard
*/

<div class="row-fluid">
  <div class="alert alert-info">
    <a href="#" data-dismiss="alert" class="close">×</a>
    <h4 class="alert-heading">Page d'accueil</h4>
    Ceci est la page d'accueil de Lxxl
  </div>

  <article id="home" class="widget-box">
    <div>
      En attente validation et fourniture contenus / textes lot 2
    </div>
  </article>
</div>

<!--
<div class="row-fluid" id="accordion2">
  <div class="alert alert-info">
    <a href="#" data-dismiss="alert" class="close">×</a>
    <h4 class="alert-heading">Bienvenue!</h4>
    Ceci est la page d'accueil de Lxxl</div>

<article id="home" class="widget-box">
  <header class="widget-title" data-toggle="slidify" data-parent="#accordion2" data-target="#home-collapse">
    <span class="icon">
      <i class="icon-th-list"></i>
    </span>
    <h5>Accueil</h5>
  </header>
  <section class="widget-content slidify" id="home-collapse">
    <h5>Enregistrez-vous en tant qu'auteur E&amp;N...<br />
    c'est gratuit, public, la&iuml;que, open source, creative commons et pas obligatoire !</h5>
    <p>En un clic, rejoignez la communaut&eacute; des auteurs Education &amp; Num&eacute;rique et proposez-nous comme vos coll&egrave;gues les meilleures activit&eacute;s pour traiter les difficult&eacute;s r&eacute;currentes des &eacute;l&egrave;ves. Aidez-les ainsi &agrave; r&eacute;ussir au Baccalaur&eacute;at, aux examens et aux concours : <a {{action showRegister href=true}}>cliquez ici</a></p>

    <h5>Lorsque vous devenez auteur E&amp;N, vous avez acc&egrave;s...</h5>

    <div class="row-fluid">
      <div class="span4">
        <article class="widget-box">
          <header class="widget-title">
            <span class="icon">
              <i class="icon-th-list"></i>
            </span>
            <h5>à l'environnement Auteur</h5>
          </header>
          <section class="widget-content">
            <p>En utilisant les outils et les mod&egrave;les mis &agrave; votre disposition, vous cr&eacute;ez rapidement des activit&eacute;s de qualit&eacute;. <br />
              Vous demeurez propri&eacute;taire de tout ce que vous produisez et vous pourrez l'exploiter librement. <br />
            E&amp;N vous propose  de diffuser vos activit&eacute;s et de vous r&eacute;tribuer proportionnellement aux t&eacute;l&eacute;chargements. </p>
            <ul>
              <li><a  {{action showCharte href=true}}>        Consultez la charte des auteurs E&amp;N</a></li>
              <li><a  {{action showRegister href=true}}>Inscrivez-vous </a></li>
            </ul>
          </section>
        </article>
      </div>

      <div class="span4">
        <article class="widget-box">
          <header class="widget-title">
            <span class="icon">
              <i class="icon-th-list"></i>
            </span>
            <h5>au programme avanc&eacute; </h5>
          </header>
          <section class="widget-content">
            <p>Vous nous aidez &agrave; concevoir de nouveaux mod&egrave;les d'activit&eacute;s et vous percevez des royalties chaque fois qu'une activit&eacute; est construite sur l'un de vos mod&egrave;les. </p>
            <ul>
              <li><a href="mailto:XXXFIXME">Contactez-nous</a></li>
            </ul>
          </section>
        </article>
      </div>

      <div class="span4">
        <article class="widget-box">
          <header class="widget-title">
            <span class="icon">
              <i class="icon-th-list"></i>
            </span>
            <h5>&agrave; la communaut&eacute; des auteurs</h5>
          </header>
          <section class="widget-content">
            <p>Echangez vos exp&eacute;riences, vos recettes, vos conseils sur la meilleure mani&egrave;re de d&eacute;bloquer les &eacute;l&egrave;ves sur des points pr&eacute;cis et r&eacute;pertori&eacute;s. <br />
              <br />
            Partagez vos id&eacute;es avec vos coll&egrave;gues :</p>
            <ul>
              <li><a href="http://txtnet.com/phpbb3" target="_blank">Le forum</a></li>
              <li><a href="http://txtnet.com/XXX-FIXME" target="_blank">Le blog</a></li>
            </ul>
          </section>
        </article>
      </div>
    </div>


    <article class="widget-box">
      <header class="widget-title">
        <span class="icon">
          <i class="icon-th-list"></i>
        </span>
        <h5>au bac à sable</h5>
      </header>
      <section class="widget-content">
        <ul><li>visualisez vos cr&eacute;ations telles qu'elles appara&icirc;tront &agrave; vos lecteurs,</li>
        <li>partagez avec vos coll&egrave;ques vos trucs pour cr&eacute;er des activit&eacute;s spectaculaires.</li>
        </ul>
      </section>
    </article>

  </section>
</article>


<article id="actions" class="widget-box">
  <header class="widget-title" data-toggle="slidify" data-parent="#accordion2" data-target="#actions-collapse">
    <span class="icon">
      <i class="icon-th-list"></i>
    </span>
    <h5>Mon dashboard</h5>
  </header>
  <section class="widget-content slidify" id="actions-collapse">
    <div class="row-fluid">
      <div class="span12 center" style="text-align: center;">         
        <ul class="quick-actions">
          <li>
            <a {{action showSandbox href=true}} class="tip-top" title="Accéder aux activités publiquement disponibles">
              <i class="icon-home"></i>
              Sandbox
            </a>
          </li>
          <li class="user-author">
            <a {{action showMyQTIs href=true}} class="tip-top" title="Accéder à vos activités">
              <i class="icon-book"></i>
              Activités
            </a>
          </li>
          <li class="user-author">
            <a {{action showProfile href=true}} class="tip-top" title="Accéder à votre profil et données personnelles">
              <i class="icon-client"></i>
              Profil
            </a>
          </li>
          <li class="user-author">
            <a {{action showSettings href=true}} class="tip-top" title="Accéder à vos paramètres">
              <i class="icon-lock"></i>
              Réglages
            </a>
          </li>
        </ul>
      </div>  
    </div>
    <div class="row-fluid">
      <div class="span12 center" style="text-align: center;">         
        <ul class="quick-actions">
          <li class="user-reviewer">
            <a {{action showAllQTIs href=true}} class="tip-bottom" title="Modérer et modifier toutes les activités">
              <i class="icon-download"></i>
              Modération des activités
            </a>
          </li>
          <li class="user-admin">
            <a {{action showAllCategories href=true}} class="tip-bottom" title="Gérer le graph des catégories">
              <i class="icon-graph"></i>
              Arbre des catégories
            </a>
          </li>
          <li class="user-admin">
            <a {{action showAllUsers href=true}} class="tip-bottom" title="Gérer les comptes utilisateurs">
              <i class="icon-people"></i>
              Comptes utilisateurs
            </a>
          </li>
        </ul>
      </div>  
    </div>
  </section>
</article>

<article id="charte" class="widget-box">
  <header class="widget-title" data-toggle="slidify" data-parent="#accordion2" data-speed="500" data-target="#charte-collapse">
    <span class="icon">
      <i class="icon-th-list"></i>
    </span>
    <h5>Charte
des auteurs LxxL - Éducation Numérique</h5>
    <div class="buttons">
      <a title="Icon Title" class="btn btn-mini" href="#"><i class="icon-print"></i> Print</a>
    </div>
  </header>
  <section class="widget-content slidify" id="charte-collapse">

    <h5>1 Généralités</h5>
    <ul>
      <li>La présente Charte tient lieu de contrat entre l'Auteur et LxxL - Éducation Numérique. En cochant la case "J'ai pris connaissance des conditions générales et je les accepte." au bas de son formulaire d'inscription, l'Auteur accepte ces dernières.</li>
      <li>LxxL - Éducation Numérique met à disposition des
        auteurs une plate-forme, un environnement auteur, où les auteurs
        peuvent créer, organiser et déposer une activité pédagogique. Au sens de la loi
        Code de la Propriété Intellectuelle, ces activités ont le statut d’œuvre de
        l’esprit.</li>
      <li>L’auteur conserve tous les droits
        de propriété intellectuelle sur son œuvre.</li>
      <li>LxxL - Éducation Numérique propose de diffuser gratuitement et éventuellement de commercialiser
        les œuvres des auteurs auprès des lycéens et étudiants.</li>
      <li>Le Comité Editorial de LxxL - Éducation Numérique se
        réserve le droit d’accepter ou de refuser toute œuvre qui lui serait proposée afin de
        la distribuer, selon les conditions mentionnées dans le paragraphe 4.<br />
        Le seul fait de proposer son œuvre au comité éditorial de LxxL - Education Numérique implique, en cas d'acceptation de l'œuvre selon les critères de qualité pédagogique et technique, l'acceptation par l'Auteur d'une diffusion non commerciale et non exclusive de son œuvre sur ses sites en ligne pendant une durée de quatre annés à dater de la première mise en ligne. <br />
        Dans le
        cas où le comité éditorial accepterait la distribution de l’œuvre dans un contexte commercial, il proposera
        de lui affecter une valeur afin de rétribuer l’auteur selon la grille tarifaire
        et les modalités de rétribution qui seront annexées au contrat de distribution commerciale proposé par LxxL - Éducation Numérique.<br>
        LxxL - Éducation Numérique s’engage à
        communiquer sa décision à l’auteur dans les 45 jours ouvrables suivant la réception de l'oeuvre par le Comité éditorial. Si la réponse de ce dernier est positive, l’auteur disposera alors
        de 45 jours pour accepter l’accord de distribution qui lui sera proposé. </li>
      <li> En acceptant
        cette annexe au à la présente charte qui tient lieu de contrat général, l'auteur accorde alors à LxxL - Éducation Numérique le droit de reproduire et d'exploiter
        commercialement son œuvre.</li>
    </ul>

    <h5>2 Droits des auteurs</h5>
    <ul>
      <li>Toutes les activités conçues et distribuées
        dans le cadre d'LxxL - Éducation Numérique ont le statut juridique d'œuvre de l'esprit protégé par le
        Code de la Propriété Intellectuelle, à son article L111.1&nbsp;&laquo;&nbsp;<i>L'auteur d'une œuvre
          de l'esprit jouit sur cette œuvre, du seul fait de sa création, d'un droit de
          propriété incorporelle exclusif et opposable à tous.</i> &raquo;&nbsp;</li>
      <li>L'auteur dispose
         d'un droit moral imprescriptible qui lui permet
        de jouir du droit au respect de son nom, de sa qualité et de son œuvre. Cela lui
        donne le droit de paternité de l'œuvre (L113-1 Code de la Propriété
        Intellectuelle) et de repentir (L121-4 Code de la Propriété Intellectuelle).</li>
      <li>L’auteur peut effectuer
        toutes les modifications qu’il jugerait nécessaires sur son œuvre, tout au long
        de son engagement avec LxxL. Cependant, toute modification devra faire l’objet
        d’une approbation par le Comité Editorial de LxxL - Éducation Numérique selon les modalités décrites au paragraphe précédent.</li>
      <li>La relation entre
        l’auteur et LxxL - Éducation Numérique ne constitue pas une exclusivité de distribution. L’auteur peut distribuer son œuvre auprès de tiers, dans un but
        commercial ou non, dès lors que ce tiers accepte réciproquement que son œuvre
        puisse être distribuée par LxxL - Éducation Numérique.</li>
      <li>Si l’auteur décide de renoncer à
        faire distribuer son œuvre par LxxL - Éducation Numérique, il s’engage à ne pas la retirer du
        catalogue de LxxL avant la fin de l’année scolaire en cours, en tenant compte
        des rattrapages des épreuves du Baccalauréat, c'est-à-dire, à la fin du mois de
        septembre suivant la demande qu’il ferait à LxxL de cesser la distribution de
        son œuvre. La demande devra parvenir à LxxL - Éducation Numérique au plus tard le 30 juin de l'année scolaire en cours sous la forme d'une lettre recommandée avec accusé de réception. </li>
      <li>Le contrat entre LxxL - Éducation Numérique et l’auteur
        est renouvelable tous les ans par tacite reconduction. Autrement dit, l'absence de renonciation au contrat, vaut acceptation de sa
        continuation.</li>
    </ul>

    <h5>3 Obligation des auteurs</h5>
    <p>Lors du dépôt d'une œuvre auprès de
        LxxL - Éducation Numérique, elle doit être suffisamment complète et exhaustive pour pouvoir être
        exploitable.</p>
    <p>L’auteur, en proposant à LxxL - Éducation Numérique la
      distribution de son œuvre, s’engage&nbsp;:</p>
    <ul>
      <li>À garantir qu’il possède les
        droits, licences et autorisations nécessaires sur l’ensemble des contenus constituant
        son œuvre.</li>
      <li>À garantir de ne pas utiliser de
        contenus appartenant à une tierce personne, sauf autorisation formelle de
        cette tierce personne.</li>
      <li>À ne pas proposer de contenus contenant
        des propos insultants, diffamatoires, discriminatoires. De même il est interdit
        de déposer du contenu contraire à l’ordre public et aux bonnes mœurs incitant à
        la haine raciale, faisant l’apologie de crimes contre l’humanité ou contenant
        des propos révisionnistes ou pédopornographiques. </li>
      <li>À ne pas déposer de contenu qui
        porterait atteinte à la vie privée de quelqu’un ou un contenu qui bafouerait le
        droit d’auteur de quelqu’un.</li>
    </ul>

    <p>Ce faisant, l’auteur, qui reste le dépositaire de tous les droits sur son œuvre hormis les droits de diffusions cédés à LxxL - Éducation Numérique par le présent contrat, s’engage à assumer
      toute conséquence juridique et financière en cas d’action juridique résultant
      d’un manquement à l’un de ces engagements.</p>



    <h5>4 Obligation de LxxL</h5>



    <p>Dans le cas où LxxL - Éducation Numérique accepte la
    distribution d’une œuvre, LxxL - Éducation Numérique s’engage&nbsp;:</p>
    <ul>
      <li>À publier l’œuvre sur sa plate-forme afin d’en assurer la commercialisation et la
        distribution. </li>
      <li>À mettre tout en œuvre pour assurer à l’œuvre une exploitation et une diffusion permanente et suivie.</li>
      <li>À présenter l’œuvre de manière à ne pas porter atteinte au droit moral de
        l’auteur.</li>
      <li>À ne pas modifier l’œuvre sans l’accord de l’auteur.</li>
      <li>À tenir l’auteur informé de la date de mise en ligne de son œuvre,</li>
      <li>À fournir à l’auteur un espace privé sur le site des auteurs de LxxL sur lequel
        il pourra suivre en temps réel l’usage qui sera fait de son œuvre par les
        utilisateurs. Dans le cas d'une exploitation commerciale, dans cet espace privé, l’auteur pourra également déclencher
        chaque trimestre le paiement des rétrocessions qui lui seraient dues au titre
        de cette exploitation, pour autant que les sommes dues atteignent un montant de 100&nbsp;&euro;.</li>
    </ul>


  </section>
</article>


<article id="cnil" class="widget-box">
  <header class="widget-title" data-toggle="slidify" data-parent="#accordion2" data-target="#cnil-collapse">
    <span class="icon">
      <i class="icon-th-list"></i>
    </span>
    <h5 >Respect de la vie privée - Données personnelles - CNIL</h5>
    <div class="buttons">
      <a title="Icon Title" class="btn btn-mini" href="#"><i class="icon-print"></i> Print</a>
    </div>
  </header>
  <section class="widget-content slidify" id="cnil-collapse">
    <ul syle="text-align: justify;">
      <li>
        <h5>Dispositions générales</h5>
        <p>LxxL - Education &amp; Numérique s’engage à ne jamais partager, vendre ou louer vos renseignements personnels à moins d’y être contraint par la loi. Lorsque vous nous confiez des informations personnelles, celles-ci sont uniquement disponibles auprès de nos collaborateurs afin de vous contacter  en réponse à vos demandes ou dans le cadre du suivi des productions que vous réalisez à l'aide des outils mis à disposition par LxxL, ou encore dans le cadre strict des relations commerciales qui vous lient à LxxL lorsque vous décidez de lui confier l'une de vos productions à des fins de distribution / diffusion.</p>
      </li>
      <li>
        <h5>Références juridiques</h5>
        <ul>
          <li>Loi Informatique et libertés du 6 Janvier 1978 (78-17) Les infractions pénales contre la vie privée</li>
          <li>Directive 2002/58/CE du Parlement Européen et du Conseil du 12 Juillet 2002</li>
          <li>Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN)</li>
          <li>Articles 323-1 à 323-7 du Code Pénal</li>
          <li>Article 9 du Code Civil relatif au &quot;droit au respect de la vie privée&quot;</li>
        </ul>
      </li>
      <li>
        <h5>Déclaration CNIL</h5>
        <p>En application de la Loi 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, ce site, géré par des professionnels de l'éducation, n'est pas tenu de faire une déclaration de ses clients et partenaires. Toutefois, LxxL - Education &amp; Numérique s'engage à se conformer strictement aux usages admis dans le cadre de la loi.</p>
      </li>
      <li>
        <h5>Données personnelles</h5>
        <p>Conformément à la législation française (Loi 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés), vous disposez d’un droit d’opposition, d’accès, de rectification et de suppression des données qui vous concernent.  La demande de suppression constituant une rupture de contrat, elle sera toutefois soumise aux dispositions de ce dernier, en particulier en matière de délai de prise d'effet. <br />
        Vous pouvez exercer ce droit en écrivant par courrier recommandé à :</p>
        <p style="text-align: center">
          Monsieur le président-directeur général<br />
            LxxL - Education &amp; Numérique<br />
            47 rue Meslay <br />
            75003 PARIS.
        </p>
    </ul>
    <p class="help-block">Mise à jour le mercredi 27 juillet 2011</p>
  </section>
</article>



<article id="advices" class="widget-box">
  <header class="widget-title" data-toggle="slidify" data-parent="#accordion2" data-target="#advices-collapse">
    <span class="icon">
      <i class="icon-th-list"></i>
    </span>
    <h5 >Conseils à l’illustration des œuvres des auteurs</h5>
    <div class="buttons">
      <a title="Icon Title" class="btn btn-mini" href="#"><i class="icon-print"></i> Print</a>
    </div>
  </header>
  <section class="widget-content slidify" id="advices-collapse">
    <p>Dans la conception et la proposition de
    son œuvre à LxxL, un auteur peut souhaiter utiliser des images, des musiques, des
    vidéos ou des textes, que ce soit parce que le document a un rôle central dans
    l’activité ou à des fins d’illustration.</p>

    <p>La copie sur internet de fichiers peut
    se révéler risquée juridiquement. En effet, en règle générale, les fichiers
    (photo, audio, vidéo, texte) sont protégés par un droit d’auteur. Les utiliser
    sans obtenir l’autorisation des propriétaires revient à violer leur droit
    d’auteur, comme le prévoit l’article L122-4 du Code de la Propriété
    Intellectuelle,&nbsp;«&nbsp;<i>toute représentation ou reproduction intégrale
    ou partielle faite sans le consentement de l'auteur ou de ses ayants droit ou
    ayants cause est illicite </i>».</p>

    <p>Il existe cependant des fichiers dont
    l’utilisation, bien que faisant l’objet d’un droit d’auteur, est plus libre. La loi prévoit également un &quot;droit de citation&quot;. Ce dernier est toutefois très restrictif et ne s'applique qu'à des &quot;extraits courts&quot; de textes - à l'exclusion de tout autre document sonore ou visuel - et à des fins de &quot;travail d'analyse critique&quot;.</p>

    <h5>Œuvres tombées dans le domaine public</h5>

    <p>Selon l’article L123-1 du Code de la
    Propriété Intellectuelle, «&nbsp;<i>l'auteur jouit, sa vie durant, du droit
    exclusif d'exploiter son œuvre sous quelque forme que ce soit et d'en tirer un
    profit pécuniaire. Au décès de l'auteur, ce droit persiste au bénéfice de ses
    ayants droit pendant l'année civile en cours et les soixante-dix années qui
    suivent </i>». Donc, les droits moraux de l’auteur d’une œuvre tombée dans
    le domaine public peuvent continuent d’exister.</p>

    <p>Toutefois, il est possible d’utiliser
    une œuvre tombée dans le domaine public sans avoir à payer une quelconque
    royaltie et sans avoir à demander l’autorisation du propriétaire, dans la
    mesure où l’usage fait de la reproduction de l’œuvre ne porte pas atteinte à
    son droit moral.</p>

    <p>Attention toutefois au fait qu’une œuvre
    peut tout à fait être dans le domaine public, mais pas pour la reproduction que
    l’on souhaite utiliser.<br>
    C’est ainsi que si la Joconde est dans
    le domaine public, la photographie de la Joconde peut ne pas l’être, courte par
    les droits du photographe. La Réunion des Musées Nationaux, qui gère la
    photothèque des musées Nationaux, est particulièrement vigilante à ce sujet.</p>
    <p>Des pratiques comme Creative
      Commons, Licence Art Libre, permettent à des auteurs de mettre en ligne leurs
      fichiers audio, texte, vidéo, photo et de les laisser libres d’utilisation pour
      tout le monde. L’auteur pourra donc utiliser ces photos/musiques/vidéos sans
      requérir l’autorisation du propriétaire.<br>
      Cependant, ces licences dites libres
    protègent tout de même les propriétaires et il est des règles à suivre afin
    d’utiliser légalement leurs documents.</p>
    <h5>La principale&nbsp;:
      Creative Commons</h5>

    <p>Les licences Creative Commons sont au
    nombre de 4. Les
    licences se symbolisent de la manière suivante, pour plus de clarté&nbsp;:</p>

    <div class="row-fluid">
      <div class="span6">
        <article class="widget-box">
          <header class="widget-title">
            <span class="icon">
              <i class="icon-th-list"></i>
            </span>
            <h5><img src="//i.creativecommons.org/l/by/3.0/88x31.png" style="margin-top: -8px;"> Paternité</h5>
          </header>
          <section class="widget-content">
            L’utilisateur doit attribuer l'œuvre de la manière indiquée par l'auteur de
            l'œuvre ou le titulaire des droits. L’utilisateur est libre de reproduire,
            distribuer et communiquer l'œuvre, de modifier l'œuvre et de l’utiliser à des
            fins commerciales.
          </section>
        </article>
      </div>

      <div class="span6">
        <article class="widget-box">
          <header class="widget-title">
            <span class="icon">
              <i class="icon-th-list"></i>
            </span>
            <h5><img src="//i.creativecommons.org/l/by-nc/3.0/88x31.png" style="margin-top: -8px;"> Pas
    d’utilisation commerciale</h5>
          </header>
          <section class="widget-content">
            L’utilisateur n’a pas le droit d'utiliser
    l’œuvre à des fins commerciales.
    Dans ce cas, récupérer le document afin
    d’illustrer le contenu de l’auteur serait illégal car l’auteur entend le
    réutiliser afin de commercialiser son œuvre.
          </section>
        </article>
      </div>
    </div>


    <div class="row-fluid">
      <div class="span6">
        <article class="widget-box">
          <header class="widget-title">
            <span class="icon">
              <i class="icon-th-list"></i>
            </span>
            <h5><img src="//i.creativecommons.org/l/by-nd/3.0/88x31.png" style="margin-top: -8px;"> Pas
    de travaux dérivés</h5>
          </header>
          <section class="widget-content">
 L’utilisateur n’a pas le droit de modifier, de
    transformer ou d’adapter l’œuvre.
          </section>
        </article>
      </div>

      <div class="span6">
        <article class="widget-box">
          <header class="widget-title">
            <span class="icon">
              <i class="icon-th-list"></i>
            </span>
            <h5><img src="//i.creativecommons.org/l/by-sa/3.0/88x31.png" style="margin-top: -8px;"> Partage
    à l'Identique</h5>
          </header>
          <section class="widget-content">
            Si l’utilisateur modifie, transforme ou adapte
    l’œuvre, il n'a le droit de distribuer la création que sous un contrat
    identique ou similaire à celui-ci. En utilisant un fichier placé sous cette
    licence, l’utilisateur devrait alors utiliser les mêmes licences pour son œuvre
    que celles utilisées.
          </section>
        </article>
      </div>
    </div>

    <p>Ces 4 licences peuvent se compléter et,
    ce faisant, 6 types de contrat apparaissent, générant des droits différents
    selon les contrats.</p>

    <p>Par exemple, une photo pourra être sous
    licence Creative Commons<img
    src="//i.creativecommons.org/l/by-nc-nd/3.0/88x31.png"
    />. Dans ce cas,
    il serait seulement possible de partager,
    c'est-à-dire, de reproduire, distribuer et communiquer l'œuvre.</p>

    <p>Pour plus d’information, consulter le
    site Creative Commons France&nbsp;: </p>

    <p><a
    href="//creativecommons.org/">Creative Commons</a></p>

    <p>Vous pouvez aussi consulter la page
    concernant les différentes licences&nbsp;: </p>

    <p><a
    href="//creativecommons.org/licenses">Licenses</a></p>
  </section>
</article>
</div>
-->