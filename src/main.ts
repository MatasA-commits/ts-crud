import App from './components/app';
import CarsCollection from './helpers/cars-collection';
import cars from './data/cars';
import brands from './data/brands';
import models from './data/models';

const carsCollection = new CarsCollection({
  cars, brands, models,
});

console.log(carsCollection.allCars);

const app = new App('#root');
app.initialize();
