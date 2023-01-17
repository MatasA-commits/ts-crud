import type Car from './car';

type CarJoined = Car & {
  brand: string,
  model: string,
};

export default CarJoined;
