type ValidationTypes = "name" | "email" | "password" | "plate" | "spotId";

export function validate<Types, ValueType>(
  type: ValidationTypes,
  value: string
): string | null {
  switch (type) {
    case "name": {
      return !value
        ? "Please provide a name"
        : value.length < 5
        ? "Please provide a name with more than 5 characters"
        : null;
    }

    case "email": {
      const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return !value
        ? "Please provide an e-mail"
        : !value.match(emailRegex) && value.length >= 4
        ? "Please provide an e-mail with @ and domain"
        : null;
    }

    case "password": {
      return !value
        ? "Please provide a password"
        : value.length < 3
        ? "Please provide a password with more than 3 characters"
        : null;
    }

    case "plate": {
      return !value
        ? "Please provide a plate number"
        : value.length != 8
        ? "Please provide a plate number with 8 characters"
        : null;
    }

    case "spotId": {
      return !value
        ? "Please provide the id of the spot"
        : value.length != 8
        ? "Please provide a valid spot id, with 8 characters"
        : null;
    }

    default:
      return null;
  }
}

export function hasValidationErrors<Errors>(errors: Errors): boolean {
  for (const error of Object.values(errors)) {
    if (error) return true;
  }
  return false;
}
