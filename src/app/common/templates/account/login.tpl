/*
* @template : account/login
*/



<div class="row-fluid ">


    <div class="widget-box">
        <div class="widget-content">
            <form id="loginform" class="form-horizontal">
                <div id="step-login" class="step">
                    <p>Connectez-vous pour créer vos propres activités.</p>
                    <div class="alert alert-error login-error-box" style="display:none">
                        Email inconnu ou mauvais mot de passe ... Êtes-vous inscrit ?
                        <a href="#" data-dismiss="alert" class="close">×</a>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <div class="input-prepend" style="width:40%">
                                <span class="add-on"  style="float:left"><i class="icon-user" ></i></span><input type="text" style="float:left" id="email" name="email" placeholder="Adresse électronique" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <div class="input-prepend"  style="width:40%">
                                <span class="add-on"  style="float:left"><i class="icon-lock"></i></span><input type="password" style="float:left" id="password" name="password" placeholder="Mot de passe" />
                            </div>
                        </div>
                    </div>
                    <div class="form-actions" style="margin-top:20px">
                        <span class="pull-left" style="padding-left:40px;">
                            <a {{action showAccountRegister href=true}} class="flip-link" id="to-recover"><b>Pas encore de compte ? Inscrivez-vous !</b></a><br />
                            <a {{action showAccountReminder href=true}} class="flip-link" id="to-recover">Mot de passe oublié ? </a>
                        </span>
                        <span class="pull-left"><input type="submit" style="margin-left:50px;" class="btn btn-inverse" value="Se connecter" /></span>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
