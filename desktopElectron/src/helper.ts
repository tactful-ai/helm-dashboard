export const getAddedDeletedLines = (content: string[]) => {
  const addedLines: number[] = [];
  const deletedLines: number[] = [];

  content.forEach((line: string, i: number) => {
    if (line.startsWith("+")) {
      addedLines.push(i + 1);
    } else if (line.startsWith("-")) {
      deletedLines.push(i + 1);
    }
  });

  return {
    addedLines,
    deletedLines,
  };
};

export const getDeploymentsServicesStats = (manifest) => {
  const deploymentsStats = {
    healthy: 0,
    error: 0,
  };

  const servicesStats = {
    healthy: 0,
  };

  manifest.items.forEach((item) => {
    if (item.kind === "Deployment") {
      if (item.spec.replicas <= item.status.availableReplicas) {
        deploymentsStats.healthy += 1;
      } else {
        deploymentsStats.error += 1;
      }
    } else if (item.kind === "Service") {
      servicesStats.healthy += 1;
    }
  });

  return {
    deploymentsStats,
    servicesStats,
  };
};

export const getPodsStats = (releaseName: string, pods: string) => {
  const podsStats = {
    healthy: 0,
    warning: 0,
    error: 0,
  };

  const podJson: any[] = [];

  pods.split("\n").forEach((el) => {
    let lineArr = el.split(" ");
    lineArr = lineArr.filter((el) => {
      return el !== "";
    });
    podJson.push({
      name: lineArr[0],
      status: lineArr[2],
    });
  });
  podJson.shift();
  podJson.pop();

  podJson.forEach((el) => {
    if (el.name.startsWith(releaseName)) {
      if (el.status === "Running" || el.status === "Succeeded") {
        podsStats.healthy += 1;
      } else if (el.status === "Failed") {
        podsStats.error += 1;
      } else {
        podsStats.warning += 1;
      }
    }
  });

  return {
    podsStats,
  };
};
