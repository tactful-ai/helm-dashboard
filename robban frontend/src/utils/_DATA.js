export const helmReleases = [
  {
    id: "1",
    img: "https://kubernetes.io/images/favicon.png",
    name: "first",
    namespace: "asdas",
    chartName: "redis",
    chartVersion: 7.1,
    revision: 50,
    helmStatus: "Unknown",
    lastUpdate: "15 days ago",
  },
  {
    id: "2",
    img: "https://kubernetes.io/images/favicon.png",
    name: "another",
    namespace: "qeqe",
    chartName: "nginx",
    chartVersion: 4.2,
    revision: 70,
    helmStatus: "Deployed",
    lastUpdate: "5 days ago",
  },
  {
    id: "3",
    img: "https://kubernetes.io/images/favicon.png",
    name: "name",
    namespace: "asdas",
    chartName: "sql",
    chartVersion: 10.1,
    revision: 20,
    helmStatus: "Uninstalled",
    lastUpdate: "30 days ago",
  },
  {
    id: "4",
    img: "https://kubernetes.io/images/favicon.png",
    name: "name",
    namespace: "asdas",
    chartName: "sql",
    chartVersion: 12.3,
    revision: 20,
    helmStatus: "Uninstalled",
    lastUpdate: "30 days ago",
  },
  {
    id: "5",
    img: "https://kubernetes.io/images/favicon.png",
    name: "test",
    namespace: "asdas",
    chartName: "redis",
    chartVersion: 8.0,
    revision: 50,
    helmStatus: "Unknown",
    lastUpdate: "15 days ago",
  },
  {
    id: "6",
    img: "https://kubernetes.io/images/favicon.png",
    name: "test",
    namespace: "asdas",
    chartName: "redis",
    chartVersion: 4.0,
    revision: 20,
    helmStatus: "Unknown",
    lastUpdate: "15 days ago",
  },
  {
    id: "7",
    img: "https://kubernetes.io/images/favicon.png",
    name: "another",
    namespace: "qeqe",
    chartName: "nginx",
    chartVersion: 4.2,
    revision: 70,
    helmStatus: "Deployed",
    lastUpdate: "5 days ago",
  },
  {
    id: "8",
    img: "https://kubernetes.io/images/favicon.png",
    name: "name",
    namespace: "asdas",
    chartName: "sql",
    chartVersion: 5.1,
    revision: 20,
    helmStatus: "Uninstalled",
    lastUpdate: "30 days ago",
  },
  {
    id: "9",
    img: "https://kubernetes.io/images/favicon.png",
    name: "another",
    namespace: "qeqe",
    chartName: "nginx",
    chartVersion: 4.2,
    revision: 70,
    helmStatus: "Deployed",
    lastUpdate: "5 days ago",
  },
  {
    id: "10",
    img: "https://kubernetes.io/images/favicon.png",
    name: "test",
    namespace: "asdas",
    chartName: "redis",
    chartVersion: 4.4,
    revision: 50,
    helmStatus: "Unknown",
    lastUpdate: "15 days ago",
  },
  {
    id: "11",
    img: "https://kubernetes.io/images/favicon.png",
    name: "test",
    namespace: "asdas",
    chartName: "redis",
    chartVersion: 2.4,
    revision: 50,
    helmStatus: "Unknown",
    lastUpdate: "15 days ago",
  },
];

