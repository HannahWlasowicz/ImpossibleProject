import faker from "faker";
import seedrandom from "seedrandom";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const seedParam = urlParams.get("seed");
if (seedParam) {
  seedrandom(seedParam, { global: true });
  faker.seed(Math.random());
}
const rng = seedParam ? seedrandom(seedParam) : seedrandom();

let faTime: number | undefined = undefined;
const faTimeParam = urlParams.get("faTime");
if (faTimeParam && !Number.isNaN(Number.parseInt(faTimeParam))) {
  faTime = Number.parseInt(faTimeParam);
}
export { faTime, rng };