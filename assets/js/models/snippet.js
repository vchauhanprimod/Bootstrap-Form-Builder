define([
    'jquery', 'underscore', 'backbone'
    ], function($, _, Backbone) {
        return Backbone.Model.extend({
            uuid: function(){
                var c = "89ab";
                var u = [];
                for (var i = 0; i < 36; i++) {
                    u[i] = (Math.random() * 16 | 0).toString(16);
                }
                u[8] = u[13] = u[18] = u[23] = "-";
                u[14] = "4";
                u[19] = c.charAt((Math.random() * 4 | 0));
                return u.join("");
            },  
            getValues: function(){
                return _.reduce(this.get("fields"), function(o, v, k){
                    if (v["type"] == "select") {
                        o[k] = _.find(v["value"], function(o){
                            return o.selected
                        })["value"];
                    } else {
                        o[k]  = v["value"];
                    }
                    return o;
                }, {});
            }
            , 
            idFriendlyTitle: function(){
                return this.get("title").replace(/\W/g,'').toLowerCase();
            }
            , 
            setField: function(name, value) {
                var fields = this.get("fields")
                fields[name]["value"] = value;
                this.set("fields", fields);
            }
        });
    });
