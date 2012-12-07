/*
* @template : account/profile
*/

<div class="row-fluid qti profile">
    <div class="widget-box noborder">

      <div class="widget-content">

            <div class="control-group profile-fields" style="width:60%; float:left">
                <h4>Votre compte</h4>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-title">Pseudonyme</label>
                    {{view Ember.TextField valueBinding="user.username"   disabled="disabled"}}
                </div>

                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Email</label>
                    {{view Ember.TextField valueBinding="user.email"   disabled="disabled"}}
                </div>
                
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Prénom</label>
                    {{view Ember.TextField valueBinding="user.profile.firstname"   }}
                </div>
                
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Nom</label>
                    {{view Ember.TextField valueBinding="user.profile.lastname"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Discipline</label>
                    {{view LxxlLib.Em.Select contentBinding="lengths.content" selectionBinding="user.duration" optionLabelPath="user.title" optionValuePath="user.id"}}
                </div>
                <h4>Votre établissement</h4>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Nom</label>
                    {{view Ember.TextField valueBinding="user.profile.company"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Addresse</label>
                    {{view Ember.TextField valueBinding="user.profile.company-address"   }}
                </div>

                <h4>Vos informations</h4>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Téléphone</label>
                    {{view Ember.TextField valueBinding="user.profile.phone"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Adresse</label>
                    {{view Ember.TextField valueBinding="user.profile.address"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Code postal</label>
                    {{view Ember.TextField valueBinding="user.profile.zip"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Ville</label>
                    {{view Ember.TextField valueBinding="user.profile.town"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Pays</label>
                    {{view Ember.TextField valueBinding="user.profile.state"   }}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Page web</label>
                    {{view Ember.TextField valueBinding="user.profile.web"   }}
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
            </div>
      </div>
    </div>
</div>
