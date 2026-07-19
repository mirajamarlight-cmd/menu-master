/**
 * ponytail: tiny assert-based self-check for menu price/locale helpers.
 * Run: npx tsx src/lib/menu-data.selfcheck.ts
 */
import { displayPrice, localizedName, type MenuItem } from "./menu-data";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(msg);
}

const sized: MenuItem = {
  name: "Test",
  price: "999",
  sizes: [
    { label: "S", price: "100" },
    { label: "L", price: "250" },
  ],
};

const priced = displayPrice(sized);
assert(priced.startingFrom === true, "sizes should imply startingFrom");
assert(priced.price === "100", `expected min size price 100, got ${priced.price}`);

assert(localizedName({ name: "Hummus", name_am: "ሑመስ" }, "am") === "ሑመስ", "am locale");
assert(localizedName({ name: "Hummus", name_ar: "حمص" }, "ar") === "حمص", "ar locale");
assert(localizedName({ name: "Hummus" }, "en") === "Hummus", "en locale");

console.log("menu-data.selfcheck: ok");
