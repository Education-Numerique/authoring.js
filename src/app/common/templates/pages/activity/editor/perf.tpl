/*
* @template : pages/activity/editor/perf
*/
<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css">
<div class="container-fluid">

    <div class="widget-box noborder">
        <div class="widget-content" id="page-informations">
            
            <div class="control-group">
                <div class="input-prepend">
                    <label class="add-on" for="form-page-title">Titre</label>
                    {{view LxxlLib.Em.TextField valueBinding="currentPage.title" focus="true" classNames="span2" id="form-page-title" placeholder="Performance"}}
                </div>
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
        <div class="widget-content slidify-on nopadding" id="page-document">
            {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.document" plugins="mathjax,tooltip,imagemanager,perf" classNames="redactorjs"}}
        </div>
    </div>
</div>