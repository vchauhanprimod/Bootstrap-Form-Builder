define([
       "jquery"
       , "views/snippet"
       , "text!templates/app/temp.html"
       , "helper/pubsub"
], function(
  $
  , SnippetView
  , _tempTemplate
  , PubSub
){
  return SnippetView.extend({
    initialize: function(){
      PubSub.on("newTempPostRender", this.postRender, this);
      this.constructor.__super__.initialize.call(this);
      this.tempTemplate = _.template(_tempTemplate);
    }
    , className: "temp"
    , render: function() {
      return this.$el.html(this.tempTemplate({text: this.constructor.__super__.render.call(this).html()}));
    }
    
    
    
  });
});
