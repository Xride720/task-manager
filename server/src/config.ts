export const PORT = 5000;
export const mongoLogin = "login";
export const mongoPassword = "password";
export const environment = {
  development: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: `mongodb://localhost:27017/Project_rs`
  },
  production: {
      serverURL: `http://localhost:${PORT}/`,
      dbString: `mongodb+srv://${mongoLogin}:${mongoPassword}@clustertest.zsjvl.mongodb.net/?retryWrites=true&w=majority`
  }
};

export type EnvType = "development" | "production";
export const SECRET_KEY = "SUPER_SECRET_KEY";
