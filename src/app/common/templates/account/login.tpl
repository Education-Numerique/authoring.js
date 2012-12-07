/*
* @template : account/login
*/



<div class="row-fluid ">


    <div class="widget-box">
        <div class="widget-content">
            <form id="loginform" class="form-horizontal">
                <div id="step-login" class="step">
                    <p>En vous connectant, vous pourrez créer vos propres activités.</p>
                    <div class="alert alert-error login-error-box" style="display:none">
                        Email inconnu ou mauvais mot de passe
                        <a href="#" data-dismiss="alert" class="close">×</a>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <div class="input-prepend">
                                <span class="add-on"><i class="icon-user"></i></span><input type="text" id="email" name="email" placeholder="Addresse mail" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <div class="input-prepend">
                                <span class="add-on"><i class="icon-lock"></i></span><input type="password" id="password" name="password" placeholder="Mot de passe" />
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <span class="pull-left">
                            <a {{action showAccountRegister href=true}} class="flip-link" id="to-recover">Pas encore de compte?</a><br />
                            <a {{action showAccountReminder href=true}} class="flip-link" id="to-recover">Mot de passe oublié? </a>
                        </span>
                        <span class="pull-left"><input type="submit" style="margin-left:50px;" class="btn btn-inverse" value="Se connecter" /></span>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
