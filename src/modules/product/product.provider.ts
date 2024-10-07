import { Product } from './product.entity';
import { PRODUCT_REPOSITORY } from '../../core/database/constant/index';

export const productProviders = [{
    provide: PRODUCT_REPOSITORY,
    useValue: PRODUCT_REPOSITORY,
}];