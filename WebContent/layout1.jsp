<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <%String path = request.getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	  <link rel= "stylesheet" type ="text/css" href="ext-3.2.0/resources/css/ext-all.css" />
      <script type= "text/javascript" src="extjs/bootstrap.js" ></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
	div{
		float: left;
	}
</style>
<title>标准样板</title>
</head>
<body>
	<script type="text/javascript">
		
		Ext.create(
			'Ext.Window',{title:'你好',width:400,height:300,
				//不加会有阴影
				shadow:false,
				html:"<font color=\"red\">Hello伟大的创造者！</font>",
				defaults:{
					msgTarget:'side',
					lableWidth:75,
					anchor:"100%",
					lableAlign:'center'
				}
				//是否渲染表单 frame:true
				//plain:true	
			}		
		).show(); 
		Ext.onReady(function(){
			//accordion 布局
			var accordion = Ext.create('Ext.panel.Panel',{
				layout:'accordion',
				title:"accordion布局",
				region:'west',
				renderTo:document.getElementById("1"),//Ext.getBody(),
				//split:true,
				width:500,height:300,
				
				items:[{title:"面板1",html:"<h2>说明1</h2>"},{title:"面板2",html:"<h3>说明2</h3>"},{title:"面板3",html:"<h4>说明3</h4>"}]
			});
			var card = Ext.create('Ext.panel.Panel',{
				layout:'card',
				title:"card布局",
				region:'west',
				margins:'400 20 20 20',
				renderTo:Ext.getBody(),
				//split:true,
				width:500,height:300,
				
				items:[{title:"面板1",html:"<h2>说明1</h2>",id:"p1"},{title:"面板2",html:"<h6>说明2</h6>",id:"p2"},{title:"面板3",html:"<h4>说明3</h4>",id:"p3"}]
			,buttons:[{text:"上一个",handler:changepage},{text:"下一个",handler:changepage}]
			});
			var column = Ext.create('Ext.panel.Panel',{
				layout:'column',
				title:"accordion布局",
				region:'west',
				renderTo:document.getElementById("2"),//Ext.getBody(),
				//split:true,
				width:500,height:300,
				
				items:[{title:"面板1",columnWidth:.4,width:150,html:"<h2>说明1</h2>"},{title:"面板2",columnWidth:.2,width:150,html:"<h3>说明2</h3>"},{title:"面板3",columnWidth:.4,width:150,html:"<h4>说明3</h4>"}]
			});
		
			//生成新的标签面板  另外一种 创建方式
			var panl = new Ext.TabPanel(
				{width:300,height:200,
					items:[{title:"面板1",columnWidth:.4,width:150,html:"<h2>说明1</h2>"},{title:"面板2",columnWidth:.2,width:150,html:"<h3>说明2</h3>"},{title:"面板3",columnWidth:.4,width:150,html:"<h4>说明3</h4>"}]
				}	
			);
			panl.render("hello");
			
			function changepage(btn){
				var index = Number(card.layout.activeItem.id.substring(1));
				if(btn.text=="上一个"){
					index-=1;
					if(index<1){
						index=3;
					}
				}else{
					index+=1;
					if(index>3){
						//指向1
						index=1;
					}
				}
				card.layout.setActiveItem("p"+index);
			}
		});
		
	</script>
	<div id="1"></div><div id="2"></div>
	<div id="hello"></div>
</body>
</html>






















