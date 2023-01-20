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
}

export default CarsCollection;
