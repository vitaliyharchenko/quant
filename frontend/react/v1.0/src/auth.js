//auth.js
import $ from 'jquery';

module.exports = {
    login: function(username, pass, cb) {
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
    },        
    
    logout: function() {
        delete localStorage.token
    },

    loggedIn: function() {
        return !!localStorage.token
    },

    getToken: function(username, pass, cb) {
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
}