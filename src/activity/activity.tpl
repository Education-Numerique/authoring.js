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
    <img style="float: left;" src="{{thumbnail}}" />
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
  <header>


  <section class="widget-box qti">
    <header class="widget-title">
      <span class="icon">
        <i class="icon-th-list"></i>
      </span>
      <h5>{{title}}, {{state}}</h5>
    </header>
    <div class="widget-content nopadding">
      <ul class="pages-list" style="float: left; width: 20%;min-width: 100px; overflow: hidden;">
        {{#each pages}}
          <li class="page-quizz active XXXICONFLAVOR">
            <a>
              <span class="icon"><span class="icon-ok"></span></span>
              <span class="page-title">{{title}}</span>
            </a>
          </li>
        {{/each}}
      </ul>
      <div>

      </div>
    </div>

  </section>
</article>

