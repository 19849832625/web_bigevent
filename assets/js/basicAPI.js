//每次调用$.get或者$.post或ajx的时候，会先调用下面这个函数
//这个函数可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //统一为有权限的接口，设置headers 请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载complete回调函数,
    options.complete = function (res) {
        //无论成功还是失败 最终都会调用conplete这个函数 这个是Jquery ajax的内置函数

        // console.log('执行了complete回调');
        // console.log(res);
        // 在complete回调函数中，可以使用res.response.JSON拿到服务器相应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制返回登录页
            location.href = '/login.html'

        }
    }
})