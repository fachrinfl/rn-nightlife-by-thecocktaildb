import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {
  drinkByCategoryServices,
  drinkCategoryServices,
} from '../services/DrinkServices';
import {
  DrinkByCategoryParams,
  DrinkByCategoryResponse,
  DrinkResponse,
} from '../types/Drinks';
import {getQueryKey} from '../types/query';

export const useCategoryDrinks = (): UseQueryResult<DrinkResponse, Error> =>
  useQuery({
    queryKey: getQueryKey('drinkCategory'),
    queryFn: () => drinkCategoryServices(),
  });

export const useDrinkByCategory = (
  params: DrinkByCategoryParams,
): UseQueryResult<DrinkByCategoryResponse, Error> =>
  useQuery({
    queryKey: getQueryKey('drinkByCategory', params),
    queryFn: async () => {
      const response = await drinkByCategoryServices(params);
      const newResponse: DrinkByCategoryResponse = {
        drinks: response.drinks.map(item => ({
          ...item,
          price: generateRandomCocktailPrice(),
        })),
      };
      return newResponse;
    },
  });

const generateRandomCocktailPrice = (
  minPrice: number = 5,
  maxPrice: number = 15,
): number => {
  const price = Math.random() * (maxPrice - minPrice) + minPrice;
  return parseFloat(price.toFixed(2));
};
