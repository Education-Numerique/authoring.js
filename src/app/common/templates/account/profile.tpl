/*
* @template : account/profile
*/

<div class="row-fluid qti profile">
    <div class="widget-box noborder">

      <div class="widget-content">
        <form id="profile-form">
            <div class="control-group profile-fields" style="width:60%; float:left">
                <h4>Votre compte</h4>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-title">Pseudonyme</label>
                    {{view Ember.TextField valueBinding="content.username"   disabled="disabled"}}
                </div>

                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Email</label>
                    {{view Ember.TextField valueBinding="content.email"   disabled="disabled"}}
                </div>
                
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Prénom</label>
                    {{view Ember.TextField valueBinding="content.profile.firstname"   }}
                </div>
                
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Nom</label>
                    {{view Ember.TextField valueBinding="content.profile.lastname"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Discipline</label>
                    {{view LxxlLib.Em.Select contentBinding="disciplines.content" selectionBinding="discipline" optionLabelPath="content.title" optionValuePath="content.id"}}
                </div>
                <h4>Votre établissement</h4>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Nom</label>
                    {{view Ember.TextField valueBinding="content.profile.company"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Addresse</label>
                    {{view Ember.TextField valueBinding="content.profile.company-address"   }}
                </div>

                <h4>Vos informations</h4>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Téléphone</label>
                    {{view Ember.TextField valueBinding="content.profile.phone"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Adresse</label>
                    {{view Ember.TextField valueBinding="content.profile.address"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Code postal</label>
                    {{view Ember.TextField valueBinding="content.profile.zip"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Ville</label>
                    {{view Ember.TextField valueBinding="content.profile.town"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Pays</label>
                    {{view Ember.TextField valueBinding="content.profile.state"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Page web</label>
                    {{view Ember.TextField valueBinding="content.profile.web"   }}
                </div>
                <hr class="clear" />
                <div class="form-actions" style="text-align: center; padding: 0; padding-top: 20px; padding-bottom: 20px;">
                    <input id="submit" class="btn btn-primary ui-wizard-content ui-formwizard-button" type="submit" value="Valider" />
                </div>
            </div>

            <div class="dropzone-container thumbnail-uploader">
                <div class="dropzone fade">
                    <div {{bindAttr class=":preview avatar:hasThumbnail:default"}}>
                        {{#bind avatar}}
                            {{view Em.Image srcBinding="this"}}
                        {{/bind}}
                    </div>
                </div>
                <button class="btn btn-large add-thumbnail">
                    <i class="icon-plus"></i>
                    <input id="fileupload" type="file" name="file" />
                    Ajouter un avatar
                </button>

                {{log view.canDelete}}
                {{#if view.canDelete}}
                <div class="deactivate-user">
                    <button class="btn btn-large btn-danger" data-toggle="modal" href="#modal-deactivate-user">Désactiver cet utilisateur</button>
                </div>
                {{/if}}
            </div>




            
        </form>
      </div>
    </div>
</div>


<div class="modal" style="display:none" id="modal-deactivate-user">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h3>Voulez-vous vraiment désactiver cet utilisateur ?</h3>
    </div>
    <div class="modal-footer">
        <a class="btn" data-dismiss="modal">Annuler</a>
        <a class="btn btn-danger" data-dismiss="modal" {{action deactivateUser target="view" }}> Désactiver</a>
    </div>
</div>
