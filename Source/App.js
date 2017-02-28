var ros = require('./Ros')

var app = {

    assets: {},

    setup: function() {
        console.log(ros)

        Cesium.BingMapsApi.defaultKey = ""

        var viewer = new Cesium.Viewer('cesiumContainer', {
            infoBox : false,
            selectionIndicator : false,
            shadows : true,
            timeline: false,
            animation: false
        })
        viewer.extend(Cesium.viewerCesiumInspectorMixin);

        ros.setup()
        var init = false
        ros.addHandler((m) => {
            if(!init) {
                init = true
                console.log(m)
                this.createModel(viewer, m)
            } else {
                this.updateModel(viewer, m)
            }
        })
    },

    createModel: function(viewer, data) {


        var entity = viewer.entities.add({
            name : "test1",
            model : {
                uri : "/models/CesiumAir/Cesium_Air.glb",
                minimumPixelSize : 128,
                maximumScale : 20000
            },
            //position: new Cesium.ConstantPositionProperty(),
            //orientation: new Cesium.ConstantProperty(Cesium.Quaternion)
        });

        this.assets[1] = {
            entity: entity
        }
        
        this.updateModel(viewer, data)
    },

    updateModel: function(viewer, data) {
        var entity = this.assets[1].entity;

        var position = Cesium.Cartesian3.fromDegrees(data.location.longitude, data.location.latitude, data.location.altitude);

        var hpr = new Cesium.HeadingPitchRoll(data.hpr.heading, data.hpr.pitch, data.hpr.roll);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

        entity.position = position
        entity.orientation = orientation

        viewer.trackedEntity = entity;

        console.log("Updated")
    },

    addOptions: function(options ) {
        var menu = document.createElement('select');
        menu.className = 'cesium-button';
        menu.onchange = function() {
            var item = options[menu.selectedIndex];
            if (item && typeof item.onselect === 'function') {
                item.onselect();
            }
        };
        document.getElementById('toolbar').appendChild(menu);

        for (var i = 0, len = options.length; i < len; ++i) {
            var option = document.createElement('option');
            option.textContent = options[i].text;
            option.value = options[i].value;
            menu.appendChild(option);
        }
    }

// var options = [{
//     text : 'Aircraft',
//     onselect : function() {
//         createModel('/models/CesiumAir/Cesium_Air.glb', 5000.0);
//     }
// }, {
//     text : 'Ground vehicle',
//     onselect : function() {
//         createModel('/models/CesiumGround/Cesium_Ground.glb', 0);
//     }
// }, {
//     text : 'Hot Air Balloon',
//     onselect : function() {
//         createModel('/models/CesiumBalloon/CesiumBalloon.glb', 1000.0);
//     }
// }, {
//     text : 'Milk truck',
//     onselect : function() {
//         createModel('/models/CesiumMilkTruck/CesiumMilkTruck-kmc.glb', 0);
//     }
// }, {
//     text : 'Skinned character',
//     onselect : function() {
//         createModel('/models/CesiumMan/Cesium_Man.glb', 0);
//     }
// }];

//addOptions(options);
}

app.setup();