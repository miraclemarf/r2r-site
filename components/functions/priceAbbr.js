import NumAbbr from 'number-abbreviate';

export const priceAbbr = (isAbbr, value) => {
    let result;
    if(isAbbr){
        var numAbbr = new NumAbbr(['<span class="text-sm">Rb</span>', '<span class="text-sm">Jt</span>', '<span class="text-sm">M</span>', '<span class="text-sm">T</span>'])

         result = '<span class="text-sm">Rp</span> '+numAbbr.abbreviate(value, 2)
    }
    else{
        result = '<span>Rp</span> '+String(value).replace(/(.)(?=(\d{3})+$)/g,'$1.')
    }

    return result
}