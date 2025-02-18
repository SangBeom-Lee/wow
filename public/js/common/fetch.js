async function apiFetchPost(url, params, callbackMethod) {
    await fetch(url, {
        method: "POST",
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
        body: new URLSearchParams(params)
    })
    .then(res =>{
        if (res.redirected) { // 리다이렉트가 있을 경우 (에러 발생 시 화면 이동을 위해)
            window.location.href = res.url;
            res.redirect(res.url)
        }
        // 응답 데이터를 JSON 형태로 받아서 다음 then으로 넘김
        return res.json()
    })
    .then(res => {
        callbackMethod(res); // 함수 실행
    })
    .catch((error) => {
        console.log(error);
        alert("에러가 발생했습니다. \r\n관리자에게 문의해주십시오.");
    });
}

async function apiFetchGet(url, callbackMethod) {
    var data = "";
    await fetch(url, {
        method: "GET",
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
    })
    .then(res =>{
        if (res.redirected) { // 리다이렉트가 있을 경우 (에러 발생 시 화면 이동을 위해)
            window.location.href = res.url;
            res.redirect(res.url)
        }
        // 응답 데이터를 JSON 형태로 받아서 다음 then으로 넘김
        return res.json()
    })
    .then(res => {
        if(typeof callbackMethod === "function"){
            callbackMethod(res); // 함수 실행    
        } else {
            data = res;
        }        
    })
    .catch((error) => {
        console.log(error);
        alert("에러가 발생했습니다. \r\n관리자에게 문의해주십시오.");
    });

    return data;
}