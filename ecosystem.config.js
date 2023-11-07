module.exports = {
    apps: [
        {
            name: "my-app",
            script: "./src/index.js", // Your entry point file
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '200M'
        },
    ],
};
