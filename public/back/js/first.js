/**
 * Created by Administrator on 2018/4/7 0007.
 */
$(function () {
  var currentPage=1;
  var pageSize=5;

  render();
// 渲染数据和创建分页
  function render() {
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        //console.log(info);
        $('tbody').html(template('firstTpl',info));

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


//给添加分类按钮添加点击事件
$('#addfirst').on('click',function () {
  //显示模态框
  $('#firstModal').modal('show');

});


  //表单校验
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名称"
          }
        }
      }
    }
  });
//表单验证成功发送ajax请求
  $('#form').on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data: $('#form').serialize(),
      success:function () {
        render();
        $('#firstModal').modal('hide');
        $('#form').data('bootstrapValidator').resetForm(true);
      }
    });
  });


});