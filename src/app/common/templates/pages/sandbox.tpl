/*
* @template : pages/sandbox
*/

<div class="row-fluid ">
  <div class="widget-box">
    <div class="widget-title">
      <h5>Statistiques</h5>
    </div>
    <div class="widget-content center">
      <ul class="stats-plain">
        <li>                    
          <h4>{{nbActivities}}</h4>
          <span>Activités</span>
        </li>
        <li>                    
          <h4>{{nbAuthors}}</h4>
          <span>Auteurs</span>
        </li>
        <li>                    
          <h4>{{nbCategories}}</h4>
          <span>Catégories</span>
        </li>
      </ul>
    </div>

    <div class="widget-content">
      <div class="span6">
        <div class="widget-box">
          <div class="widget-title">
            <span class="icon">
              <i class="icon-signal"></i>
            </span>
            <h5>Répartition des activités par catégorie</h5>
          </div>
          <div class="widget-content">
            <div class="pie"></div>
          </div>
        </div>
      </div>

      <div class="span6">
        <div class="widget-box">
          <div class="widget-title">
            <span class="icon">
              <i class="icon-eye-open"></i>
            </span>
            <h5>Top auteur</h5>
          </div>
          <div class="widget-content nopadding">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Auteurs</th>
                  <th>Nombre de QTIs</th>
                </tr>
              </thead>
              <tbody>
                {{#each view.top}}
                <tr>
                  <td>{{name}}</td>
                  <td>{{nb}}</td>
                </tr>
                {{/each}}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="widget-box">
    <div class="widget-title">
      <h5>Liste des activités dans la sandbox</h5>
    </div>
    <div class="widget-content nopadding">
      <table class="table table-bordered data-table">
        <thead>
          <tr style="cursor: pointer; table-striped with-check">
            <th class="user-reviewer2" style="width: 10px;"></th>
            <th style="width: 10px;"></th>
            <th>Titre</th>
            <th>Category</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {{#each qti}}
            <tr>
            <!--
              regarder le mixin no text dans roxee / + unselectable 

            -->
              <td class="user-reviewer2"><button {{action showEditQTI this href=true}} class="icon-edit"></button></td>
              <td><button {{action showPlayQTI this href=true}} class="icon-eye-open"></button></td>
              <td>{{title}}</td>
              <td>{{category}}</td>
              <td>{{author}}</td>
            </tr>
          {{/each}}
        </tbody>
      </table>  
    </div>
  </div>

</div>

