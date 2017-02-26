import ros from './Ros'

function setup() {
    var viewer = new Cesium.Viewer('cesiumContainer', {
        infoBox : false,
        selectionIndicator : false,
        shadows : true
    })

    ros.setup()
    ros.addHandler(function(m) {
        console.log(m)
    })
}

function createModel(url, height) {
    viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height);
    var heading = Cesium.Math.toRadians(135);
    var pitch = 0;
    var roll = 0;
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, heading, pitch, roll);

    var entity = viewer.entities.add({
        name : url,
        position : position,
        orientation : orientation,
        model : {
            uri : url,
            minimumPixelSize : 128,
            maximumScale : 20000
        }
    });
    viewer.trackedEntity = entity;
}

function addOptions(options ) {
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

setup();