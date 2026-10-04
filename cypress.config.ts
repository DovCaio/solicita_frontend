import { defineConfig } from "cypress";
import { exec } from "child_process";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        clearRequests() {
          return new Promise((resolve, reject) => {
            exec(
              `docker exec solicita-postgres psql -d solicita -U solicita -c "TRUNCATE TABLE requests RESTART IDENTITY;"`,
              (error, stdout, stderr) => {
                if (error) {
                  reject(error);
                  return;
                }

                console.log(stdout);
                console.error(stderr);

                resolve(null);
              },
            );
          });
        },
        createRequest() {
          return new Promise((resolve, reject) => {
            const sql = `
              INSERT INTO requests (
                title,
                description,
                category,
                status,
                user_id
              )
              VALUES (
                'Request de teste',
                'Descrição da request de teste',
                'TI',
                'ABERTO',
                1
              );
            `;

            exec(
              `docker exec solicita-postgres psql -d solicita -U solicita -c "${sql}"`,
              (error, stdout, stderr) => {
                if (error) {
                  reject(error);
                  return;
                }

                console.log(stdout);
                console.error(stderr);

                resolve(null);
              },
            );
          });
        },
      });
    },
    baseUrl: "http://localhost:3002",
  },
});
