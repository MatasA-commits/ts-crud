import type Car from '../types/car';
import type Brand from '../types/brand';
import type Model from '../types/model';
import type CarJoined from '../types/car-joined';

type CarsCollectionProps = {
  cars: Car[],
  brands: Brand[],
  models: Model[],
};

class CarsCollection {
  private static BRAND_ERROR = 'Brand not found';

  private static MODEL_ERROR = 'Model not found';

  private cars: Car[];

  private brands: Brand[];

  private models: Model[];

  constructor({
    cars,
    brands,
    models,
  }: CarsCollectionProps) {
    this.cars = JSON.parse(JSON.stringify(cars));
    this.brands = JSON.parse(JSON.stringify(brands));
    this.models = JSON.parse(JSON.stringify(models));
  }

  public get allCars(): CarJoined[] {
    return this.cars.map((car) => this.joinCar(car));
  }

   private joinCar(car: Car): CarJoined {
    const carModel = this.models.find((model) => car.modelId === model.id);

    if (carModel === undefined) throw new Error(CarsCollection.MODEL_ERROR);

    const carBrand = this.brands.find((brand) => brand.id === carModel.brandId);

    if (carBrand === undefined) throw new Error(CarsCollection.BRAND_ERROR);

    const carModelString = carModel.title;
    const carBrandString = carBrand.title;
    return {
      ...car,
      brand: carBrandString,
      model: carModelString,
    };
  }
}

export default CarsCollection;
