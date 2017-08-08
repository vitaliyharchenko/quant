from django.conf.urls import url
from django.contrib.auth.views import login as login_view
from . import views

urlpatterns = [

    url(r'^profile/(?P<user_id>[0-9]+)$', views.user, name='profile'),
    url(r'^settings$', views.settings, name='settings'),
    url(r'^changepass$', views.change_password, name='change_password'),

    url(r'^signup/$', views.signup, name='signup'),

    url(r'^login/$', login_view, kwargs={'template_name': 'users/login.html'}, name='login'),

    url(r'^social_auth/(?P<backend>[^/]+)$', views.social_auth, name='social_auth_begin'),
    url(r'^social_auth_complete/(?P<backend>[^/]+)$', views.social_auth_complete, name='social_auth_complete'),
    url(r'^social_auth_deassociate/(?P<backend>[^/]+)$', views.social_auth_deassociate, name='social_auth_deassociate'),

    url(r'^send_activation/$', views.send_activation, name='send_activation'),

    url(r'^account_activation_sent/$', views.account_activation_sent, name='account_activation_sent'),
    url(r'^account_activation_success/$', views.account_activation_success, name='account_activation_success'),

    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate, name='activate'),

    url(r'^password_reset/$', views.password_reset, name='password_reset'),
    url(r'^password_reset/start/$', views.password_reset_done, name='password_reset_done'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.password_reset_confirm, name='password_reset_confirm'),
    url(r'^reset/done/$', views.password_reset_complete, name='password_reset_complete'),

    url(r'^$', views.user_list, name="main"),
    url(r'^(?P<pk>[0-9]+)$', views.user_detail, name="user"),
    url(r'^get_token/$', views.get_token, name="get_token"),
]