import express, { Request, Response } from "express";
import axios from "axios";
import { getCache, setCache } from "./cache";

export const startServer = async (port: number, origin: string) => {
  const app = express();

  app.get("/{*splat}", async (req: Request, res: Response) => {
    const splat = req.params.splat as unknown as string[] | undefined;
    let cacheKey = `${origin}`;
    let endPoint = "";

    if (splat !== undefined) {
      cacheKey += `:${splat.join(":")}`;
      endPoint = `/${splat.join("/")}`;
    }

    const cache = getCache(cacheKey);

    if (cache) {
      res.set("X-Cache", "HIT");
      res.send(JSON.parse(cache));

      return;
    }

    try {
      const response = await axios.get(`${origin}${endPoint}`);

      setCache(cacheKey, JSON.stringify(response.data));

      res.set("X-Cache", "MISS");
      res.send(response.data);
    } catch (error) {
      res
        .status(502)
        .json({ error: (error as Error).message || "Bad Gateway" });
    }
  });

  app.listen(port, () => {
    console.log(`Proxy running at http://localhost:${port}\n`);
  });
};
