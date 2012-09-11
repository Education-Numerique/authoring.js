/*
* @template : pages/sandbox
*/

<section class="container-fluid">


  <div class="widget-box">
    <div class="widget-title">
      <h5>Liste des activités dans la sandbox</h5>
    </div>
    <div class="widget-content nopadding">
      <table class="table table-bordered data-table">
        <thead>
          <tr style="cursor: pointer; table-striped with-check">
            <th>Modifier</th>
            <th>Jouer</th>
            <th>Author</th>
            <th>Category</th>
            <th>Titre</th>
          </tr>
        </thead>
        <tbody>
          {{#each qti}}
            <tr>
              <td class="">{{author}}</td>
              <td>{{author}}</td>
              <td>{{category}}</td>
              <td>{{title}}</td>
            </tr>
          {{/each}}
        </tbody>
      </table>  
    </div>
  </div>

</section>

