
export function getDataCurrent(content) {
    fetch(`/api/weather/temphumidity/current`)
    .then(result=>result.json())
    .then(tempCurr=>content.setState({tempCurr}));
    setTimeout(() => {
        getDataCurrent(content);
    },120000);
}
export function getDataForecast(content) {
    fetch(`/api/weather/forecast`)
    .then(result=>result.json())
    .then(forecast=>{
        const data=forecast.data;
        content.setState({forecast:data});

    });

    setTimeout(() => {
        getDataForecast(content);
    },60000*60);
}
export function getTime(content,isSeconds) {
    var d=new Date();
    var cTime=d.toLocaleTimeString();
    var cSeconds=d.getSeconds();
    if (cSeconds % 20 === 0) {
        isSeconds=false;
    }
    if (!isSeconds) {
        cTime=cTime.replace(/:\d+ /, ' ');
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
      curTime : cTime
    })
}
