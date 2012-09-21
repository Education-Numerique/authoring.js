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
    <p>Matter: {{matter.title}}</p>
    <p>Level: {{level.title}}</p>
    <p>Duration: {{duration.title}}</p>
    <p>Difficulty: {{difficulty.title}}</p>
    <p>Categories</p>
    <ul>
    {{#each category}}
      <li>{{title}}</li>
    {{/each}}
    </ul>

</article>

