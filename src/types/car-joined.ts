import type Car from './car';

type CarJoined = Omit<Car, 'modelId'> & {
  brand: string,
  model: string,
};

export default CarJoined;
