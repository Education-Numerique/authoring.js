/*
* @template : pages/qtiedit/informations
*/

<div class="container-fluid">
    <div class="widget-box noborder">
      <div class="alert alert-info">
        <a href="#" data-dismiss="alert" class="close">×</a>
        <h4 class="alert-heading">Besoin d'aide?</h4>
        Commencez par documenter les informations générales de votre activité ci-dessous.<br />
        Vous pouvez ensuite créer autant de pages additionnelles que souhaité (texte à trous, quizz, etc).<br />
        À tout moment, vous pouvez revenir sur ces informations en cliquant sur l'onglet "informations" à gauche.
      </div>
    
        <div class="widget-content" id="page-informations">
            <div class="control-group " style="width:60%">
                <div class="input-prepend">
                    <label class="add-on" for="form-page-title">Titre</label>
                    {{view Ember.TextField valueBinding="content.title"  classNames="span2" id="form-activity-title" placeholder="Titre de l'activité"}}
                </div>

                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Matière</label>
                    {{view LxxlLib.Em.Select contentBinding="matters.content" selectionBinding="content.matter" optionLabelPath="content.title" optionValuePath="content.id"}}
                </div>
                
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Niveau</label>
                    {{view LxxlLib.Em.Select contentBinding="levels.content" selectionBinding="content.level" optionLabelPath="content.title" optionValuePath="content.id"}}
                </div>
                
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Catégories</label>
                    {{view Em.GroupedSelect rawContentBinding="categoryTree.content" selectionBinding="content.category"}}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Durée</label>
                    {{view LxxlLib.Em.Select contentBinding="lengths.content" selectionBinding="content.duration" optionLabelPath="content.title" optionValuePath="content.id"}}
                </div>
                
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Difficulté</label>
                    {{view LxxlLib.Em.Select contentBinding="difficulties.content" selectionBinding="content.difficulty" optionLabelPath="content.title" optionValuePath="content.id"}}
                </div>
                
            </div>

            <div class="dropzone-container">
                <div class="dropzone">
                    <div class="preview default">
                    </div>
                </div>
                <button class="btn btn-large add-thumbnail">
                    <i class="icon-plus"></i>
                    <input id="fileupload" type="file" name="file" />
                    Ajouter une thumbnail
                </button>
            </div>

            <div class="input-prepend">
                    <label class="add-on" for="form-page-explanation">Description</label>
                    {{view LxxlLib.Em.Wysiwyg valueBinding="content.description" maxLength=200 classNames="redactorjs" id="form-page-explanation"}}
                </div>
        </div>
    </div>
        
</div>