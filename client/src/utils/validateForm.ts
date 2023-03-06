/* eslint-disable no-plusplus */
import { FormValues } from "interfaces/item";

export const validateForm = (formValues: FormValues) => {
  const errors: { message: string } = { message: "" };
  let hasError = false;

  Object.keys(formValues).forEach((key) => {
    switch (key) {
      case "title":
        if (!formValues.title) {
          errors.message = "Title is required";
          hasError = true;
        }
        break;

      case "description":
        if (!formValues.description) {
          errors.message = "Description is required";
          hasError = true;
        }
        break;

      case "propertyType":
        if (!formValues.itemType) {
          errors.message = "Property type is required";
          hasError = true;
        }
        break;


      case "price":
        if (!formValues.price) {
          errors.message = "Price is required";
          hasError = true;
        }
        break;

      default:
        hasError = false;
    }
  });

  return { hasError, errors };
};

export const hasChanged = (
  initialValues: FormValues,
  currentValues: FormValues
) => {
  const initialValuesArray = Object.values(initialValues);
  const currentValuesArray = Object.values(currentValues);
  for (let i = 0; i < initialValuesArray.length; i++) {
    if (initialValuesArray[i] !== currentValuesArray[i]) {
      return true;
    }
  }
  return false;
};
