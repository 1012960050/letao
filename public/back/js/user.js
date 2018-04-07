/**
 * Created by Administrator on 2018/4/7 0007.
 */
$(function () {
//定义当前页码
  var currentPage = 1;
  //定义每行显示几条数据
  var pageSize = 5;

  render();
// 渲染页面数据
  function render() {
    $.ajax({
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        $('tbody').html(template('userTpl',info));

        //创建分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function (a,b,c,page) {
            currentPage = page;
            render();
          }
        });
      }
    });
  }



//给按钮注册点击事件 显示模态框
  $('tbody').on('click','button',function () {
    //获取id和isdelete的值传给后台
    var id = $(this).parent().data('id');
    var isDelete =$(this).hasClass('btn-success')?'1':'0';
    //显示模态框
    $('#userModal').modal('show');
    //给模态框确定按钮注册点击事件 发送ajax请求
    $('#userBtn').off('click').on('click',function () {
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function () {
          render();
          $('#userModal').modal('hide');
        }
      });
    });
  });






});