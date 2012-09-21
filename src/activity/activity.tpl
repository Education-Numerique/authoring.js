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
    <h1>{{title}}</h1>
    <blockquote>{{description}}</blockquote>
    <p>Thumbnail: <img src="{{thumbnail}}" /></p>
    <p>Matter: {{matter}}</p>
    <p>Level: {{level}}</p>
    <p>Duration: {{duration}}</p>
    <p>Difficulty: {{difficulty}}</p>

    <p>Categories</p>
    <ul>
    {{#each category}}
      <li>{{this}}</li>
    {{/each}}
    </ul>

    <ul>
      {{#each pages}}
        <li>title</li>
      {{/each}}
    </ul>


  </header>
  {{#each pages}}
    <section class="{{flavor}}">
      <h2>{{title}}</h2>
      <h3>{{subtitle}}</h3>
      <blockquote>{{advice}}</blockquote>
      <p>{{coef}}</p>
      <p>{{limitedTime}}</p>
      <p>{{sequencing}}</p>
      <p>
        {{document}}
      </p>
      {{#each questions}}
      {{/each}}
    </section>
  {{/each}}
  <footer>
  </footer>
</article>

