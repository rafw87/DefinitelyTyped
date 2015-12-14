///<reference path="cordova-plugin-graphhopper.d.ts"/>

function successHandler() {
    console.log('success');
}

function errorHandler(err: GraphhopperPlugin.PluginErrorArg) {
    console.log(err.message);
    console.log('----------------------------');
    for (var i=0; i<err.errors.length; i++) {
        var error = err.errors[i];
        console.log('Message: ' + error.message.trim());
        console.log('Localized message: ' + error.message.trim());
        console.log('Cause: ' + error.cause.trim());
        console.log('StackTrace: \n' + error.stackTrace.trim());
        console.log('----------------------------');
    }
}

function routeSuccessHandler(response: GraphhopperPlugin.Response) {
    var signs: string[] = [];
    signs[-3] = 'TURN_SHARP_LEFT';
    signs[-2] = 'TURN_LEFT = -2';
    signs[-1] = 'TURN_SLIGHT_LEFT';
    signs[0] = 'CONTINUE_ON_STREET';
    signs[1] = 'TURN_SLIGHT_RIGHT';
    signs[2] = 'TURN_RIGHT';
    signs[3] = 'TURN_SHARP_RIGHT';
    signs[4] = 'FINISH';
    signs[5] = 'VIA_REACHED';
    signs[6] = 'USE_ROUNDABOUT';

    console.log('Route:');
    console.log('  Hints:');
    for(var key in response.hints) {
        console.log('    ' + key + ': ' + response.hints[key]);
    }
    for(var i=0; i<response.paths.length; i++) {
        console.log('  Path:');
        var path = response.paths[i];
        console.log('    Distance: ' + path.distance);
        console.log('    Ascend: ' + path.ascend);
        console.log('    Descend: ' + path.descend);
        console.log('    Weight: ' + path.weight);
        console.log('    Time: ' + path.time);
        console.log('    Bounding Box: [' + path.bbox[0] + ' ' + path.bbox[1] + ' ' + path.bbox[2] + ' ' + path.bbox[3] + ']');
        console.log('    Instructions:');
        for(var j=0; j<path.instructions.length; j++) {
            var instruction = path.instructions[j];
            var distanceInKm = (instruction.distance / 1000).toFixed(2) + 'km';
            var timeInMinutes = (instruction.time / 1000 / 60).toFixed(2) + 'min';
            console.log('      ' + distanceInKm + ' / ' + timeInMinutes + ': ' + signs[instruction.sign] + ' ' + instruction.text);
        }
        var points = path.points;
        if(typeof points === "string") {
            console.log('    Encoded Points:' + points.trim());
        } else {
            console.log('    Points Type:' + points.type);
            console.log('    Points Coordinates:');
            for(var j=0; j<points.coordinates.length; j++) {
                var str = 'latitude: ' + points.coordinates[j][0] + ', longitude: ' + points.coordinates[j][1];
                if(points.coordinates[j].length > 2) {
                    str += ', altitude: ' + points.coordinates[j][2];
                }
                console.log('      ' + str);
            }
        }
    }
}

window.graphhopper.initialize({
    mapFilePath: '/mnt/sdcard/map-gh',
    apiUrl: 'https://graphhopper.com/api/1',
    apiKey: '00000000-0000-0000-0000-000000000000'
}, successHandler, errorHandler);
window.graphhopper.destroy(successHandler, errorHandler);

window.graphhopper.setMapPath('/mnt/sdcard/map-gh', successHandler, errorHandler);
window.graphhopper.setApiUrl('https://graphhopper.com/api/1', successHandler, errorHandler);
window.graphhopper.setApiKey('00000000-0000-0000-0000-000000000000', successHandler, errorHandler);

window.graphhopper.getRoutes({
    points: [
        {
            lat: 49.932707,
            lng: 11.588051
        },
        {
            lat: 50.3404,
            lng: 11.64705
        }
    ],
    vehicle: 'car'
}, routeSuccessHandler, errorHandler);
