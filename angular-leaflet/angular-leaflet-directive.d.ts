// Type definitions for angular-leaflet-directive
// Project: https://github.com/tombatossals/angular-leaflet-directive
// Definitions by: rafw87 <https://github.com/rafw87>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


/// <reference path="../angularjs/angular.d.ts" />
/// <reference path="../leaflet/leaflet.d.ts" />

declare module angular.leaflet {
    export interface LatLng {
        lat: number;
        lng: number;
    }

    export interface BoundsModel {
        southWest: LatLng;
        northEast: LatLng;
    }

    export interface DefaultsModel {
        tap?: boolean;
        tileLayer?: string;
        zoomControlPosition?: string;
        tileLayerOptions?: L.TileLayerOptions;
        scrollWheelZoom?: boolean;
    }

    export interface CenterModel {
        lat?: number;
        lng?: number;
        zoom?: number;
        autoDiscover?: boolean;
    }

    export interface LayerModel {
        name: string;
        type: string;
        layerOptions?: any;
        layerParams?: any;
        url?: string;
        layerType?: string;
        data?: any;
        layer?: any;//string|L.ILayer
        bounds?: L.LatLngBounds;
        key?: string;
        pluginOptions?: any;
        user?: string;
    }

    export interface LayersModel {
        baselayers?: { [name: string]: LayerModel };
        overlays?: { [name: string]: LayerModel };
    }

    export interface MarkerIcon extends L.IconOptions {
        type?: string;
    }

    export interface MarkerModel extends LatLng {
        layer?: string;
        icon?: any;
        title?: string;
        draggable?: boolean;
        clickable?: boolean;
        riseOnHover?: boolean;
        zIndexOffset?: number;
        iconAngle?: number;
        compileMessage?: boolean;
        message?: string;
        getMessageScope?: () => ng.IScope;
    }

    export interface MarkersModel {
        [name: string]: MarkerModel;
    }

    export interface PathModel extends L.PathOptions {
        layer: string;
        color: string;
        latlngs: any[]; // Array<LatLng|Array<LatLng>>
        message?: string;
    }

    export interface PathsModel {
        [name: string]: PathModel;
    }

    export interface ILeafletBoundsHelpersService {
        createLeafletBounds(bounds: BoundsModel): L.Bounds;
        createBoundsFromArray(boundsArray: number[][]): BoundsModel;
        isValidBounds(bounds: BoundsModel): boolean;
    }
}
