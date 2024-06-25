type DrinkCategory = {
  strCategory: string;
};

export type DrinkResponse = {
  drinks: DrinkCategory[];
};

export type DrinkByCategoryParams = {
  category: string;
};

export type DrinkByCategory = {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
  price?: number;
};

export type DrinkByCategoryResponse = {
  drinks: DrinkByCategory[];
};
