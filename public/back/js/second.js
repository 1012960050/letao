/**
 * Created by Administrator on 2018/4/7 0007.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        console.log(info);
        $('tbody').html(template('secondTpl',info));
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


  //点击添加分类按钮注册事件
  $('#addsecond').on('click',function () {
    $('#secondModal').modal('show');

  });







});