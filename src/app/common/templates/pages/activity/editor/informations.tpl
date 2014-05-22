/*
* @template : pages/activity/editor/informations
*/

<div class="container-fluid">
    <div class="widget-box noborder">

        <div class="widget-content" id="page-informations">
            <div class="control-group " style="width:100%">
                <div style='width:500px; float:left;'>
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

                {{#if categoryTree.content.length}}
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Programme</label>
                    {{view Em.GroupedSelect rawContentBinding="categoryTree.content" selectionBinding="content.category"}}
                </div>
                {{/if}}

                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Durée</label>
                    {{view LxxlLib.Em.Select contentBinding="lengths.content" selectionBinding="content.duration" optionLabelPath="content.title" optionValuePath="content.id"}}
                </div>
                
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Difficulté</label>
                    {{view LxxlLib.Em.Select contentBinding="difficulties.content" selectionBinding="content.difficulty" optionLabelPath="content.title" optionValuePath="content.id"}}
                </div>
                
        </div>

                <div class="dropzone-container thumbnail-uploader">
                <div class="dropzone fade">
                    <div {{bindAttr class=":preview content.thumbnailUrl:hasThumbnail:default"}}>
                        {{#bind content.thumbnailUrl}}
                            {{view Em.Image srcBinding="this"}}
                        {{/bind}}
                    </div>
                </div>
                <span class="btn btn-success add-thumbnail">
                    <i class="icon-plus icon-white"></i>
                    <input id="fileupload" type="file" name="file" />
                    Ajouter une vignette
                </span>
            </div>
            
        </div>

            <!-- pour mettre une vignette reco : jpg/png max, 200x200 px -->            

            <div style='clear:both;'></div>

           
           <div class="widget-box" id='textarea-description'>
        <div class="widget-title" data-toggle="slidify" data-target="#page-document">
            <span class="icon">
                <i class="icon-pencil"></i>
            </span>
            <h5>Document</h5>
        </div>
        <div class="widget-content slidify-on nopadding" id="page-document">
            {{view LxxlLib.Em.Wysiwyg valueBinding="content.description" buttons="bold,italic" maxLength=200 classNames="redactorjs 4lines" id="form-page-explanation"}}
        </div>
    </div>          
           
        </div>
    </div>

    <div class="widget-box questions-toolbar attachments noborder">
        <div class="widget-title">
            <span class="icon">
                <i class="icon-file"></i>
            </span>
            <h5>Fichiers joints&nbsp;&nbsp; <span style='font-weight:normal !important; font-size:12px; font-style:italic;'> (Formats: pdf | Poids max: 2,5Mo)</span></h5>
            <div class="btn btn-mini btn-success add-file"><i class="icon-plus icon-white spacify"></i><input id="fileattachmentupload" type="file" name="fileupload" />Ajouter un fichier</div>
        </div>
        <div class="widget-content">
            <div class="dropzone">Déposer un ou plusieurs fichiers ici<div class="upload-ok" style="display:none"></div></div>
            <div class="alert alert-error attachments-error" style="display:none">
                <button type="button" class="close" data-dismiss="alert">×</button>
                <span></span>
              
            </div>
            {{#collection view.AttachmentsList contentBinding="content.extra.attachments" classNames="attachments-list" tagName="ul"}}
                <a {{bindAttr href="view.content.url"}} target="_blank">
                    <div {{bindAttr class=":illustration view.type"}}></div>
                    {{view.content.name}}
                    <button type="button" {{action deleteAttachment target="view"}}class="btn btn-danger btn-mini delete" ><i class="icon-remove icon-white full-opacity"></i></button>
                </a>
            {{/collection}}

        </div>
    </div>
</div>