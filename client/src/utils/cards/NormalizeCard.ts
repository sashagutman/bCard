import { CreateCardValues } from "../../interfaces/CreateCardValues";
import { CreateCardPayload } from "../../interfaces/CreateCardPayload";

export function normalizeCard(values: CreateCardValues): CreateCardPayload {
  const payload: CreateCardPayload = {
    title: values.title,
    subtitle: values.subtitle,
    description: values.description,
    phone: values.phone,
    email: values.email,
    web: values.web,
    image: {
      url: values.url || '',
      alt: values.alt || '',
    },
    address: {
      state: values.state || '',
      country: values.country,
      city: values.city,
      street: values.street,
      houseNumber: values.houseNumber,
    },
  };

  if (typeof values.zip === 'number') {
    payload.address.zip = values.zip;
  }

  return payload;
}



