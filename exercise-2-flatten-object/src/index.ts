// To run this example, use `npx ts-node src/index.ts`
import { flattenObject } from "./flattenObject";

const obj = {
  a: 1,
  b: {
    c: "hello",
    d: {
      e: true,
    },
  },
  f: [{ g: "world" }],
};

console.log(flattenObject(obj));
