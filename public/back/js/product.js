/**
 * Created by Administrator on 2018/4/9 0009.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
    $.ajax({
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        console.log(info);
        $('tbody').html(template('productTpl',info));
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function (a,b,c,page) {
            currentPage = page;
            render();
          },
          itemTexts:function (type,page,current) {
            switch (type){
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "page":
                return page;
              case "next":
                return "下一页";
              case "prev":
                return "上一页";
            }
          },
          tooltipTitles:function (type,page,current) {
            switch (type){
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "page":
                return page;
              case "next":
                return "下一页";
              case "prev":
                return "上一页";
            }
          },
          useBootstrapTooltip:true
        });
      }
    });
  }



  //点击添加商品弹出模态框
  $('#addproduct').click(function () {
    $('#productModal').modal('show');
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) {
        //console.log(info);
        $('#dropdown').html(template('dropdownTpl',info));
      }
    });
  });

  //给下拉列表里的a注册点击事件
  $('#dropdown').on('click','a',function () {
    var id = $(this).data('id');
    var txt = $(this).text();
    $("[name='brandId']").val(id);
    $('#dropdownMenu1').html(txt+'<span class="caret"></span>');
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID")
  });


  //表单验证
  $('#form').bootstrapValidator({
    excluded:[],
    //默认图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'请输入有效的商品库存'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺码'
          },
          regexp:{
            regexp:/^[3-4]\d-[3-4]\d$/,
            message:'请输入有效的商品尺码'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品原价'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品现价'
          }
        }
      },
      picproduct:{
        validators:{
          notEmpty:{
            message:'请上传3张图片'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      }
    }
  });

  var picArr = [];
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      var picObj = data.result;
      var picAddr = picObj.picAddr;
      picArr.unshift(picObj);
      $('#imgbox').prepend('<img src="'+picAddr+'" width="100" height="100">');
      if(picArr.length>3){
        picArr.pop();
        $('#imgbox img:last-of-type').remove();
      }
      if ( picArr.length === 3 ) {
        $('#form').data("bootstrapValidator").updateStatus("picproduct", "VALID");
      }
    }
  });


  $('#form').on('success.form.bv',function () {
    var params = $('#form').serialize();
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    $.ajax({
      url: "/product/addProduct",
      type: "post",
      data: params,
      success: function( info ) {
        if (info.success) {
          $('#productModal').modal("hide");
          $('#form').data("bootstrapValidator").resetForm(true);
          currentPage = 1;
          render();
          $('#dropdownMenu1').html("请选择二级分类"+'<span class="caret"></span>');
          $('#imgbox img').remove();
          picArr = [];
        }
      }
    });
  });






});