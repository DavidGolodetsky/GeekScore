export const requiredField = v => !!v || "Field is required"

export const tooLongField = v => v ? !!(v.length <= 60) || "Field is too long" : true

export const tooShortField = v => v ? !!(v.length >= 2) || "Field is too short" : true

export const onlyWhitespaces = v => v ? !!(v.replace(/\s/g, "").length) || "Field contains only whitespaces" : true

export const emailField = v => v ? /.+@.+\..+/.test(v) || "E-mail must be valid" : true

export const shortPassword = v => v ? !!(v.length >= 6) || "Password is too short" : true

export const linkField = v => {
  if (v) {
    const link = (v && v.match(/(https?:\/\/[^\s]+)/g))
    return !!link || "Please provide a correct link";
  } else true
}



export const standardField = [tooLongField, tooShortField, onlyWhitespaces]

