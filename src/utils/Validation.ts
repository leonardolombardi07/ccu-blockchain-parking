type ValidationTypes = "name" | "email" | "password";

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
