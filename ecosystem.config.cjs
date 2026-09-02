module.exports = {
  apps: [
    {
      name: "portfolio",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3333",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
