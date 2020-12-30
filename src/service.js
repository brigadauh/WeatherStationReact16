
import {formatDate} from './utils/dateFormatter';

export function getDataCurrent(content) {
    setTimeout(() => {
        getDataCurrent(content);
    },120000);
    return fetch(`/api/weather/temphumidity/current`)
    .then(result=>result.json())
    .then(tempCurr=>content.setState({tempCurr}))
    .catch((err) => console.log('getDataCurrent catch'));
}
export function getDataForecast(content) {
    setTimeout(() => {
        getDataForecast(content);
    },60000*60);
    return fetch(`/api/weather/forecast`)
    .then(result=>result.json())
    .then(forecast=>{
        const data=forecast.data;
        content.setState({forecast:data});

    })
    .catch((err) => console.log('getDataCurrent catch'));

}
export function getTime(content,isSeconds) {
    let d = new Date();
    let dPT = new Date(d);
    dPT = new Date(dPT.setHours(dPT.getHours() - 3));
    let cTime = d.toLocaleTimeString('en-US');
    let cTimePT = dPT.toLocaleTimeString('en-US');
    let cSeconds=d.getSeconds();
    if (cSeconds % 20 === 0) {
        isSeconds=false;
    }
    if (!isSeconds) {
        // cTime=cTime.replace(/:\d+ /, ' ');
        cTime = formatDate(d, 'h:mm TT');
        cTimePT = formatDate(dPT, 'h:mm TT');
        setTimeout( () => {
            getTime(content,false);
        },1000);
    }
    else {
        setTimeout( () => {
            getTime(content,true);
        },1000);

    }
    if (isSeconds || cSeconds % 20 === 0 )
    content.setState({
        curTime: cTime,
        curTimePT: cTimePT
    })
}
