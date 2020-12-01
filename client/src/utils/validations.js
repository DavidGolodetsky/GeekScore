export const requiredField = v => !!v || "Field is required"

export const tooLongField = v => {
  if (v) return !!(v.length <= 60) || "Field is too long"
}

export const tooShortField = v => {
  if (v) return !!(v.length >= 2) || "Field is too short"
}

export const onlyWhitespaces = v => {
  if (v) return !!(v.replace(/\s/g, "").length) || "Field contains only whitespaces"
}

export const linkField = v => {
  if (v) {
    const link = (v && v.match(/(https?:\/\/[^\s]+)/g))
    return !!link || "Please provide a correct link";
  }
}

export const emailField = v => {
  if (v) return /.+@.+\..+/.test(v) || "E-mail must be valid"
}

export const shortPassword = v => {
  if (v) return !!(v.length >= 6) || "Password is too short"
}


export const standardField = [tooLongField, tooShortField, onlyWhitespaces]

