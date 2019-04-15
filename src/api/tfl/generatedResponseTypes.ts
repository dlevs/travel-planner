// To parse this data:
//
//   import { Convert, StopPoint, StopPointSearch } from "./file";
//
//   const stopPoint = Convert.toStopPoint(json);
//   const stopPointArrival = Convert.toStopPointArrival(json);
//   const stopPointSearch = Convert.toStopPointSearch(json);
//   const tubeStatus = Convert.toTubeStatus(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface StopPoint {
    $type:                string;
    naptanId:             string;
    modes:                Mode[];
    icsCode:              string;
    smsCode?:             string;
    stopType:             string;
    stationNaptan:        string;
    lines:                Line[];
    lineGroup:            LineGroup[];
    lineModeGroups:       LineModeGroup[];
    status:               boolean;
    id:                   string;
    commonName:           string;
    placeType:            string;
    additionalProperties: AdditionalProperty[];
    children:             StopPoint[];
    lat:                  number;
    lon:                  number;
    indicator?:           string;
    stopLetter?:          string;
}

export interface AdditionalProperty {
    $type:           string;
    category:        string;
    key:             string;
    sourceSystemKey: string;
    value:           string;
}

export interface LineGroup {
    $type:             string;
    naptanIdReference: string;
    stationAtcoCode:   string;
    lineIdentifier:    string[];
}

export interface LineModeGroup {
    $type:          string;
    modeName:       Mode;
    lineIdentifier: string[];
}

export enum Mode {
    Bus = "bus",
    NationalRail = "national-rail",
}

export interface Line {
    $type:     string;
    id:        string;
    name:      string;
    uri:       string;
    type:      Type;
    crowding:  Crowding;
    routeType: RouteType;
    status:    RouteType;
}

export interface Crowding {
    $type: string;
}

export enum RouteType {
    Unknown = "Unknown",
}

export enum Type {
    Line = "Line",
}

export interface StopPointArrival {
    $type:               string;
    id:                  string;
    operationType:       number;
    vehicleId:           string;
    naptanId:            string;
    stationName:         string;
    lineId:              string;
    lineName:            string;
    platformName:        string;
    direction:           string;
    bearing:             string;
    destinationNaptanId: string;
    destinationName:     string;
    timestamp:           Date;
    timeToStation:       number;
    currentLocation:     string;
    towards:             string;
    expectedArrival:     Date;
    timeToLive:          Date;
    modeName:            Mode;
    timing:              Timing;
}

export interface Timing {
    $type:                     string;
    countdownServerAdjustment: string;
    source:                    Date;
    insert:                    Date;
    read:                      Date;
    sent:                      Date;
    received:                  Date;
}

export interface StopPointSearch {
    $type:   string;
    query:   string;
    total:   number;
    matches: Match[];
}

export interface Match {
    $type:           string;
    icsId:           string;
    topMostParentId: string;
    modes:           Mode[];
    zone?:           string;
    id:              string;
    name:            string;
    lat:             number;
    lon:             number;
}

export interface TubeStatus {
    $type:         string;
    id:            string;
    name:          string;
    modeName:      ModeName;
    disruptions:   any[];
    created:       Date;
    modified:      Date;
    lineStatuses:  LineStatus[];
    routeSections: any[];
    serviceTypes:  ServiceType[];
    crowding:      Crowding;
}

export interface LineStatus {
    $type:                     string;
    id:                        number;
    statusSeverity:            number;
    statusSeverityDescription: StatusSeverityDescription;
    created:                   Date;
    validityPeriods:           ValidityPeriod[];
    lineId?:                   string;
    reason?:                   string;
    disruption?:               Disruption;
}

export interface Disruption {
    $type:               string;
    category:            string;
    categoryDescription: string;
    description:         string;
    additionalInfo?:     string;
    created?:            Date;
    affectedRoutes:      any[];
    affectedStops:       any[];
    closureText:         string;
}

export enum StatusSeverityDescription {
    GoodService = "Good Service",
    PartClosure = "Part Closure",
    ServiceClosed = "Service Closed",
}

export interface ValidityPeriod {
    $type:    string;
    fromDate: Date;
    toDate:   Date;
    isNow:    boolean;
}

export enum ModeName {
    Tube = "tube",
}

export interface ServiceType {
    $type: string;
    name:  Name;
    uri:   string;
}

