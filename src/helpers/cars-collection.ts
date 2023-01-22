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
  private props: CarsCollectionProps;

  constructor(props: CarsCollectionProps) {
    this.props = JSON.parse(JSON.stringify(props));
  }

  public get allCars(): CarJoined[] {
    return this.props.cars.map((car) => this.joinCar(car));
  }

  public get brands(): Brand[] {
    return JSON.parse(JSON.stringify(this.props.brands));
  }

   private joinCar(car: Car): CarJoined {
    const carModel = this.props.models.find((model) => car.modelId === model.id);

    if (carModel === undefined) throw new Error(CarsCollection.MODEL_ERROR);

    const carBrand = this.props.brands.find((brand) => brand.id === carModel.brandId);

    if (carBrand === undefined) throw new Error(CarsCollection.BRAND_ERROR);

    const carModelString = carModel.title;
    const carBrandString = carBrand.title;
    return {
      ...car,
      brand: carBrand && carBrandString,
      model: carModel && carModelString,
    };
  }

  public deleteCarById = (carId: string): void => {
    this.props.cars = this.props.cars
    .filter((car) => car.id !== carId);
  };

  public getByBrandId = (brandId: string):CarJoined[] => {
    const modelIds = this.props.models.filter((model) => model.brandId === brandId)
    .map((model) => model.id);

    const cars = this.props.cars.filter((car) => modelIds.includes(car.modelId));
    const joinedCars = cars.map((car) => this.joinCar(car));
    return joinedCars;
  };

  getBrandById = (brandId: string): Brand => {
    const brand = this.props.brands.find(({ id }) => id === brandId);

    if (brand === undefined) {
      throw new Error(`Nerasta marke su id ${brandId}`);
    }

    return brand;
  };
}

export default CarsCollection;
