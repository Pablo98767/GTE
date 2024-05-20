
export interface userProps {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export interface updateUserProps {
  userProfile: {
    name?: string | undefined;
    email?: string | undefined;
    oldPassword?: string | undefined;
    newPassword?: string | undefined;
    birthday?: string | undefined;
    homePhone?: string | undefined;
    workPhone?: string | undefined;
    mobilePhone?: string | undefined;
    isActive?: boolean;
    deletedBy?: string | undefined;
  };
  avatarFile?: File | null;
}

export interface SidebarProps {
  hasPermission: boolean;
}

export interface categoryProps {
  id?: string;
  name?: string;
  description?: string;
  dishes: {
    id?: string;
    dishId?: string;
    categoryId?: string;
    dish: dishProps;
  }[];
}

export interface dishCategoryProps {
  id?: string;
  dishId?: string;
  categoryId?: string;
  dish: dishProps;
}

export interface dishProps {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  status?: string;
  ingredients?: string;
  summary_description?: string;
  full_description?: string;
  price?: string;
  image?: string;
  restaurantId?: string;
  isActive?: boolean;
  categories?: {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    categoryId?: string;
    category?: {
      id?: string;
      createdAt?: string;
      updatedAt?: string;
      name?: string;
      description?: string;
    }
  },
}

export interface editDishProps {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  status?: string;
  ingredients?: string[];
  summary_description?: string;
  full_description?: string;
  price?: string;
  image?: string;
  restaurantId?: string;
  category?: string;
}

export interface openOrderProps {
  dishId?: string;
  quantity?: number;
}

export interface categoryProps {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  description?: string;
}

export interface favoriteDishProps {
  id?: number;
  userId?: string;
  dishId?: number;
}

export interface restaurantsProps {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  cnpj?: string;
  isActive?: boolean;
}