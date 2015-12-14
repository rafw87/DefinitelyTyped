// Type definitions for cordova-plugin-graphhopper
// Project: https://github.com/rafw87/cordova-plugin-graphhopper
// Definitions by: rafw87 <https://github.com/rafw87/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface Window {
    graphhopper: GraphhopperPlugin.GraphhopperPlugin;
}

declare var graphhopper: GraphhopperPlugin.GraphhopperPlugin;

declare module GraphhopperPlugin {
    interface Settings {
        mapFilePath?: string;
        apiKey?: string;
        apiUrl?: string;
    }

    interface RequestPoint {
        lat: number;
        lng: number;
    }

    interface Request {
        points: RequestPoint[];
        vehicle?: string;
    }

    interface Response {
        hints: ResponseHints;
        paths: ResponsePath[];
    }

    interface ResponseHints {
        [key: string]: string;
    }

    interface ResponsePath {
        instructions: Instruction[];
        descend: number;
        ascend: number;
        distance: number;
        bbox: number[];
        weight: number;
        time: number;
        points_encoded: boolean;
        points: ResponsePoints|string;
    }

    interface Instruction {
        distance: number;
        sign: number;
        interval?: number[];
        text: string;
        time: number;
    }

    interface ResponsePoints {
        coordinates: number[][];
        type: string;
    }

    interface PluginError {
        message: string;
        localizedMessage: string;
        cause: string;
        stackTrace: string;
    }

    interface PluginErrorArg {
        message: string;
        errors: PluginError[];
    }

    interface GraphhopperPlugin {

        /**
         * Initializes plugin. Must be called before other methods.
         * @param settings Initial settings.
         * @param success Success callback.
         * @param error Error callback.
         */
        initialize(settings:Settings, success?:() => void, error?:(err:PluginErrorArg) => void): void;

        /**
         * Releases plugin memory. After calling, plugin may be initialized again.
         * @param success Success callback.
         * @param error Error callback.
         */
        destroy(success?:() => void, error?:(err:PluginErrorArg) => void): void;

        /**
         * Set path to Graphhopper's map data directory (for offline routing only).
         * @param mapPath Path to graphhopper's map data directory.
         * @param success Success callback.
         * @param error Error callback.
         */
        setMapPath(mapPath:string, success?:() => void, error?:(err:PluginErrorArg) => void): void;

        /**
         * Set Graphhopper API URL (for online routing only).
         * @param apiUrl Graphhopper API URL.
         * @param success Success callback.
         * @param error Error callback.
         */
        setApiUrl(apiUrl:string, success?:() => void, error?:(err:PluginErrorArg) => void): void;

        /**
         * Set Graphhopper API key (for online routing only).
         * @param apiKey Graphhopper API key.
         * @param success Success callback.
         * @param error Error callback.
         */
        setApiKey(apiKey:string, success?:() => void, error?:(err:PluginErrorArg) => void): void;

        /**
         * Calculate routing for given request and returns response to the success callback.
         * @param request Object containing request to Graphhopper.
         * @param success Success callback. Gets routing response.
         * @param error Error callback.
         */
        getRoutes(request:Request, success?:(response:Response) => void, error?:(err:PluginErrorArg) => void): void;
    }
}
