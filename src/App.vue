<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import signIn from '@/page/signIn'
import signUp from '@/page/signUp'
import homePage from '@/page/homePage/homePage'
import blog from '@/page/blog/blog'
import personalCenter from '@/page/personalCenter/personalCenter'
import newBlogList from '@/page/blog/newBlogList'
import personData from '@/page/personalCenter/personData/personData'
import allBlogList from '@/page/personalCenter/personBlog/allBlogList'
import blogCategory from '@/page/personalCenter/personBlog/blogCategory'
import allAlbumList from '@/page/personalCenter/personAlbum/allAlbumList'
import albumCategory from '@/page/personalCenter/personAlbum/albumCategory'
import myComment from '@/page/personalCenter/myComment/myComment'
import myParticipate from '@/page/personalCenter/myParticipate/myParticipate'
import addBlog from '@/page/personalCenter/addBlog/addBlog'
import addPhoto from '@/page/personalCenter/addPhoto/addPhoto'
import album from '@/page/album/album'
import albumClass from '@/page/album/albumClass'
import leaveMessage from '@/page/leaveMessage/leaveMessage'

export default {
  name: 'App',
  components: {
    signUp,signIn,homePage,blog,personalCenter,newBlogList,
    personData,allBlogList,blogCategory,allAlbumList,albumCategory,
    myComment,myParticipate,addBlog,addPhoto,album,albumClass,
    leaveMessage,
  }
}
</script>

<style>
  .container {
    margin-right: auto;
    margin-left: auto;
  }
  a{
    display: block;
    text-decoration: none;
  }
  a:hover{
    text-decoration: none;
  }
  @media (min-width: 768px) {
    .container {
      width: 750px;
    }
  }
  @media (min-width: 992px) {
    .container {
      width: 970px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      width: 1170px;
    }
  }
  .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  }
  .panel-body {
    padding: 15px;
  }
  .panel-heading {
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .panel-heading > .dropdown .dropdown-toggle {
    color: inherit;
  }
  .panel-title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 16px;
    color: inherit;
  }
  .panel-title > a,
  .panel-title > small,
  .panel-title > .small,
  .panel-title > small > a,
  .panel-title > .small > a {
    color: inherit;
  }
  .panel-footer {
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .panel > .list-group,
  .panel > .panel-collapse > .list-group {
    margin-bottom: 0;
  }
  .panel > .list-group .list-group-item,
  .panel > .panel-collapse > .list-group .list-group-item {
    border-width: 1px 0;
    border-radius: 0;
  }
  .panel > .list-group:first-child .list-group-item:first-child,
  .panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {
    border-top: 0;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .panel > .list-group:last-child .list-group-item:last-child,
  .panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {
    border-bottom: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .panel-heading + .list-group .list-group-item:first-child {
    border-top-width: 0;
  }
  .list-group + .panel-footer {
    border-top-width: 0;
  }
  .panel-group {
    margin-bottom: 20px;
  }
  .panel-group .panel {
    margin-bottom: 0;
    border-radius: 4px;
  }
  .panel-group .panel + .panel {
    margin-top: 5px;
  }
  .panel-group .panel-heading {
    border-bottom: 0;
  }
  .panel-group .panel-heading + .panel-collapse > .panel-body,
  .panel-group .panel-heading + .panel-collapse > .list-group {
    border-top: 1px solid #ddd;
  }
  .panel-group .panel-footer {
    border-top: 0;
  }
  .panel-group .panel-footer + .panel-collapse .panel-body {
    border-bottom: 1px solid #ddd;
  }
  .panel-default {
    border-color: #ddd;
  }
  .panel-default > .panel-heading {
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;
  }
  .panel-default > .panel-heading + .panel-collapse > .panel-body {
    border-top-color: #ddd;
  }
  .panel-default > .panel-heading .badge {
    color: #f5f5f5;
    background-color: #333;
  }
  .panel-default > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #ddd;
  }
  .panel-primary {
    border-color: #337ab7;
  }
  .panel-primary > .panel-heading {
    color: #fff;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .panel-primary > .panel-heading + .panel-collapse > .panel-body {
    border-top-color: #337ab7;
  }
  .panel-primary > .panel-heading .badge {
    color: #337ab7;
    background-color: #fff;
  }
  .panel-primary > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #337ab7;
  }
  .panel-success {
    border-color: #d6e9c6;
  }
  .panel-success > .panel-heading {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
  }
  .panel-success > .panel-heading + .panel-collapse > .panel-body {
    border-top-color: #d6e9c6;
  }
  .panel-success > .panel-heading .badge {
    color: #dff0d8;
    background-color: #3c763d;
  }
  .panel-success > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #d6e9c6;
  }
  .panel-info {
    border-color: #bce8f1;
  }
  .panel-info > .panel-heading {
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
  }
  .panel-info > .panel-heading + .panel-collapse > .panel-body {
    border-top-color: #bce8f1;
  }
  .panel-info > .panel-heading .badge {
    color: #d9edf7;
    background-color: #31708f;
  }
  .panel-info > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #bce8f1;
  }
  .panel-warning {
    border-color: #faebcc;
  }
  .panel-warning > .panel-heading {
    color: #8a6d3b;
    background-color: #fcf8e3;
    border-color: #faebcc;
  }
  .panel-warning > .panel-heading + .panel-collapse > .panel-body {
    border-top-color: #faebcc;
  }
  .panel-warning > .panel-heading .badge {
    color: #fcf8e3;
    background-color: #8a6d3b;
  }
  .panel-warning > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #faebcc;
  }
  .panel-danger {
    border-color: #ebccd1;
  }
  .panel-danger > .panel-heading {
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
  }
  .panel-danger > .panel-heading + .panel-collapse > .panel-body {
    border-top-color: #ebccd1;
  }
  .panel-danger > .panel-heading .badge {
    color: #f2dede;
    background-color: #a94442;
  }
  .panel-danger > .panel-footer + .panel-collapse > .panel-body {
    border-bottom-color: #ebccd1;
  }
</style>
