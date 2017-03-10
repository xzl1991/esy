Ext.onReady(function(){
	Ext.QuickTips.init();
		//表格
	var pageSize = 20;
	var store = new Ext.data.Store({
		baseParams:{start:0, limit:pageSize},
		remoteSort: true,
		autoLoad: true,
		proxy:new Ext.data.HttpProxy({
			url: path + 'provider/query'			
		}),
		reader:new Ext.data.JsonReader({
            totalProperty: 'total',
			root: 'root'},
            [
                {name: 'id'},
                {name: 'providerCode'},
                {name: 'providerName'},
                {name: 'providerType'},
                {name: 'providerAddress'},
                {name: 'providerPhone1'},
                {name: 'providerPhone2'},
                {name: 'providerPhone3'},
                {name: 'createName'},
                {name: 'createTime', convert:parsede},
                {name: 'updateName'},
                {name: 'updateTime'}
            ]
		)
	});
	

	var grid = new Ext.grid.EditorGridPanel({
		shadow:true,
		anchor:'100% 85%',
		viewConfig:{
			forceFit:true
		},
		clicksToEdit:1,
		store:store,
		sm:new Ext.grid.CheckboxSelectionModel({
			singleSelect:false,
			checkOnly:false
		}),
		columns:[
			new Ext.grid.CheckboxSelectionModel(),
			new Ext.grid.RowNumberer(),
			{header:'id', dataIndex:'id',width:50},
			{header:'供应商代码', dataIndex:'providerCode', align:"center", width:50, editor:true},
			{header:'供应商名称', dataIndex:'providerName', align:"center", width:70, editor:true},
			{header:'供应商类型', dataIndex:'providerType', align:"center", width:50, editor:true},
			{header:'供应商地址', dataIndex:'providerAddress',  align:"center", width:90, editor:true},
			{header:'供应商联系方式1', dataIndex:'providerPhone1',  editor:true},
			{header:'供应商联系方式2', dataIndex:'providerPhone2',  editor:true},
			{header:'供应商联系方式3', dataIndex:'providerPhone3',  editor:true},
			{header:'创建人', dataIndex:'createName', align:"center", width:50},
			{header:'创建时间', dataIndex:'createTime', width:70},
			{header:'修改人', dataIndex:'updateName', align:"center", width:50},
			{header:'修改时间', dataIndex:'updateTime', width:70, renderer: parsede}
		],
//		autoHeight:true,
		stripeRows: true,
		frame: true,
//		renderTo:Ext.getBody(),
		//grid加入bbar
		bbar : new Ext.PagingToolbar({
		pageSize : pageSize,
		store:store,
		displayInfo : true,
		displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
		emptyMsg : '没有记录'
		}),
		tbar:[
			{
				text:'增加记录',	
				icon:'../images/add.png',
				handler:function() {
					var node = grid.getStore().recordType;
					var newnode = new node({
						id:'',
						providerCode:'',
						providerName:'',
						providerType:'',
						providerAddress:'',
						providerPhone1:'',
						providerPhone2:'',
						providerPhone3:'',
						createName:'',
						createTime:'',
						updateName:'',
						updateTime:''
					});
					grid.stopEditing();
					store.insert(0,newnode);
					grid.startEditing(0,0);
					grid.getView().refresh();
				}
			}, {
				text:'保存',
				icon:'../images/accept.png',
				handler:function() {
					var sm = grid.getSelectionModel();
					var selections = sm.getSelections();
					var selectedLength = selections.length;
					if(selectedLength == 0) {
						Ext.Msg.alert("提示", "请选择需要提交的数据！");
						return;
					}
					var dataArray = [];
					for(var i = 0; i < selectedLength; i++) {
						dataArray[i] = Ext.encode(selections[i].data);	
					}
//					var jsonData = Ext.util.JSON.encode(dataArray);
					Ext.Ajax.request({
						url:path + 'provider/addprovider'	 //页面保存数据后台处理
						,success: function(response, b) {
							console.log(response, b);
							console.log(store.lastOptions);
							store.reload();
							var text = response.responseText;
						}
						,failure:function(response) {
							Ext.Msg.alert("error!", response.responseText);
						},params:{param:dataArray}
					});	
					
				}
			}, {
				text:"删除记录",
				icon:'../images/bullet_cross.png',
				handler:function() {
					var sm = grid.getSelectionModel().getSelections();
					var smlength = sm.length;
					if(smlength == 0) {
						Ext.Msg.alert('提示', '删除记录不能为空');	
					}
					var dataArray = [];
					for(var i = 0; i < smlength; i++) {
						store.remove(sm[i]);
						dataArray[i] = Ext.encode(sm[i].data);
					}
					Ext.Ajax.request({
						url:path + 'provider/deleteprovider'	 //页面保存数据后台处理
						,failure:function(response) {
							Ext.Msg.alert("error!", response.responseText);
						},params:{param:dataArray}
					});
					
				}
			}
		]
	});	
	
		var form = new Ext.FormPanel({
		title:'查询区域--provide',
//		height:300,
//		width:300,
		anchor:'100% 15%',
		frame:true,
		labelSeparator:':',
		labelWidth:100,
		labelAlign:"right",
		/*buttons:[
			{text:'清除条件', handler:function() {
				form.getForm().reset();
			}}
		],*/
		defaults:{
			bodyStyle:'padding:10px'
		},items:[{
//			style:{
//				'padding':'10px'
//			},
			layout:'column',
			items:[
			{
				columnWidth:.2,
				layout:'form',
				items:[
				{xtype:"textfield",
					name:'providerCode',
					id:'providerCode',
					fieldLabel:'供应商代码'}
					]
			},
			{
				columnWidth:.2,
					layout:'form',
					items:[
					{
						xtype:"textfield",
					name:'providerName',
					id:'providerName',
					fieldLabel:'供应商名称'
					}]
			},
			{
				columnWidth:.2,
					layout:'form',
					items:[
					{
					xtype:"textfield",
					name:'providerAddress',
					id:'providerAddress',
					fieldLabel:'供应商地址'
					}]
			},
			{
				columnWidth:.2,
					layout:'form',
					items:[
					{
						style:{
							'margin-left':'15px'
						},
						xtype:"button",
						text:'搜索'
						,width:50,
						icon:'../images/page_white_magnify.png'
						,handler:function(){
							var providerAddress = Ext.getDom('providerAddress').value;
							var providerName = Ext.getDom("providerName").value;
							var providerCode = Ext.getDom("providerCode").value;
							store.reload({
								params:{
									providerAddress : providerAddress
									,providerName:providerName,
									providerCode:providerCode
								}
							});
						}
					}]
			}
			]}
		]
	});
	
	var panel = new Ext.Panel({
		layout:'anchor',
		items:[
			form,grid
		]
	});
	var vp = new Ext.Viewport({
		layout:'fit',
		items:
			panel
		
	});
});
