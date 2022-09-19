
module.exports = {
  projects: {
      app: {
          schema: ["./src/schema.ts"],
          documents: ["**/*.{graphql,js,ts,jsx,tsx}"],
      }
  }
}