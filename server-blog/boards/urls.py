from django.conf.urls import include
from django.conf.urls import url
from rest_framework.authtoken import views as token_view
from boards import views

urlpatterns = [

    url(r'^boards/$', views.BoardList.as_view()),

    # url(r'^topic/posts/$', views.TopicWithPostList.as_view()),

    # url(r'^topics/$', views.TopicList.as_view()),

    url(r'^posts/$', views.PostList.as_view()),

    url(r'^posts/(?P<pk>\d+)$', views.PostDetail.as_view()),

    url(r'^boards/(?P<pk>\d+)/$', views.BoardDetail.as_view()),

    url(r'^topics/(?P<topic_pk>\d+)/posts/$', views.PostList.as_view()),

    url(r'^boards/(?P<board_pk>\d+)/topics/$', views.TopicList.as_view()),

    url(r'^users/$', views.UserList.as_view()),

    url(r'^users/getcurrent/$', views.currentUser.as_view()),

    url(r'^topics/(?P<pk>\d+)/$', views.TopicDetail.as_view()),

    url(r'^subjects/$', views.SubjectList.as_view()),

    url(r'^countries/$', views.CountryList.as_view()),

    url(r'^cities/$', views.CityList.as_view()),

    url(r'^api-auth/', include('rest_framework.urls')),

    url(r'^api-token-auth/', token_view.obtain_auth_token),

]
