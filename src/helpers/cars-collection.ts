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

  private privateCars: Car[];

  private privateBrands: Brand[];

  private privateModels: Model[];

  constructor({ cars, brands, models }: CarsCollectionProps) {
    this.privateCars = JSON.parse(JSON.stringify(cars));
    this.privateBrands = JSON.parse(JSON.stringify(brands));
    this.privateModels = JSON.parse(JSON.stringify(models));
  }

  public get allCars(): CarJoined[] {
    return this.privateCars.map((car) => this.joinCar(car));
  }

  public get brands(): Brand[] {
    return JSON.parse(JSON.stringify(this.privateBrands));
  }

   private joinCar(car: Car): CarJoined {
    const carModel = this.privateModels.find((model) => car.modelId === model.id);

    if (carModel === undefined) throw new Error(CarsCollection.MODEL_ERROR);

    const carBrand = this.privateBrands.find((brand) => brand.id === carModel.brandId);

    if (carBrand === undefined) throw new Error(CarsCollection.BRAND_ERROR);

    const carModelString = carModel.title;
    const carBrandString = carBrand.title;
    return {
      ...car,
      brand: carBrand && carBrandString,
      model: carModel && carModelString,
    };
  }

  public getByBrandId = (brandId: string):CarJoined[] => {
    const modelIds = this.privateModels.filter((model) => model.brandId === brandId)
    .map((model) => model.id);

    const cars = this.privateCars.filter((car) => modelIds.includes(car.modelId));
    const joinedCars = cars.map((car) => this.joinCar(car));
    return joinedCars;
  };
}

export default CarsCollection;
