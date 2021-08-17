"use strict";
exports.__esModule = true;
exports.getPodsStats = exports.getDeploymentsServicesStats = exports.getAddedDeletedLines = void 0;
var getAddedDeletedLines = function (content) {
    var addedLines = [];
    var deletedLines = [];
    content.forEach(function (line, i) {
        if (line.startsWith("+")) {
            addedLines.push(i + 1);
        }
        else if (line.startsWith("-")) {
            deletedLines.push(i + 1);
        }
    });
    return {
        addedLines: addedLines,
        deletedLines: deletedLines
    };
};
exports.getAddedDeletedLines = getAddedDeletedLines;
var getDeploymentsServicesStats = function (manifest) {
    var deploymentsStats = {
        healthy: 0,
        error: 0
    };
    var servicesStats = {
        healthy: 0
    };
    manifest.items.forEach(function (item) {
        if (item.kind === "Deployment") {
            if (item.spec.replicas <= item.status.availableReplicas) {
                deploymentsStats.healthy += 1;
            }
            else {
                deploymentsStats.error += 1;
            }
        }
        else if (item.kind === "Service") {
            servicesStats.healthy += 1;
        }
    });
    return {
        deploymentsStats: deploymentsStats,
        servicesStats: servicesStats
    };
};
exports.getDeploymentsServicesStats = getDeploymentsServicesStats;
var getPodsStats = function (releaseName, pods) {
    var podsStats = {
        healthy: 0,
        warning: 0,
        error: 0
    };
    var podJson = [];
    pods.split("\n").forEach(function (el) {
        var lineArr = el.split(" ");
        lineArr = lineArr.filter(function (el) {
            return el !== "";
        });
        podJson.push({
            name: lineArr[0],
            status: lineArr[2]
        });
    });
    podJson.shift();
    podJson.pop();
    podJson.forEach(function (el) {
        if (el.name.startsWith(releaseName)) {
            if (el.status === "Running" || el.status === "Succeeded") {
                podsStats.healthy += 1;
            }
            else if (el.status === "Failed") {
                podsStats.error += 1;
            }
            else {
                podsStats.warning += 1;
            }
        }
    });
    return {
        podsStats: podsStats
    };
};
exports.getPodsStats = getPodsStats;
//# sourceMappingURL=helper.js.map