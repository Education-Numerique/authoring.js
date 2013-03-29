/*
* @template : application/root
*/
  {{view view.navigationView}}

  <article id="content" role="main">
    <header id="content-header">
      <h1>{{pageTitle}}</h1>
    </header>

    <section id="breadcrumb">
      <a {{action showActions href="true"}}><i class="icon-home"></i> {{localize breadHome}}</a>

      {{#each breadcrumbs}}
        <a {{bindAttr class="className"}}>{{displayName}}</a>
      {{/each}}
    </section>

    <section class="container-fluid" id="mainsection">
      <div id="already-locked" class="alert error hide">
       <a class="close" data-dismiss="alert" href="#">&times;</a>
        L'application est déjà ouverte dans un autre onglet.<br />
        Si vous modifiez une activité simultanément dans les deux onglets, des problèmes vont apparaitre...<br />
        Il est conseillé de fermer l'un des deux onglets.
     </div>

      {{outlet}}
    </section>

    <footer id="footer">
      <p>{{localize copyright}}
        <a href="#" onclick="$('#modal-cgu').modal({backdrop: true, show: 'true'}); return false;">{{localize conditions}}</a>
      </p>
    </footer>
   </article>




  <div class="modal hide" id="modal-cgu" tabindex="-1" role="dialog" aria-labelledby="modal-cgu" aria-hidden="true">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>Conditions d'utilisation des services d'Éducation &amp; Numérique</h3>
    </div>
    <div class="modal-body">
         <p align="center"><strong>CONDITIONS GENERALES D’UTILISATION</strong><br />
          CHARTE DES AUTEURS</p>
        <p align="center"><strong>&nbsp;</strong></p>
    <ol syle="text-align: justify;">
      <li><strong>Généralités</strong>
        <p>La présente Charte tient lieu de contrat entre l'Auteur et l’Association Éducation&nbsp;&amp;&nbsp;Numérique. En cochant la case <em>&quot;J'ai pris connaissance des conditions générales et je les accepte.&quot; </em>au bas du formulaire d'inscription, l'Auteur accepte les conditions décrites ci-dessous&nbsp;:</p>
        <ul>
          <li>L’Association Éducation &amp; Numérique met à disposition des enseignants la plateforme ELLENA, un environnement auteur gratuit pour créer, organiser puis publier dans le Vivier des activités pédagogiques. Au sens du Code de la Propriété Intellectuelle (loi n° 92-597 du 1er&nbsp;juillet 1992), ces activités ont le statut d’œuvre de l’esprit.</li>
          <li>L’auteur conserve tous les droits de propriété intellectuelle sur son œuvre.</li>
          <li>L’auteur accepte que son œuvre soit distribuée <strong>gratuitement</strong>, dans le Vivier, par l’association Éducation&nbsp;&amp;&nbsp;Numérique auprès de son public (lycéens, étudiants, mais aussi collègues enseignants, parents…).</li>
          <li>Le Vivier est un service web qui donne accès à l’ensemble des activités publiées par les auteurs.<br /><br /></li>
          </ul>
          </li><li><strong>Droits des auteurs</strong></li>
          <ul>
          <li>Toutes les activités conçues dans l’environnement auteur de l’Association Éducation&nbsp;&amp;&nbsp;Numérique et publiées dans le Vivier de contenus, ont le statut juridique d'œuvres de l'esprit protégées par le Code de la Propriété Intellectuelle. Selon l’article L111.1&nbsp;«&nbsp;<em>L'auteur d'une œuvre de l'esprit jouit sur cette œuvre, du seul fait de sa création, d'un droit de propriété incorporelle exclusif et opposable à tous.</em>&nbsp;»&nbsp;</li>
          <li>L'auteur dispose d'un droit moral imprescriptible qui lui permet de jouir du droit au respect de son nom, de sa qualité et de son œuvre. Cela lui donne le droit de paternité de l'œuvre (L113-1 Code de la Propriété Intellectuelle) et de repentir (L121-4 Code de la Propriété Intellectuelle).</li>
          <li>L’auteur peut effectuer toutes les modifications qu’il jugerait nécessaires sur son œuvre, tout au long de son engagement avec l’association Éducation&nbsp;&amp;&nbsp;Numérique.</li>
          <li>La relation entre l’auteur et l’Association Éducation&nbsp;&amp;&nbsp;Numérique ne constitue pas une exclusivité de diffusion. L’auteur peut diffuser son œuvre auprès de tiers, dans un but commercial ou non, dès lors que ce tiers accepte réciproquement que son œuvre puisse être distribuée par l’Association Éducation&nbsp;&amp;&nbsp;Numérique.</li>
          <li>L’auteur est libre de demander la suspension de&nbsp; la diffusion de son œuvre par l’Association Éducation&nbsp;&amp;&nbsp;Numérique à tout moment, par mail adressé à&nbsp;: <a href="mailto:contact@education-et-numerique.org">contact@education-et-numerique.org</a>.<br /><br /></li>
          </ul>
          <li><strong>Obligation des auteurs</strong></li>
        <p>Pour être publiée dans le Vivier de l’association Éducation&nbsp;&amp;&nbsp;Numérique, l’œuvre doit se présenter comme une séquence complète et exhaustive autour d’une notion constituant une unité pédagogique.<br />
          L’auteur, en proposant à l’Association Éducation&nbsp;&amp;&nbsp;Numérique la distribution de son œuvre, s’engage&nbsp;:</p>
        <ul>
          <li>À publier des contenus répondant tant au plan du fond que de la forme au niveau d’exigence et de qualité que Éducation &amp; Numérique souhaite promouvoir. </li>
          <li>À garantir qu’il possède les droits, licences et autorisations nécessaires sur l’ensemble des contenus constituant son œuvre.</li>
          <li>À garantir de ne pas utiliser de contenus appartenant à une tierce personne, sauf autorisation formelle de cette tierce personne.</li>
          <li>À ne pas proposer de contenus contenant des propos insultants, diffamatoires, discriminatoires. De même il s’interdit de déposer du contenu contraire à l’ordre public et aux bonnes mœurs incitant à la haine raciale, faisant l’apologie de crimes contre l’humanité ou contenant des propos révisionnistes ou pédopornographiques.</li>
          <li>À ne pas déposer de contenu qui porterait atteinte à la vie privée de quelqu’un ou un contenu qui bafouerait le droit d’auteur de quelqu’un. </li>
        </ul>
        <p>Ce faisant, l’auteur qui accepte que son œuvre soit distribuée par l’association, reste le dépositaire de tous les droits sur son œuvre. L’auteur par le présent accord, s’engage à assumer toute conséquence juridique et financière en cas d’action juridique résultant d’un manquement à l’un de ces engagements.</p>

          <li><strong>&nbsp;Obligation de l’association </strong><strong>Éducation &amp; Numérique </strong></li>
        <p>L’Association Éducation&nbsp;&amp;&nbsp;Numérique s’engage&nbsp;:</p>
        <ul>
          <li>À mettre tout en œuvre pour assurer à l’œuvre une diffusion permanente et suivie.</li>
          <li>À présenter l’œuvre de manière à ne pas porter atteinte au droit moral de l’auteur.</li>
          <li>À ne pas modifier l’œuvre sans l’accord de l’auteur.</li>
          <li>À fournir à l’auteur un espace privé sur l’environnement auteur, dans lequel il pourra créer et organiser ses activités (ou séquences pédagogiques) mais aussi suivre en temps réel l’usage fait de son œuvre par les utilisateurs. </li>
        </ul>
        <p>Pour plus d’informations sur les questions de propriété intellectuelle, rendez-vous sur les FAQ du site de l’association&nbsp; <a href="http://www.education-et-numerique.org/faq-2/" target="_blank">http://www.education-et-numerique.org/faq-2/</a><br />
          Pour la conformité de nos activités avec les exigences de la CNIL <a href="#" onclick="$('#modal-cgu').modal('hide');$('#modal-cnil').modal({backdrop: true, show: 'true'}); return false;">cliquez ici</a>.</p>
    </ol>
    </div>

    <div class="modal-footer">
    </div>
  </div>

  <div class="modal hide" id="modal-cnil" tabindex="-1" role="dialog" aria-labelledby="modal-cnil" aria-hidden="true">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>CNIL: respect de la vie privée, données personnelles</h3>
    </div>

    <div class="modal-body">
      <ul syle="text-align: justify;">
        <li>
          <h5>Dispositions générales</h5>
          <p>Éducation &amp; Numérique s’engage à ne jamais partager, vendre ou louer vos renseignements personnels à moins d’y être contraint par la loi. Lorsque vous nous confiez des informations personnelles, celles-ci sont uniquement disponibles auprès de nos collaborateurs afin de vous contacter  en réponse à vos demandes ou dans le cadre du suivi des productions que vous réalisez à l'aide des outils mis à disposition par l'association Éducation &amp; Numérique.</p>
        </li>
        <li>
          <h5>Références juridiques</h5>
          <ul>
            <li>Loi Informatique et libertés du 6 Janvier 1978 (78-17) Les infractions pénales contre la vie privée</li>
            <li>Directive 2002/58/CE du Parlement Européen et du Conseil du 12 Juillet 2002</li>
            <li>Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN)</li>
            <li>Articles 323-1 à 323-7 du Code Pénal</li>
            <li>Article 9 du Code Civil relatif au &quot;droit au respect de la vie privée&quot;<br /><br /></li>
          </ul>
        </li>
        <li>
          <h5>Déclaration CNIL</h5>
          <p>En application de la Loi 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, ce site, géré par des professionnels de l'éducation, n'est pas tenu de faire une déclaration de ses clients et partenaires. Toutefois, l'association Éducation &amp; Numérique s'engage à se conformer strictement aux usages admis dans le cadre de la loi.</p>
        </li>
        <li>
          <h5>Données personnelles</h5>
          <p>Conformément à la législation française (Loi 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés), vous disposez d’un droit d’opposition, d’accès, de rectification et de suppression des données qui vous concernent.  La demande de suppression constituant une rupture de contrat, elle sera toutefois soumise aux dispositions de ce dernier, en particulier en matière de délai de prise d'effet. <br />
          Vous pouvez exercer ce droit en écrivant par courrier recommandé à :</p>
          <p style="text-align: center">
            Monsieur le président-directeur général<br />
              Association Éducation &amp; Numérique<br />
              47 rue Meslay <br />
              75003 PARIS.
          </p>
      </ul>
      <p>Consultez les <a href="#" onclick="$('#modal-cnil').modal('hide');$('#modal-cgu').modal({backdrop: true, show: 'true'}); return false;">Conditions Générales d'Utilisation</a><br />
      <span class="help-block">Mise à jour le mercredi 27 juillet 2011</span></p>
    </div>
    <div class="modal-body">
    </div>
  </div>

<!--   <div class="modal hide" id="already-locked" role="dialog" aria-hidden="true">
    <div class="modal-header">
      <h3>Application déjà utilisée</h3>
    </div>
    <div class="modal-body">
      L'application est déjà ouverte dans un autre onglet.<br />
      Veuillez fermer l'un des deux avant de poursuivre.
    </div>
  </div>
 -->

  {{view view.footerView}}
