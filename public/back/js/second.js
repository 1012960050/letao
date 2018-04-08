/**
 * Created by Administrator on 2018/4/7 0007.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        //console.log(info);
        $('tbody').html(template('secondTpl', info));
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        });
      }
    });
  }


  //点击添加分类按钮注册事件
  $('#addsecond').on('click', function () {
    $('#secondModal').modal('show');
    $('#form').data('bootstrapValidator').resetForm(true);
    $('#dropdownMenu1').html("请选择一级分类" + "<span class='caret'></span>");
    $('#secondPic').attr('src','images/none.png');
    //发送ajax请求 请求下拉列表数据进行渲染
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('#dropdown').html(template('dropdownTpl', info));
      }
    });
  });

  //事件委托 给下拉列表的a注册点击事件 将dataid传到隐藏的input中
  $('#dropdown').on('click', 'a', function () {
    var id = $(this).data('id');
    var txt = $(this).text();
    $('#dropdownMenu1').html(txt + "<span class='caret'></span>");
    $("[name='categoryId']").val(id);
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  });

  //图片上传fileupload插件
  $('#fileupload').fileupload({
    dataType:'json',
    done:function (e,data) {
      //console.log(e);
      $('#secondPic').attr('src', data.result.picAddr);
      $("[name='brandLogo']").val(data.result.picAddr);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });

  //表单校验
  $('#form').bootstrapValidator({
    excluded:[],
    //默认图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一级分类'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类名称'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请选择一张图片'
          }
        }
      }
    }
  });


  //注册表单完成校验触发事件
  $('#form').on('success.form.bv',function () {
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('#form').serialize(),
      success:function (info) {
        render();
        $('#secondModal').modal('hide');
        $('#form').data('bootstrapValidator').resetForm(true);
        $('#dropdownMenu1').html("请选择一级分类" + "<span class='caret'></span>");
        $('#secondPic').attr('src','images/none.png');
      }

    });
  });



});