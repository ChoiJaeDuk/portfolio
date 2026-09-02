module.exports = {
  apps: [
    {
      name: "egic",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 13100",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
