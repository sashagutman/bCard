import { User } from "../../interfaces/users/User";

export function normalizeUpdatedUser(values: User): Partial<User> {
    return {
      name: {
        first: values.name.first,
        middle: values.name.middle,
        last: values.name.last,
      },
      phone: values.phone,
      email: values.email,
      image: {
        url: values.image.url,
        alt: values.image.alt,
      },
      address: {
        state: values.address.state,
        country: values.address.country,
        city: values.address.city,
        street: values.address.street,
        houseNumber: values.address.houseNumber,
        zip: values.address.zip ?? undefined,
      },
    };
  }
  
  