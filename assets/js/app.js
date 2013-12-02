define([

    "jquery" , "underscore" , "backbone"

    , "collections/snippets" , "collections/my-form-snippets"

    , "views/tab" , "views/my-form"

    , "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/buttons.json"

    , "text!templates/app/render.html",  "text!templates/app/renderJson.html","text!templates/app/renderJsonuser.html", "text!data/layout.json", "text!data/navigation.json"
    , "text!data/sample-user.json"
    ], function(

        $, _, Backbone

        , SnippetsCollection, MyFormSnippetsCollection

        , TabView, MyFormView

        , inputJSON, radioJSON, selectJSON, buttonsJSON

        , renderTab, renderJsonTab, renderJsonusertab, layoutJSON, navigationJSON
        , myFormJSON
        ){

        return {

            initialize: function(){

                //Bootstrap tabs from json.

                new TabView({

                    title: "Input"

                    , 
                    collection: new SnippetsCollection(JSON.parse(inputJSON))

                });

                new TabView({

                    title: "Radios / Checkboxes"

                    , 
                    collection: new SnippetsCollection(JSON.parse(radioJSON))

                });

                new TabView({

                    title: "Select"

                    , 
                    collection: new SnippetsCollection(JSON.parse(selectJSON))

                });

                new TabView({

                    title: "Buttons"

                    , 
                    collection: new SnippetsCollection(JSON.parse(buttonsJSON))

                });
                new TabView({
                    title: "Layout"

                    , 
                    collection: new SnippetsCollection(JSON.parse(layoutJSON))

                });
                new TabView({
                    title: "Navigation"

                    , 
                    collection: new SnippetsCollection(JSON.parse(navigationJSON))

                });

                new TabView({

                    title: "Html"

                    , 
                    content: renderTab

                });

                new TabView({

                    title: "DesignJson"

                    , 
                    content: renderJsonTab

                });
                new TabView({

                    title: "UserJson"

                    , 
                    content: renderJsonusertab

                });
                 
                //Make the first tab active!

                $("#components .tab-pane").first().addClass("active");

                $("#formtabs li").first().addClass("active");

                // Bootstrap "My Form" with 'Form Name' snippet.



                var json=JSON.parse(myFormJSON);//returns the object of form 
                if(myFormJSON !="" && $.isArray(json)){
                    if(!$.isPlainObject(json[0]['fields']['name'])){
                        var map={};
                        $.each([inputJSON, radioJSON, selectJSON, buttonsJSON],function(i,v){
                            v=JSON.parse(v);//i has index number 0 to 3, v has object for input tab till buttons tab
                            // console.log(v);
                            $.each(v,function(kk,vv){//vv has object for text input, passwrd input and all the snippets
                                // console.log(vv);
                                if(typeof(vv['fields']) !='undefined' 
                                    && typeof(vv['fields']['ui_type']) !='undefined'
                                    && typeof(vv['fields']['ui_type']['value']) !='undefined'){
                                    if(typeof(map[vv['fields']['ui_type']['value']]) !='undefined'){
                                        console.log('Field of ui_type "'+vv['fields']['ui_type']['value']+'" is already defined and is overwritted by'+JSON.stringify(vv['fields']));
                                        throw new exception('Error in script');
                                    }
                                    map[vv['fields']['ui_type']['value']]=vv['fields'];
                                //console.log(map[vv['fields']['ui_type']['value']]);
                                /* A Map will allow for more flexibility to not have attributes or
                             *  to have different attributes for different instances or add attributes later 
                             *  (through adding things to the Map). But if the attributes are different types 
                             *  String, Integer, Doubles etc this will require making the Map of type Object 
                             *  and casting all the values when you use them (a lot more work for you).*/
                                }
                            });
                        });
                
                        //     console.log(json[0]['fields']);//at 0 index form name
                        if(typeof(json[0]) !=='undefined' && typeof(json[0]['fields']) !=='undefined'){
                            json[0]['fields']={
                                "name":{
                                    "label":"Form Name",
                                    "type":"input",
                                    "value":json[0]['fields']['name'],
                                    "name":"name"
                                },
                                "ui_type":{
                                    "label":"UI Type",
                                    "type":"input",
                                    "value":"form",
                                    "readonly":"readonly"
                                }
                            };
                        }
                
                        // console.log(json);
                        $.each(json,function(k,v){
                            if(
                                typeof(v['fields']) !='undefined'
                                && typeof(v['fields']['ui_type']) !='undefined'
                                ){ 
                                var uiType=v['fields']['ui_type'];
                                if(typeof(map[uiType]) !=='undefined'){
                                    $.each(v['fields'],function(kk,vv){
                                        json[k]['fields'][kk]=$.extend(
                                        {},
                                            map[uiType][kk]
                                            );
                                        if(typeof(json[k]['fields'][kk]['value']) !=='undefined'){
                                            if($.isArray(json[k]['fields'][kk]['value'])){
                                                $.each(json[k]['fields'][kk]['value'],function(kkk,vvv){
                                                    if(typeof(vvv['value']) !='undefined' && vvv['value']==vv){
                                                        json[k]['fields'][kk]['value'][kkk]['selected']=true;
                                                    }
                                                });
                                            }else{
                                                json[k]['fields'][kk]['value']=vv;
                                            }
                                        }
                                    });
                            
                                }
                        
                            }
                        });
                    }
                }else{
                    var json=[{
                        "title" : "Form Name", 
                        "fields": {
                            "name" : {
                                "label"   : "Form Name",
                                "type"  : "input",
                                "value" : "Form Name"
                            },
                            "ui_type":{
                                "label":"UI Type",
                                "type":"input",
                                "value":"form",
                                "readonly":"readonly"
                            }
                        }
                    }];
                }
                console.log(JSON.stringify(json));
                new MyFormView({

                    title: "Original"

                    , 
                    collection: new MyFormSnippetsCollection(json)

                });
                
                
                
                

            }

        }
    });