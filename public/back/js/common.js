/**
 * Created by Administrator on 2018/4/6 0006.
 */
$(function () {
  //拦截登录功能
  if(location.href.indexOf("login.html") === -1){
      $.ajax({
      url:'/employee/checkRootLogin',
      success:function (info) {
        console.log(info.error);
        if(info.error==400){
          location.href = "login.html";
        }
      }
    });
  }
  //禁用小圆环
  NProgress.configure({ showSpinner: false });
  //进度条插件
  $(document).ajaxStart(function () {
    NProgress.start();
  });
  $(document).ajaxStop(function() {
    // 模拟网络延迟
    setTimeout(function() {
      NProgress.done();
    }, 500);
  });
  //二级分类切换
  $('.category').click(function () {
    $(this).next().stop().slideToggle();
  });
  //左侧导航隐藏与显示
  $('.icon-menu').on('click',function () {
    $('.aside-nav').toggleClass('hide-btn');
    $('.it-main').toggleClass('hide-btn');
    $('.it-topbar').toggleClass('hide-btn');
  });
  //点击退出弹出模态框
  $('.icon-logout').click(function() {
    // 让模态框显示
    $('#logoutModal').modal("show");
  });

  //点击退出注册点击事件
  $('#logoutBtn').click(function () {
    $.ajax({
      url:'/employee/employeeLogout',
      dataType: "json",
      success:function (info) {
        if(info.success){
          location.href = "login.html";
        }
      }
    });
  });
});