import app from "./src";
import { db } from "./src/lib";

const port = process.env.PORT || 5005;

main();

async function main() {
  try {
    app.listen(port, () => {
      console.log(`[server]: Server is running at ${process.env.API_URL}`);
    });
    await db.$disconnect();
  } catch (error) {
    console.log(error);
    await db.$disconnect();
    process.exit(1);
  }
}
