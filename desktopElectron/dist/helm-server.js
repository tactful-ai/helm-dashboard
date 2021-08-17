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
exports.Helm = void 0;
var child_process_1 = require("child_process");
var util_1 = require("util");
var execAsync = util_1.promisify(child_process_1.exec);
var Helm = /** @class */ (function () {
    function Helm(namespace) {
        if (namespace === void 0) { namespace = null; }
        this.executable = "helm";
        this.namespace = null;
        this.namespace = namespace;
    }
    Helm.prototype.execute = function (args, json) {
        if (json === void 0) { json = true; }
        return __awaiter(this, void 0, void 0, function () {
            var format, fullCmd, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        format = json ? "--output json" : "";
                        fullCmd = this.executable + " " + args.join(" ") + " " + format;
                        console.warn("executing: $ ", fullCmd);
                        return [4 /*yield*/, execAsync(fullCmd)];
                    case 1:
                        output = _a.sent();
                        return [2 /*return*/, output.stdout];
                }
            });
        });
    };
    Helm.prototype.getReleases = function () {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(["list"])];
                    case 1:
                        output = _a.sent();
                        return [2 /*return*/, JSON.parse(output)];
                }
            });
        });
    };
    Helm.prototype.getReleaseValues = function (release) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(["get", "values", release])];
                    case 1:
                        output = _a.sent();
                        return [2 /*return*/, JSON.parse(output)];
                }
            });
        });
    };
    Helm.prototype.getReleaseHistory = function (release) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(["history", release])];
                    case 1:
                        output = _a.sent();
                        return [2 /*return*/, JSON.parse(output)];
                }
            });
        });
    };
    Helm.prototype.getHelmRepos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(["repo", "list"])];
                    case 1:
                        output = _a.sent();
                        return [2 /*return*/, JSON.parse(output)];
                }
            });
        });
    };
    Helm.prototype.getChatVersion = function (chart) {
        var rx = RegExp("-(v?[0-9]+\.[0-9]+\.[0-9]+.*)");
        var matches = chart.match(rx);
        return matches[0];
    };
    Helm.prototype.getChartName = function (chart) {
        var matches = chart.match(/^(.*)-/);
        return matches[0];
    };
    Helm.prototype.getDiff = function (release, rev1, rev2) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(["diff", "--output", "diff", "--no-color", "revision", release, String(rev1), String(rev2)], false)];
                    case 1:
                        output = _a.sent();
                        return [2 /*return*/, output];
                }
            });
        });
    };
    return Helm;
}());
exports.Helm = Helm;
//# sourceMappingURL=helm-server.js.map