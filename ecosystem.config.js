module.exports = {
    apps: [
      {
        name: 'elysia-app',
        script: 'bun',
        args: 'run dev',
        env: {
          // biome-ignore lint/style/useNamingConvention: <explanation>
          NODE_ENV: 'production'
        },
        interpreter: 'none' // Allows PM2 to directly execute Bun
      }
    ]
  };
  