<div id="activity-preview-body">
  {{#each styleUri}}
    <link rel="stylesheet" href="{{data}}"></link>
  {{/each}}

  {{#each styleData}}
    <style type="text/css">
      {{data}}
    </style>
  {{/each}}

  <header>
    <!-- Titre de l'activité -->
    <h1>{{title}}</h1>

  </header>

  <!-- Sommaire -->
  <div class="row-fluid content-container">

  <aside class="span3 side-menu pull-right">
    {{#if extra.attachments.length}}
    <nav>
      <h2>Documents</h2>
      <ul class="attachments-list">
        {{#each extra.attachments}}
          <li class="{{mimetype type}}">
            <a href="{{url}}" target="_blank" title="{{name}}" rel="tooltip" data-placement="bottom">
             
            </a>
          </li>
        {{/each}}
      </ul>
    </nav>
    {{/if}}
    <nav>
      <h2>Plan de l'activité</h2>
      <ol class="pages-list">
        {{reset_index}}
        {{#each pages}}
          {{#ifequalhelp flavor.id "simple"}}
          <li class="page-simple">
          {{/ifequalhelp}}
          {{#ifequalhelp flavor.id "quizz"}}
          <li class="page-quizz">
          {{/ifequalhelp}}
          {{#ifequalhelp flavor.id "tat"}}
          <li class="page-tat">
          {{/ifequalhelp}}
          {{#ifequalhelp flavor.id "jmt"}}
          <li class="page-jmt">
          {{/ifequalhelp}}
            <a href="#">
              <!--
              <span class="icon">
                {{#ifequalhelp flavor "simple"}}
                <span class="icon-file"></span>
                {{/ifequalhelp}}
                {{#ifequalhelp flavor "quizz"}}
                <span class="icon-ok-circle"></span>
                {{/ifequalhelp}}
                {{#ifequalhelp flavor "tat"}}
                <span class="icon-text-width"></span>
                {{/ifequalhelp}}
              </span>
              -->
              {{index}}. {{title}}
            </a>
          </li>
        {{/each}}
      </ol>
    </nav>
  </aside>

<!-- Pour chaque page -->
<div class="span8 pages-container pull-left">
{{#each pages}}
  {{#ifequalhelp flavor.id "simple"}}
  <section class="page-simple" id="page-{{id}}" data-page="{{id}}">
  {{/ifequalhelp}}
  {{#ifequalhelp flavor.id "quizz"}}
  <section class="page-quizz" id="quizz-{{id}}" data-page="{{id}}">
  {{/ifequalhelp}}
  {{#ifequalhelp flavor.id "tat"}}
  <section class="page-tat" id="tat-{{id}}" data-page="{{id}}">
  {{/ifequalhelp}}
  {{#ifequalhelp flavor.id "jmt"}}
  <section class="page-jmt" id="jmt-{{id}}" data-page="{{id}}">
  {{/ifequalhelp}}
    <div>
      <!--<span class="icon">
        <i class="icon-th-list"></i>
      </span>-->
      <h5>{{title}}</h5>
      {{#if subtitle}}
      <blockquote><p>{{subtitle}}</p></blockquote>
      {{/if}}
    </div>
    <article>
      <!-- Chronomètre pour le temps limité de la page (à cacher si limitedTime, voir behaviors) -->
      <h5 class="clocker" data-chrono="{{limitedTime}}" data-binding="{{id}}"></h5>

      {{#if advice}}
      <div>{{{advice}}}</div>
      {{/if}}

      {{#ifequalhelp flavor.id "simple"}}
        <div>{{{document}}}</div>
      {{/ifequalhelp}}

      {{#ifequalhelp flavor.id "tat"}}
        <div class="wordlist"></div>

        {{#if hasDocument}}
          <div class="side-document">{{{document}}}</div>
        {{/if}}

        <div>
          <p>{{{tat}}}</p>
        </div>
        <div>
          <p><button id="tat-{{id}}-check">Vérifier mes réponses</button></p>
        </div>

        <div class="modal conclusion hide" role="dialog" aria-hidden="true">
          <div class="modal-header">
            <h3>Exercice terminé!</h3>
          </div>
          <div class="modal-body">
            Résultat: <span class="feedback">100%</span>
          </div>
          <div class="modal-footer">
              <a class="btn btn-primary" onclick="$(this).parent().parent().modal('hide');">Ok</a>
          </div>
        </div>
        <div class="modal feedback hide" role="dialog" aria-hidden="true">
          <div class="modal-header">
            <h3>Mmmm...</h3>
          </div>
          <div class="modal-body">
            Pas encore... Essaie avec un indice?
          </div>
          <div class="modal-footer">
              <a class="btn btn-primary" onclick="$(this).parent().parent().modal('hide');">Ok</a>
          </div>
        </div>
      {{/ifequalhelp}}
      {{#ifequalhelp flavor.id "jmt"}}

        <div class="span12 row-fluid mix-and-match">
        {{#if hasDocument}}
          <div class="side-document">{{{document}}}</div>
        {{/if}}

          <ul class="span8  questions">
            {{#each questions}}
              <li class="row-fluid " id="">
                <div class="span6 title">{{{text}}}</div>
                <div class="span6 response"></div>
              </li>
            {{/each}}
          </ul>
          <ul class="span4 propositions">
            {{#each questions}}
              {{#each answers}}
                <li>{{{text}}}</li>
              {{/each}}
            {{/each}}
          </ul>
        </div>

        <div class="modal conclusion hide" role="dialog" aria-hidden="true">
          <div class="modal-header">
            <h3>Exercice terminé!</h3>
          </div>
          <div class="modal-body">
            Résultat: <span class="feedback">100%</span>
          </div>
          <div class="modal-footer">
              <a class="btn btn-primary" onclick="$(this).parent().parent().modal('hide');">Ok</a>
          </div>
        </div>

      {{/ifequalhelp}}

      {{#ifequalhelp flavor.id "quizz"}}
        {{#if hasDocument}}
          <div class="side-document">{{{document}}}</div>
        {{/if}}
        <div>
            <dl>
          {{reset_index "qid"}}
          {{#each questions}}
              <dt id="questions-{{../id}}-{{index 'qid'}}">{{{text}}}</dt>
              <dd>
                {{#if isQRM}}
                <ul class="qrm">
                  {{reset_index "aid"}}
                  {{#each answers}}
                  <li id="answer-{{index 'aid'}}">
                  <form>
                      <input type="radio" name="ans" value="true" /> Oui <input type="radio" name="ans" value="" /> Non:&nbsp;{{text}}
                      <div class="modal hide" role="dialog" aria-hidden="true">
                        <div class="modal-header">
                          <h3>Mmm... Pas tout à fait (<span class="feedback"></span>). Voici un indice.</h3>
                        </div>
                        <div class="modal-body">
                          {{comment}}
                        </div>
                        <div class="modal-footer">
              <a class="btn btn-primary" onclick="$(this).parent().parent().modal('hide');">Ok</a>
                        </div>
                      </div>
                  </form>
                  </li>
                  {{/each}}
                  <button disabled="disabled">Vérifier mes réponses</button>
                  <div class="modal hide" role="dialog" aria-hidden="true">
                    <div class="modal-header">
                      <h3>Ok!</h3>
                    </div>
                    <div class="modal-body">
                      Pas mal...
                    </div>
                    <div class="modal-footer">
              <a class="btn btn-primary" onclick="$(this).parent().parent().modal('hide');">Ok</a>
                    </div>
                  </div>
                </ul>
                {{else}}
                <ul class="qcm">
                  {{reset_index "aid"}}
                  {{#each answers}}
                  <li id="answer-{{index 'aid'}}">
                    <button>?</button>
                    {{text}}
                    <div class="modal hide" role="dialog" aria-hidden="true">
                      <div class="modal-header">
                        <h3>Mauvaise réponse, mais voici un indice:</h3>
                      </div>
                      <div class="modal-body">
                        {{comment}}
                      </div>
                      <div class="modal-footer">
              <a class="btn btn-primary" onclick="$(this).parent().parent().modal('hide');">Ok</a>
                      </div>
                    </div>
                  </li>
                  {{/each}}
                </ul>


                {{/if}}
      <!--                    {{isCorrect}}
                    {{weight}} -->
              </dd>
          {{/each}}
            </dl>

          <div class="modal conclusion hide" role="dialog" aria-hidden="true">
            <div class="modal-header">
              <h3>Exercice terminé!</h3>
            </div>
            <div class="modal-body">
              Résultat: <span class="feedback">100%</span>
            </div>
            <div class="modal-footer">
              <a class="btn btn-primary" onclick="$(this).parent().parent().modal('hide');">Ok</a>
            </div>
          </div>

        </div>
      {{/ifequalhelp}}



    </article>
  </section>

{{/each}}
</div>
</div>










  <section class="widget-box">
    <!-- <header class="widget-title">
      <span class="icon">
        <i class="icon-th-list"></i>
      </span>
      <h5></h5>
    </header> -->
    <div class="widget-content nopadding">
 
      <ul class="pages-content span9" style="margin: auto; list-style-type: none;">
        {{#each pages}}
          <li style="margin: 10px;">


            {{#ifequalhelp flavor "quizz"}}
              {{#each questions}}
                <p>{{text}}</p>
<!--              {{coef}} -->
                <ul>
                  {{#each answers}}
                  <li>
                    <input type="radio" />
                    {{text}} <quote>{{comment}}</quote>
<!--                    {{isCorrect}}
                    {{weight}} -->
                  </li>
                  {{/each}}
                </ul>
              {{/each}}
            {{/ifequalhelp}}

            {{#ifequalhelp flavor "quizzMulti"}}
              {{#each questions}}
                <p>{{text}}</p>
<!--              {{coef}} -->
                <ul>
                  {{#each answers}}
                  <li>
                    <input type="checkbox" />
                    {{text}} <quote>{{comment}}</quote>
<!--                    {{isCorrect}}
                    {{weight}} -->
                  </li>
                  {{/each}}
                </ul>
              {{/each}}
            {{/ifequalhelp}}



          </li>
        {{/each}}
      </ul>
    </div>
  </section>
<!--
  <div class="modal hide" id="modal-preview-tat" role="dialog" aria-labelledby="modal-preview-tat-label" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close" onclick="$(event.target.parentNode.parentNode).modal('hide');" aria-hidden="true">×</button>
      <h3 id="modal-preview-tat-label">Que doit-il y avoir à la place du trou?</h3>
    </div>
    <div class="modal-body">
      <p id="modal-preview-tat-body"></p>
    </div>
    <div class="modal-footer">
      <a class="btn" onclick="$(event.target.parentNode.parentNode).modal('hide');">Annuler</a>
      <a class="btn btn-primary" onclick="$(event.target.parentNode.parentNode).modal('hide');">Valider</a>
    </div>
  </div>
  <div id="navpreview">
    <a class="btn btn-large disabled">Page précédente</a>
    <a class="btn btn-large disabled">Page suivante</a>
    <a class="btn btn-large btn-primary disabled">Finir</a>
  </div>
-->
</div>
