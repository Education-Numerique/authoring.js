/*
* @template : pages/qtiedit
*/
<form class="form-horizontal">
<div class="row-fluid qti">
    <div class="span10">
        
        <div class="widget-box">
            <div class="widget-title">
                <div class="qti-title">
                    <span class="icon"><span class="icon-edit"></span></span>
                    <h5>Mon super dd QTI</h5>
                </div>
                <ul class="nav nav-tabs">
                    <li class=""><a href="#infos">Infos</a></li>
                    <li class="active"><a  href="#edit">Pages</a></li>
                    <li><a  href="#admin">Gérer</a></li>
                </ul>
                
            </div>
            <div class="widget-content nopadding">
                <div class="panel-left ">
                    <div class="widget-content tab-content main-tab-container nopadding">
                        <div id="infos" class="tab-pane ">This is a Tab Two Content</div>
                        <div id="edit" class="tab-pane active">
                            <div class="container-fluid">
                                <div class="widget-box">
                                    <div class="widget-title" data-toggle="slidify" data-target="#page-informations">
                                        <span class="icon">
                                            <i class="icon-wrench"></i>
                                        </span>
                                        <h5>Informations</h5>
                                    </div>
                                    <div class="widget-content slidify-on" id="page-informations">
                                        
                                        <div class="control-group">
                                            <div class="input-prepend">
                                                <label class="add-on" for="form-page-title">Titre</label>
                                                <input class="span2" id="form-page-title" name="form-page-title" type="text" placeholder="Identifiez la nature du texte" />
                                            </div>
                                            <div class="input-prepend">
                                                <label class="add-on" for="form-page-subtitle">Sous-titre</label>
                                                <input class="span2" id="form-page-subtitle" name="form-page-subtitle"  type="text" placeholder="Sous-titre de la page" />
                                            </div>
                                            <div class="input-prepend">
                                                <label class="add-on" for="form-page-explanation">Consigne</label>
                                                <textarea id="form-page-explanation" class="mceSimple" name="form-page-explanation"></textarea>
                                            </div>
                                        </div>
                                        <div class="options">

                                        </div>
                                    </div>
                                </div>
                                <div class="widget-box">
                                    <div class="widget-title" data-toggle="slidify" data-target="#page-document">
                                        <span class="icon">
                                            <i class="icon-pencil"></i>
                                        </span>
                                        <h5>Document</h5>
                                    </div>
                                    <div class="widget-content slidify" id="page-document">
                                        <div class="control-group">
                                            <textarea name="page-document"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-box">
                                    <div class="widget-title" data-toggle="slidify" data-target="#page-questions">
                                        <span class="icon">
                                            <i class="icon-th-list"></i>
                                        </span>
                                        <h5>Questions</h5>
                                    </div>
                                    <div class="widget-content slidify" id="page-questions">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </div>
                                </div>
                            </div>
                            <div id="page-management" class="panel-right">
                                <div class="panel-title">
                                    <h5>Pages</h5>
                                    <div class="buttons">
                                        <a id="add-event" data-toggle="modal" href="#modal-add-event" class="btn btn-success btn-mini"><i class="icon-plus icon-white"></i>Ajouter une page</a>
                                        <div class="modal hide" id="modal-add-event">
                                             <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal">×</button>
                                                <h3>Add a new event</h3>
                                            </div>
                                            <div class="modal-body">
                                                <p>Enter event name:</p>
                                                <p><input id="event-name" type="text"></p>
                                            </div>
                                            <div class="modal-footer">
                                                <a href="#" class="btn" data-dismiss="modal">Cancel</a>
                                                <a href="#" id="add-event-submit" class="btn btn-primary">Add event</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-content nopadding">
                                    <ul class="pages-list">
                                        <li>
                                            <a >
                                                <span class="icon"><span class="icon-file"></span></span>
                                                <span class="page-title">Page 1</span>
                                            </a>
                                            <span class="questions-count badge badge-info">3</span>
                                        </li>
                                        <li>
                                            <a >
                                                <span class="icon"><span class="icon-file"></span></span>
                                                <span class="page-title">Page 2</span>
                                            </a>
                                            <span class="questions-count badge badge-info">3</span>
                                        </li>
                                        <li class="active">
                                            <a>
                                                <span class="icon"><span class="icon-file"></span></span>
                                                <span class="page-title">Page 3</span>
                                            </a>
                                            <span class="questions-count badge badge-info">3</span>
                                        </li>
                                        <li>
                                            <a>
                                                <span class="icon"><span class="icon-file"></span></span>
                                                <span class="page-title">Page 4</span>
                                            </a>
                                            <span class="questions-count badge badge-info">3</span>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </div>
                        
                        <div id="admin" class="tab-pane" style="height:300px">This is a Tab Three Content</div>
                        <hr class="clear" />
                    </div>
                    <hr class="clear" />
                </div>
                <hr class="clear" />
            </div>
        </div>
    </div>
    <div class="span2">
        <div class="widget-box">
            <div class="widget-title">
                <h5>Publish</h5>
            </div>
            <div class="widget-content">
                toto<br />
                toto <br />
            </div>
        </div>
    </div>
    <div class="span2">
        <div class="widget-box">
            <div class="widget-title">
                <h5>Publish</h5>
            </div>
            <div class="widget-content">
                toto<br />
                toto <br />
            </div>
        </div>
    </div>
</div>
</form>
