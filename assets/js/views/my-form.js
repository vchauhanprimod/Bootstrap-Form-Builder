define([
    "jquery", "underscore", "backbone"
    , "views/temp-snippet"
    , "helper/pubsub"
    , "text!templates/app/renderform.html"
    , "text!templates/app/renderJsonform.html"
    , "text!templates/app/renderJsonuserform.html"
    ], function(
        $, _, Backbone
        , TempSnippetView
        , PubSub
        , _renderForm
        , _renderJsonForm
        ,_renderJsonUserForm
        ){
        return Backbone.View.extend({
            tagName: "fieldset"
            , 
            initialize: function(){
                this.collection.on("add", this.render, this);
                this.collection.on("remove", this.render, this);
                this.collection.on("change", this.render, this);
                this.collection.on("add", this.renderuser, this);
                this.collection.on("remove", this.renderuser, this);
                this.collection.on("change", this.renderuser, this);
                PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
                PubSub.on("tempMove", this.handleTempMove, this);
                PubSub.on("tempDrop", this.handleTempDrop, this);
                this.$build = $("#build");
                this.renderForm = _.template(_renderForm);
                this.renderJsonForm = _.template(_renderJsonForm);
                this.renderJsonUserForm = _.template(_renderJsonUserForm);
                this.render();
            // this.renderuser();
            }

            , 
            renderuser: function(){
                this.$el.empty();
                var that = this;
                _.each(this.collection.renderAll(), function(snippet){
                    that.$el.append(snippet);
                });
                var json=this.collection.map(function(todoItem){
                    return todoItem.toJSON();
                });
                json=JSON.parse(JSON.stringify(json));
                $.each(json,function(k,v){
                    if(typeof(v['fields']) !=='undefined' && $.isPlainObject(v['fields'])){
                        $.each(v['fields'],function(kk,vv){
                            var value='';
                            if(typeof(vv['value']) !== 'undefined'){
                                if($.isArray(vv['value'])){
                                    $.each(vv['value'],function(kkk,vvv){
                                        if(typeof(vvv['selected']) !== 'undefined' && vvv['selected']===true){
                                            value=vvv['value'];
                                        }
                                    });
                                }else{
                                    value=vv['value'];
                                }
                            }
                            json[k]['fields'][kk]=value;
                        });
                    }
                });
                $("#renderJsonUser").val(JSON.stringify(json));
                
 
 
                this.$el.appendTo("#build form");
                this.delegateEvents();
            // alert(a);
            //console.log(a);
            },
            render: function(){
                //Render Snippet Views
                this.$el.empty();
                var that = this;
                _.each(this.collection.renderAll(), function(snippet){
                    that.$el.append(snippet);
                });
                var text=_.map(this.collection.renderAllClean(), function(e){
                    return e.html()
                }).join("\n");
                var json=this.collection.map(function(todoItem){
                    return todoItem.toJSON();
                });
                
                var obj={
                    text: text
                };
                var Render=that.renderForm(obj);
                $("#render").val(Render);
                $("#renderJson").val(JSON.stringify(json));
 
                this.$el.appendTo("#build form");
                this.delegateEvents();
            }
            , 
            getBottomAbove: function(eventY){
                var myFormBits = $(this.$el.find(".component"));
                var topelement = _.find(myFormBits, function(renderedSnippet) {
                    if (($(renderedSnippet).position().top + $(renderedSnippet).height()) > eventY  - 90) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                if (topelement){
                    return topelement;
                } else {
                    return myFormBits[0];
                }
            }

            , 
            handleSnippetDrag: function(mouseEvent, snippetModel) {
                $("body").append(new TempSnippetView({
                    model: snippetModel
                }).render());
                this.collection.remove(snippetModel);
                PubSub.trigger("newTempPostRender", mouseEvent);
            }

            , 
            handleTempMove: function(mouseEvent){
                $(".target").removeClass("target");
                if(mouseEvent.pageX >= this.$build.position().left &&
                    mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
                    mouseEvent.pageY >= this.$build.position().top &&
                    mouseEvent.pageY < (this.$build.height() + this.$build.position().top)){
                    $(this.getBottomAbove(mouseEvent.pageY)).addClass("target");
                } else {
                    $(".target").removeClass("target");
                }
            }

            , 
            handleTempDrop: function(mouseEvent, model, index){
                if(mouseEvent.pageX >= this.$build.position().left &&
                    mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
                    mouseEvent.pageY >= this.$build.position().top &&
                    mouseEvent.pageY < (this.$build.height() + this.$build.position().top)) {
                    var index = $(".target").index();
                    $(".target").removeClass("target");
                    this.collection.add(model,{
                        at: index+1
                    });
                } else {
                    $(".target").removeClass("target");
                }
            }
        })
    });