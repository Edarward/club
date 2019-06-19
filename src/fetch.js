class Http {

    //表示跨域请求时，使用凭证 允许后台在header响应头中带参数接收 这样就可以保证token一致
    withCredentials = true;
    checkStatus(response) { //检查响应状态
        if (response.status >= 200 && response.status < 300 || response.status === 403) { //响应成功
            return response;
        }
        if (response.status === 301 || response.status === 302) { //重定向
            window.location = response.headers.get('Location');
        }
        const error = new Error(response.statusText);
        error.data = response;
        throw error;
    }
    async parseResult(response) { //解析返回的结果
        const contentType = response.headers.get('Content-Type');
        if (contentType != null) {
            if (contentType.indexOf('text') > -1) {
                return await response.text()
            }
            if (contentType.indexOf('form') > -1) {
                return await response.formData();
            }
            if (contentType.indexOf('video') > -1) {
                return await response.blob();
            }
            if (contentType.indexOf('json') > -1) {
                return await response.json();
            }
        }
        return await response.text();
    }
    async processResult(response) {
        let _response = this.checkStatus(response)
        _response = await this.parseResult(_response);
        return _response;
    }
    async request(method, url, body, headers) {
        try {
            let options = {
                method,
                body,
                headers,
            }
            let response = await fetch(url, options);
            response = await this.processResult(response); //这里是对结果进行处理。包括判断响应状态和根据response的类型解析结果
            return response;
        } catch (error) {
            throw error;
        }
    }
    //异步请求
    async get(api, data = undefined, headers ={
        'content-type': 'application/json',
        "token": sessionStorage.getItem('token')
    }) {
        return await this.request('GET', api, data, headers);
    }

    async post(api, data = {}, headers ={
        'content-type': 'application/json',
        "token": sessionStorage.getItem('token')
    }) {
        return await this.request('POST', api, JSON.stringify(data), headers);
    }

}
let http = new Http();

export default http;