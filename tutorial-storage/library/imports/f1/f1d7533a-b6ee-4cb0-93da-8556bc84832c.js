"use strict";
cc._RF.push(module, 'f1d75M6tu5MsJPahVa8hIMs', 'main');
// scripts/main.js

"use strict";

var UserData = {
    name: "Bob",
    level: 1,
    vip: false
};

var base64;

cc.Class({
    extends: cc.Component,
    properties: {
        btn_storage: {
            default: null,
            type: cc.Button
        },
        btn_read: {
            default: null,
            type: cc.Button
        },
        btn_remove: {
            default: null,
            type: cc.Button
        },
        btn_clear: {
            default: null,
            type: cc.Button
        },
        label_control: {
            default: null,
            type: cc.Label
        },
        label_cipherData: {
            default: null,
            type: cc.Label
        },
        label_decryptionData: {
            default: null,
            type: cc.Label
        },
        userdata_name: {
            default: null,
            type: cc.EditBox
        },
        userdata_level: {
            default: null,
            type: cc.EditBox
        },
        userdata_vip: {
            default: null,
            type: cc.EditBox
        }

    },

    onLoad: function onLoad() {
        this.userdata_name.string = UserData.name;
        this.userdata_level.string = UserData.level;
        this.userdata_vip.string = UserData.vip;
        base64 = require("base64");
    }
});

cc._RF.pop();