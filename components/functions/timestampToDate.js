export const timestampToDate = (props) => {
    const isUnix = props.toString().length === 13
    const newValue = isUnix ? props : props * 1000
    const newDate = new Date(newValue)
    const monthVal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']
    const dates = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate()
    return dates + " " + monthVal[newDate.getMonth()] + " " + newDate.getFullYear()
}