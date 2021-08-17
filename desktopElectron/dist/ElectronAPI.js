"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ElectronAPI = void 0;
var electron_client_1 = require("./electron-client");
var helper_1 = require("./helper");
var Kubectl_1 = require("./Kubectl");
var ElectronAPI = /** @class */ (function () {
    function ElectronAPI() {
    }
    ElectronAPI.prototype.getReleases = function () {
        return __awaiter(this, void 0, void 0, function () {
            var helm, releases, i, chartVersion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helm = new electron_client_1.HelmMainController();
                        return [4 /*yield*/, helm.getReleases()];
                    case 1:
                        releases = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < releases.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, helm.getChatVersion(releases[i].chart)];
                    case 3:
                        chartVersion = _a.sent();
                        releases[i].chartVersion = chartVersion;
                        releases[i].updated = releases[i].updated.split(" ")[0];
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, releases];
                }
            });
        });
    };
    ElectronAPI.prototype.getRevisions = function (releaseName) {
        return __awaiter(this, void 0, void 0, function () {
            var helm, history;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helm = new electron_client_1.HelmMainController();
                        return [4 /*yield*/, helm.getReleaseHistory(releaseName)];
                    case 1:
                        history = _a.sent();
                        history.reverse();
                        return [2 /*return*/, history];
                }
            });
        });
    };
    ElectronAPI.prototype.getDiff = function (releaseName, rev1, rev2) {
        return __awaiter(this, void 0, void 0, function () {
            var helm, diffRevisions, diffString, contentArray, contentArrayParsed, diffObject, _a, _b, files, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        helm = new electron_client_1.HelmMainController();
                        diffRevisions = [rev1, rev2];
                        return [4 /*yield*/, helm.getDiff(releaseName, diffRevisions[0], diffRevisions[1], false)];
                    case 1:
                        diffString = _c.sent();
                        contentArray = diffString.split("default, ");
                        // Delete the first element (will be empty)
                        contentArray.shift();
                        contentArrayParsed = contentArray.map(function (fileContent) {
                            return fileContent.split("\n");
                        });
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, helm.getDiff(releaseName, diffRevisions[0], diffRevisions[1], true)];
                    case 2:
                        diffObject = _b.apply(_a, [_c.sent()]);
                        files = [];
                        for (i = 0; i < diffObject.length; i++) {
                            files.push({
                                status: diffObject[i].change,
                                name: diffObject[i].kind + ".yaml",
                                content: contentArrayParsed[i],
                                changedInfo: {
                                    addedLines: helper_1.getAddedDeletedLines(contentArrayParsed[i]).addedLines,
                                    deletedLines: helper_1.getAddedDeletedLines(contentArrayParsed[i])
                                        .deletedLines
                                }
                            });
                        }
                        return [2 /*return*/, files];
                }
            });
        });
    };
    ElectronAPI.prototype.getStatusSummary = function () {
        return __awaiter(this, void 0, void 0, function () {
            var releasesStatus, manifest, podStats, helm, kubectl, pods, releases, _i, releases_1, release;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        releasesStatus = [];
                        helm = new electron_client_1.HelmMainController();
                        kubectl = new Kubectl_1.Kubectl();
                        return [4 /*yield*/, kubectl.getPods()];
                    case 1:
                        pods = _a.sent();
                        return [4 /*yield*/, helm.getReleases()];
                    case 2:
                        releases = _a.sent();
                        _i = 0, releases_1 = releases;
                        _a.label = 3;
                    case 3:
                        if (!(_i < releases_1.length)) return [3 /*break*/, 6];
                        release = releases_1[_i];
                        return [4 /*yield*/, helm.getManifest(release.name)];
                    case 4:
                        manifest = _a.sent();
                        podStats = helper_1.getPodsStats(release.name, pods);
                        releasesStatus.push({
                            releaseName: release.name,
                            statComponent: [
                                {
                                    name: "services",
                                    healthy: helper_1.getDeploymentsServicesStats(manifest).servicesStats.healthy,
                                    warning: 0,
                                    error: 0
                                },
                                {
                                    name: "pods",
                                    healthy: podStats.podsStats.healthy,
                                    warning: podStats.podsStats.warning,
                                    error: podStats.podsStats.error
                                },
                                {
                                    name: "deployments",
                                    healthy: helper_1.getDeploymentsServicesStats(manifest).deploymentsStats.healthy,
                                    warning: 0,
                                    error: helper_1.getDeploymentsServicesStats(manifest).deploymentsStats.error
                                },
                            ]
                        });
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, releasesStatus];
                }
            });
        });
    };
    return ElectronAPI;
}());
exports.ElectronAPI = ElectronAPI;
//# sourceMappingURL=ElectronAPI.js.map