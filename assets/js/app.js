define([

      "jquery" , "underscore" , "backbone"

      , "collections/snippets" , "collections/my-form-snippets"

      , "views/tab" , "views/my-form"

      , "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/buttons.json"

      , "text!templates/app/render.html",  "text!templates/app/renderJson.html","text!templates/app/renderJsonuser.html",

], function(

 $, _, Backbone

 , SnippetsCollection, MyFormSnippetsCollection

 , TabView, MyFormView

 , inputJSON, radioJSON, selectJSON, buttonsJSON

 , renderTab, renderJsonTab, renderJsonusertab

){

 return {

    initialize: function(){

     //Bootstrap tabs from json.

     new TabView({

       title: "Input"

       , collection: new SnippetsCollection(JSON.parse(inputJSON))

     });

     new TabView({

       title: "Radios / Checkboxes"

       , collection: new SnippetsCollection(JSON.parse(radioJSON))

     });

     new TabView({

       title: "Select"

       , collection: new SnippetsCollection(JSON.parse(selectJSON))

     });

     new TabView({

       title: "Buttons"

       , collection: new SnippetsCollection(JSON.parse(buttonsJSON))

     });

     new TabView({

       title: "Html"

       , content: renderTab

     });

     new TabView({

       title: "DesignJson"

       , content: renderJsonTab

     });
 new TabView({

       title: "UserJson"

       , content: renderJsonusertab

     });
     //Make the first tab active!

     $("#components .tab-pane").first().addClass("active");

     $("#formtabs li").first().addClass("active");

     // Bootstrap "My Form" with 'Form Name' snippet.

     new MyFormView({

       title: "Original"

       , collection: new MyFormSnippetsCollection([

         { "title" : "Form Name"

           , "fields": {

             "name" : {

               "label"   : "Form Name"

               , "type"  : "input"

               , "value" : "Form Name"

             }

           }

         }

       ])

     });

    }

 }
});