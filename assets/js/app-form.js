define([

    "jquery" , "underscore" , "backbone"

    , "collections/snippets2" , "collections/my-form-snippets2"

    , "views/tab" , "views/my-form2"

    , "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/buttons.json"

    , "text!templates/app/render.html",  "text!templates/app/renderJson.html","text!templates/app/renderJsonuser.html", "text!data/myForm.json"

    ], function(

        $, _, Backbone

        , SnippetsCollection, MyFormSnippetsCollection

        , TabView, MyFormView

        , inputJSON, radioJSON, selectJSON, buttonsJSON

        , renderTab, renderJsonTab, renderJsonusertab, myFormJSON

        ){

        return {

            initialize: function(){

                //Bootstrap tabs from json.
                new TabView({
                    title: "My new form"
                    , 
                    collection: new SnippetsCollection(JSON.parse(myFormJSON))

                });
 
  
    
                //Make the first tab active!

              $("#components .tab-pane").first().addClass("active");

                $("#formtabs li").first().addClass("active");

                // Bootstrap "My Form" with 'Form Name' snippet.

                

            }

        }
    });