export enum Name {
    Night = "Night",
    Regular = "Regular",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toStopPoint(json: string): StopPoint {
        return cast(JSON.parse(json), r("StopPoint"));
    }

    public static stopPointToJson(value: StopPoint): string {
        return JSON.stringify(uncast(value, r("StopPoint")), null, 2);
    }

    public static toStopPointArrival(json: string): StopPointArrival[] {
        return cast(JSON.parse(json), a(r("StopPointArrival")));
    }

    public static stopPointArrivalToJson(value: StopPointArrival[]): string {
        return JSON.stringify(uncast(value, a(r("StopPointArrival"))), null, 2);
    }

    public static toStopPointSearch(json: string): StopPointSearch {
        return cast(JSON.parse(json), r("StopPointSearch"));
    }

    public static stopPointSearchToJson(value: StopPointSearch): string {
        return JSON.stringify(uncast(value, r("StopPointSearch")), null, 2);
    }

    public static toTubeStatus(json: string): TubeStatus[] {
        return cast(JSON.parse(json), a(r("TubeStatus")));
    }

    public static tubeStatusToJson(value: TubeStatus[]): string {
        return JSON.stringify(uncast(value, a(r("TubeStatus"))), null, 2);
    }
}

function invalidValue(typ: any, val: any): never {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        var map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        var map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        var l = typs.length;
        for (var i = 0; i < l; i++) {
            var typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(typ: any, val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        var result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(typ, val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "StopPoint": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "naptanId", js: "naptanId", typ: "" },
        { json: "modes", js: "modes", typ: a(r("Mode")) },
        { json: "icsCode", js: "icsCode", typ: "" },
        { json: "smsCode", js: "smsCode", typ: u(undefined, "") },
        { json: "stopType", js: "stopType", typ: "" },
        { json: "stationNaptan", js: "stationNaptan", typ: "" },
        { json: "lines", js: "lines", typ: a(r("Line")) },
        { json: "lineGroup", js: "lineGroup", typ: a(r("LineGroup")) },
        { json: "lineModeGroups", js: "lineModeGroups", typ: a(r("LineModeGroup")) },
        { json: "status", js: "status", typ: true },
        { json: "id", js: "id", typ: "" },
        { json: "commonName", js: "commonName", typ: "" },
        { json: "placeType", js: "placeType", typ: "" },
        { json: "additionalProperties", js: "additionalProperties", typ: a(r("AdditionalProperty")) },
        { json: "children", js: "children", typ: a(r("StopPoint")) },
        { json: "lat", js: "lat", typ: 3.14 },
        { json: "lon", js: "lon", typ: 3.14 },
        { json: "indicator", js: "indicator", typ: u(undefined, "") },
        { json: "stopLetter", js: "stopLetter", typ: u(undefined, "") },
    ], false),
    "AdditionalProperty": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "category", js: "category", typ: "" },
        { json: "key", js: "key", typ: "" },
        { json: "sourceSystemKey", js: "sourceSystemKey", typ: "" },
        { json: "value", js: "value", typ: "" },
    ], false),
    "LineGroup": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "naptanIdReference", js: "naptanIdReference", typ: "" },
        { json: "stationAtcoCode", js: "stationAtcoCode", typ: "" },
        { json: "lineIdentifier", js: "lineIdentifier", typ: a("") },
    ], false),
    "LineModeGroup": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "modeName", js: "modeName", typ: r("Mode") },
        { json: "lineIdentifier", js: "lineIdentifier", typ: a("") },
    ], false),
    "Line": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "uri", js: "uri", typ: "" },
        { json: "type", js: "type", typ: r("Type") },
        { json: "crowding", js: "crowding", typ: r("Crowding") },
        { json: "routeType", js: "routeType", typ: r("RouteType") },
        { json: "status", js: "status", typ: r("RouteType") },
    ], false),
    "Crowding": o([
        { json: "$type", js: "$type", typ: "" },
    ], false),
    "StopPointArrival": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "id", js: "id", typ: "" },
        { json: "operationType", js: "operationType", typ: 0 },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "naptanId", js: "naptanId", typ: "" },
        { json: "stationName", js: "stationName", typ: "" },
        { json: "lineId", js: "lineId", typ: "" },
        { json: "lineName", js: "lineName", typ: "" },
        { json: "platformName", js: "platformName", typ: "" },
        { json: "direction", js: "direction", typ: "" },
        { json: "bearing", js: "bearing", typ: "" },
        { json: "destinationNaptanId", js: "destinationNaptanId", typ: "" },
        { json: "destinationName", js: "destinationName", typ: "" },
        { json: "timestamp", js: "timestamp", typ: Date },
        { json: "timeToStation", js: "timeToStation", typ: 0 },
        { json: "currentLocation", js: "currentLocation", typ: "" },
        { json: "towards", js: "towards", typ: "" },
        { json: "expectedArrival", js: "expectedArrival", typ: Date },
        { json: "timeToLive", js: "timeToLive", typ: Date },
        { json: "modeName", js: "modeName", typ: r("Mode") },
        { json: "timing", js: "timing", typ: r("Timing") },
    ], false),
    "Timing": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "countdownServerAdjustment", js: "countdownServerAdjustment", typ: "" },
        { json: "source", js: "source", typ: Date },
        { json: "insert", js: "insert", typ: Date },
        { json: "read", js: "read", typ: Date },
        { json: "sent", js: "sent", typ: Date },
        { json: "received", js: "received", typ: Date },
    ], false),
    "StopPointSearch": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "query", js: "query", typ: "" },
        { json: "total", js: "total", typ: 0 },
        { json: "matches", js: "matches", typ: a(r("Match")) },
    ], false),
    "Match": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "icsId", js: "icsId", typ: "" },
        { json: "topMostParentId", js: "topMostParentId", typ: "" },
        { json: "modes", js: "modes", typ: a(r("Mode")) },
        { json: "zone", js: "zone", typ: u(undefined, "") },
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "lat", js: "lat", typ: 3.14 },
        { json: "lon", js: "lon", typ: 3.14 },
    ], false),
    "TubeStatus": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "modeName", js: "modeName", typ: r("ModeName") },
        { json: "disruptions", js: "disruptions", typ: a("any") },
        { json: "created", js: "created", typ: Date },
        { json: "modified", js: "modified", typ: Date },
        { json: "lineStatuses", js: "lineStatuses", typ: a(r("LineStatus")) },
        { json: "routeSections", js: "routeSections", typ: a("any") },
        { json: "serviceTypes", js: "serviceTypes", typ: a(r("ServiceType")) },
        { json: "crowding", js: "crowding", typ: r("Crowding") },
    ], false),
    "LineStatus": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "id", js: "id", typ: 0 },
        { json: "statusSeverity", js: "statusSeverity", typ: 0 },
        { json: "statusSeverityDescription", js: "statusSeverityDescription", typ: r("StatusSeverityDescription") },
        { json: "created", js: "created", typ: Date },
        { json: "validityPeriods", js: "validityPeriods", typ: a(r("ValidityPeriod")) },
        { json: "lineId", js: "lineId", typ: u(undefined, "") },
        { json: "reason", js: "reason", typ: u(undefined, "") },
        { json: "disruption", js: "disruption", typ: u(undefined, r("Disruption")) },
    ], false),
    "Disruption": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "category", js: "category", typ: "" },
        { json: "categoryDescription", js: "categoryDescription", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "additionalInfo", js: "additionalInfo", typ: u(undefined, "") },
        { json: "created", js: "created", typ: u(undefined, Date) },
        { json: "affectedRoutes", js: "affectedRoutes", typ: a("any") },
        { json: "affectedStops", js: "affectedStops", typ: a("any") },
        { json: "closureText", js: "closureText", typ: "" },
    ], false),
    "ValidityPeriod": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "fromDate", js: "fromDate", typ: Date },
        { json: "toDate", js: "toDate", typ: Date },
        { json: "isNow", js: "isNow", typ: true },
    ], false),
    "ServiceType": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "name", js: "name", typ: r("Name") },
        { json: "uri", js: "uri", typ: "" },
    ], false),
    "Mode": [
        "bus",
        "national-rail",
    ],
    "RouteType": [
        "Unknown",
    ],
    "Type": [
        "Line",
    ],
    "StatusSeverityDescription": [
        "Good Service",
        "Part Closure",
        "Service Closed",
    ],
    "ModeName": [
        "tube",
    ],
    "Name": [
        "Night",
        "Regular",
    ],
};
