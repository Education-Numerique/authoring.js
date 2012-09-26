<article id="activity-preview-body">
  {{#each styleUri}}
    <link rel="stylesheet" href="{{data}}"></link>
  {{/each}}

  {{#each styleData}}
    <style type="text/css">
      {{data}}
    </style>
  {{/each}}

  <header>
    {{#if img}}
    <img style="float: left; max-width: 100px;" src="{{img}}" />
    {{else}}
    <img style="float: left; max-width: 100px;" src="data:image/jpeg;base64,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" />
    {{/if}}
    <h1>{{title}}</h1>
    <blockquote>{{{description}}}</blockquote>
    <table class="table table-bordered data-table dataTable">
      <thead>
        <tr>
          <th>Matière</th>
          <th>Niveau</th>
          <th>Durée</th>
          <th>Difficulté</th>
          <th>Catégories</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{matter.title}}</td>
          <td>{{level.title}}</td>
          <td>{{duration.title}}</td>
          <td>{{difficulty.title}}</td>
          <td>
            <ul>
            {{#each category}}
              <li>{{title}}</li>
            {{/each}}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </header>

  <section class="widget-box qti">
    <header class="widget-title">
      <span class="icon">
        <i class="icon-th-list"></i>
      </span>
      <h5></h5>
    </header>
    <div class="widget-content nopadding">
      <ul class="span3 pages-list" style="width: 20%; height: 100%; min-width: 100px; overflow: hidden;">
        {{#each pages}}
          {{#ifequal flavor "staticPage"}}
          <li class="page-static">
          {{/ifequal}}
          {{#ifequal flavor "quizz"}}
          <li class="page-quizz">
          {{/ifequal}}
          {{#ifequal flavor "tat"}}
          <li class="page-tat">
          {{/ifequal}}
            <a>
              <span class="icon">
                {{#ifequal flavor "staticPage"}}
                <span class="icon-file"></span>
                {{/ifequal}}
                {{#ifequal flavor "quizz"}}
                <span class="icon-ok"></span>
                {{/ifequal}}
                {{#ifequal flavor "tat"}}
                <span class="icon-text-width"></span>
                {{/ifequal}}
              </span>
              <span class="page-title">{{title}}</span>
            </a>
          </li>
        {{/each}}
      </ul>
      <ul class="pages-content span9" style="margin: auto; list-style-type: none;">
        {{#each pages}}
          <li style="margin: 10px;">
            <h3 style="text-align: right;">{{title}}</h3>
            {{#if subtitle}}
            <blockquote style="text-align: right;">{{subtitle}}</blockquote>
            {{/if}}

            {{#if advice}}
            <h4>{{{advice}}}</h4>
            {{/if}}

            {{#if document}}
            <p>{{{document}}}</p>
            {{/if}}

            {{coef}}
            {{limitedTime}}
            {{sequencing}}

            {{#each questions}}
              <p>{{text}}</p>
              {{coef}}
              <ul>
                {{#each answers}}
                <li>
                  {{text}}
                  {{comment}}
                  {{isCorrect}}
                  {{weight}}
                </li>
                {{/each}}
              </ul>
            {{/each}}
          </li>
        {{/each}}
      </ul>
    </div>
  </section>
</article>

