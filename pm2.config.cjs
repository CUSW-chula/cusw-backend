module.exports = {
  name: "elysia-app",
  script: "src/index.ts",
  interpreter: "bun",
  env: {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    NODE_ENV: "production",
  },
  interpreter: "none", // Allows PM2 to directly execute Bun
};
