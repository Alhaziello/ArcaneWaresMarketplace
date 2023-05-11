import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    itemType: string,
    price: number | undefined,
}

export interface ItemCardProps {
  id?: BaseKey | undefined,
  title: string,
  price: string,
  photo: string,
}
