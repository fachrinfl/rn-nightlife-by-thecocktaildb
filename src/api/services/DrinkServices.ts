import ApiClient from '../ApiClient';
import {
  DrinkByCategoryParams,
  DrinkByCategoryResponse,
  DrinkResponse,
} from '../types/Drinks';

export const drinkCategoryServices = async (): Promise<DrinkResponse> => {
  try {
    const response: DrinkResponse = await ApiClient.get(
      '/api/json/v1/1/list.php?c=list',
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const drinkByCategoryServices = async (
  params: DrinkByCategoryParams,
): Promise<DrinkByCategoryResponse> => {
  try {
    const response: DrinkByCategoryResponse = await ApiClient.get(
      '/api/json/v1/1/filter.php',
      {
        params: {
          c: params.category,
        },
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};
