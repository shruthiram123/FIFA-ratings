from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('serverStatus', views.server_status),
    path('getPlayers', views.get_range),
    path('getHeadings', views.get_headings),
    path('getPlayerById', views.search_player),
    path('deletePlayerById', views.delete_player),
    path('editPlayerById', views.edit_player),
    path('addPlayer', views.add_player)

]