export const revisions = [
  {
    id: "1",
    name: "Rollback to 56",
    version: 5.1,
    files: [
      {
        status: "changed",
        name: "chart.yaml",
        content: `Each revision contains:
      1. ChangedFile names
        A. Deleted line numbers.
        B. Added line numbers.
        -Changed lines are basically deleted lines and added 	lines at the same time (so no need to return them).
      2. Deleted file names`.split("\n"),
        changedInfo: {
          addedLines: [1, 4, 5, 6],
          deletedLines: [2, 3],
        },
      },

      {
        status: "deleted",
        name: "values.yaml",
        content: `history/summary/services,pods
      dummy data for diff object
      get diff
      helm diff plugin`.split("\n"),
      },
      {
        status: "added",
        name: "index.yaml",
        content: `default values in selectors
control the range of resulst in a single page
      Add key to child component, then update the key in parent. Child component will be re-created.
      <childComponent :key="childKey"/>`.split("\n"),
      },
    ],
  },

  {
    id: "1",
    name: "another rev",
    version: 4.8,
    files: [
      {
        status: "changed",
        name: "chart.yaml",
        content: `Each revision contains:
      1. ChangedFile names
        A. Deleted line numbers.
        B. Added line numbers.
        -Changed lines are basically deleted lines and added 	lines at the same time (so no need to return them).
      2. Deleted file names`.split("\n"),
        changedInfo: {
          addedLines: [1, 4],
          deletedLines: [3],
        },
      },
      {
        status: "deleted",
        name: "values",
        content: `history/summary/services,pods
                  dummy data for diff object
                  get diff
                  helm diff plugin`.split("\n"),
      },
      {
        status: "added",
        name: "index.yaml",
        content: `default values in selectors
                  control the range of resulst in a single page
                  Add key to child component, then update the key in parent. Child component will be re-created.
                  <childComponent :key="childKey"/>`.split("\n"),
      },
    ],
  },
  {
    id: "1",
    name: "Rollback to 56",
    version: 5.1,
    files: [
      {
        status: "changed",
        name: "chart.yaml",
        content: `Each revision contains:
      1. ChangedFile names
        A. Deleted line numbers.
        B. Added line numbers.
        -Changed lines are basically deleted lines and added 	lines at the same time (so no need to return them).
      2. Deleted file names`.split("\n"),
        changedInfo: {
          addedLines: [1, 4, 5, 6],
          deletedLines: [2, 3],
        },
      },

      {
        status: "deleted",
        name: "values.yaml",
        content: `history/summary/services,pods
      dummy data for diff object
      get diff
      helm diff plugin`.split("\n"),
      },
      {
        status: "added",
        name: "index.yaml",
        content: `default values in selectors
control the range of resulst in a single page
      Add key to child component, then update the key in parent. Child component will be re-created.
      <childComponent :key="childKey"/>`.split("\n"),
      },
    ],
  },

  {
    id: "1",
    name: "another rev",
    version: 4.8,
    files: [
      {
        status: "changed",
        name: "chart.yaml",
        content: `Each revision contains:
      1. ChangedFile names
        A. Deleted line numbers.
        B. Added line numbers.
        -Changed lines are basically deleted lines and added 	lines at the same time (so no need to return them).
      2. Deleted file names`.split("\n"),
        changedInfo: {
          addedLines: [1, 4],
          deletedLines: [3],
        },
      },
      {
        status: "deleted",
        name: "values",
        content: `history/summary/services,pods
                  dummy data for diff object
                  get diff
                  helm diff plugin`.split("\n"),
      },
      {
        status: "added",
        name: "index.yaml",
        content: `default values in selectors
                  control the range of resulst in a single page
                  Add key to child component, then update the key in parent. Child component will be re-created.
                  <childComponent :key="childKey"/>`.split("\n"),
      },
    ],
  },
  {
    id: "1",
    name: "Rollback to 56",
    version: 5.1,
    files: [
      {
        status: "changed",
        name: "chart.yaml",
        content: `Each revision contains:
      1. ChangedFile names
        A. Deleted line numbers.
        B. Added line numbers.
        -Changed lines are basically deleted lines and added 	lines at the same time (so no need to return them).
      2. Deleted file names`.split("\n"),
        changedInfo: {
          addedLines: [1, 4, 5, 6],
          deletedLines: [2, 3],
        },
      },

      {
        status: "deleted",
        name: "values.yaml",
        content: `history/summary/services,pods
      dummy data for diff object
      get diff
      helm diff plugin`.split("\n"),
      },
      {
        status: "added",
        name: "index.yaml",
        content: `default values in selectors
control the range of resulst in a single page
      Add key to child component, then update the key in parent. Child component will be re-created.
      <childComponent :key="childKey"/>`.split("\n"),
      },
    ],
  },

  {
    id: "1",
    name: "another rev",
    version: 4.8,
    files: [
      {
        status: "changed",
        name: "chart.yaml",
        content: `Each revision contains:
      1. ChangedFile names
        A. Deleted line numbers.
        B. Added line numbers.
        -Changed lines are basically deleted lines and added 	lines at the same time (so no need to return them).
      2. Deleted file names`.split("\n"),
        changedInfo: {
          addedLines: [1, 4],
          deletedLines: [3],
        },
      },
      {
        status: "deleted",
        name: "values",
        content: `history/summary/services,pods
                  dummy data for diff object
                  get diff
                  helm diff plugin`.split("\n"),
      },
      {
        status: "added",
        name: "index.yaml",
        content: `default values in selectors
                  control the range of resulst in a single page
                  Add key to child component, then update the key in parent. Child component will be re-created.
                  <childComponent :key="childKey"/>`.split("\n"),
      },
    ],
  },
  {
    id: "1",
    name: "Rollback to 56",
    version: 5.1,
    files: [
      {
        status: "changed",
        name: "chart.yaml",
        content: `Each revision contains:
      1. ChangedFile names
        A. Deleted line numbers.
        B. Added line numbers.
        -Changed lines are basically deleted lines and added 	lines at the same time (so no need to return them).
      2. Deleted file names`.split("\n"),
        changedInfo: {
          addedLines: [1, 4, 5, 6],
          deletedLines: [2, 3],
        },
      },

      {
        status: "deleted",
        name: "values.yaml",
        content: `history/summary/services,pods
      dummy data for diff object
      get diff
      helm diff plugin`.split("\n"),
      },
      {
        status: "added",
        name: "index.yaml",
        content: `default values in selectors
control the range of resulst in a single page
      Add key to child component, then update the key in parent. Child component will be re-created.
      <childComponent :key="childKey"/>`.split("\n"),
      },
    ],
  },

  {
    id: "1",
    name: "another rev",
    version: 4.8,
    files: [
      {
        status: "changed",
        name: "chart.yaml",
        content: `Each revision contains:
      1. ChangedFile names
        A. Deleted line numbers.
        B. Added line numbers.
        -Changed lines are basically deleted lines and added 	lines at the same time (so no need to return them).
      2. Deleted file names`.split("\n"),
        changedInfo: {
          addedLines: [1, 4],
          deletedLines: [3],
        },
      },
      {
        status: "deleted",
        name: "values",
        content: `history/summary/services,pods
                  dummy data for diff object
                  get diff
                  helm diff plugin`.split("\n"),
      },
      {
        status: "added",
        name: "index.yaml",
        content: `default values in selectors
                  control the range of resulst in a single page
                  Add key to child component, then update the key in parent. Child component will be re-created.
                  <childComponent :key="childKey"/>`.split("\n"),
      },
    ],
  },
];

export const releasesStatus = [
  {
    releaseName: "sql",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 2,
        error: 4,
      },
      {
        name: "pods",
        healthy: 1,
        warning: 5,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 8,
        warning: 8,
        error: 1,
      },
    ],
  },
  {
    releaseName: "nginx",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "redis",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "something",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "redis",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "redis",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "redis",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "redis",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "redis",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "redis",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "redis",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "redis",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "redis",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
  {
    releaseName: "redis",
    statComponent: [
      {
        name: "services",
        healthy: 1,
        warning: 0,
        error: 0,
      },
      {
        name: "pods",
        healthy: 5,
        warning: 1,
        error: 2,
      },
      {
        name: "deployments",
        healthy: 6,
        warning: 1,
        error: 8,
      },
    ],
  },
];
