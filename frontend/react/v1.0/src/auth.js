//auth.js
import $ from 'jquery';

export const login = (username, pass, cb) => {
    if (localStorage.token) {
        if (cb) cb(true)
        return
    }
    this.getToken(username, pass, (res) => {
        if (res.authenticated) {
            localStorage.token = res.token
            if (cb) cb(true)
        } else {
            if (cb) cb(false)
        }
    })
}     
    
export const logout = () => {
    delete localStorage.token
}

export const loggedIn = () => {
    return !!localStorage.token
}

export const getToken = (username, pass, cb) => {
    console.log("GetToken" + username + pass)
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:8000/api-token-auth/',
        data: {
            username: username,
            password: pass
        },
        dataType: "json",
        success: function(res){
            cb({
                authenticated: true,
                token: res.token
            })
        }
    })
}