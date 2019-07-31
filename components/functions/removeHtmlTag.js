export const removeHtmlTag = (text) => {
    let regex = /(<([^>]+)>)/ig
    return text.toString().replace(regex, "")
}