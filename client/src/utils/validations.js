export const requiredField = v => !!v || "Field is required"

export const tooLongField = v => !!(v && v.length <= 60) || "Field is too long"

export const tooShortField = v => !!(v && v.length >= 2) || "Field is too short"

export const onlyWhitespaces = v => !!(v && v.replace(/\s/g, "").length) || "Field contains only whitespaces"

export const uniqueField = v => {
    let pl = this.players.filter(player => player.name === v);
    return !!(v && pl.length < 2) || "This field should be unique";
}

export const linkField = v => {
    const link = v.match(/(https?:\/\/[^\s]+)/g);
    return !!link || "Please provide a correct link";
}

export const emailField = v => /.+@.+\..+/.test(v) || "E-mail must be valid"

export const shortPassword = v => !!(v && v.length >= 6) || "Password is too short"


export const standardField = [requiredField, tooLongField, tooShortField, onlyWhitespaces]

