/**
 * @author guogf
 */
Ext.namespace('IsmpHB', 'IsmpHB.ecrmInfo');

IsmpHB.ecrmInfo.DataPanel= Ext.extend(Ext.Panel, {
	title : '政企单信息管理',
	autoScroll : true,
	layout : "fit",
	cls : 'box-dataGrid',
	
	telField : new Ext.form.TextField({
				fieldLabel : '产品接入号',
				emptyText : '请填写产品接入号',
				maxLength : 100,
				msgTarget : 'side',
				width : 200,
				allowBlank : false
			}),
	searchBtn : new Ext.Button({
				text : '查询',
				cls : 'btn-search btn-common'
			}),
	orderBtn : new Ext.Button( {
		text : '订购',
		cls : 'btn-search btn-common'
	}),
	resetBtn : new Ext.Button({
				text : '重置搜索条件',
				iconCls : 'btn-remove',
				cls : 'btn-common-l'
			}),
	constructor : function(config) {
		config = config || {};
		config.tbar = config.tbar || [];
//		config.bbar = config.bbar || [];
		config.items = config.items || [];
		this.orderWin = new IsmpHB.ecrmInfo.OrderWin({});
		this.orderInfoPanel = new IsmpHB.ecrmInfo.OrderInfoPanel({});
		this.workflowInfoPanel = new IsmpHB.ecrmInfo.WorkFlowInfoPanel({});
//		this.workflowInfoPanel = new IsmpHB.ecrmorderworkflow.DataGrid({});
		
//		this.centerPanel = new Ext.Panel({
//			layout : 'border',
//			items : [new Ext.Panel({
////				layout : 'border',
//				region : 'west',
//				width : 550,
//				items : [this.orderInfoPanel]
//			}),new Ext.Panel({
//				region : 'center',
//				items : [this.workflowInfoPanel]
//			})]
//		});
		this.centerPanel = new Ext.TabPanel({
			activeItem : 0,
			items : [this.orderInfoPanel,this.workflowInfoPanel],
			listers : function(){
				
			}
		});
		this.orderBtn.hide();
		config.tbar.push('产品接入号：');
		config.tbar.push(this.telField);
		config.tbar.push(this.searchBtn);
		config.tbar.push(this.resetBtn);
		config.tbar.push(this.orderBtn);
//		config.items.push(this.orderInfoPanel);
//		config.items.push(this.workflowInfoPanel);
//		config.bbar.push(this.centerPanel);
//		config.bbar.push(this.orderBtn);
		config.items.push(this.centerPanel);
		IsmpHB.ecrmInfo.DataPanel.superclass.constructor.apply(this,arguments);
		this.telField.on('specialkey', function(field, e) {
					if (e.getKey() == e.ENTER) {
						this.searchBtn.fireEvent('click');
					}
		}, this);
		this.searchBtn.on('click',function(){
			this.search();
		},this);
		this.resetBtn.on('click',function(){
			this.telField.reset();
		},this);
		this.orderBtn.on('click',function(){
			if(this.telField.isValid()){
				var tel = this.telField.getValue();
				this.orderWin.addForm.busiNumField.setValue(tel);
				this.orderWin.addForm.busiNumField.disable();
				this.orderWin.show();			
			}
		},this);
	},
	search : function(){
		if(this.telField.isValid()){
			this.orderBtn.show();
			var tel = this.telField.getValue();
			this.orderInfoPanel.search(tel);
			this.workflowInfoPanel.search(tel);
//		this.workflowInfoPanel.searchItems();
		}else{
			alert('请填写接入号！');
		}
	}

});
/**
 * 工单信息
 */
IsmpHB.ecrmInfo.WorkFlowInfoPanel = Ext.extend(Ext.grid.GridPanel, {
	title : '工单信息',
	autoScroll : true,
	id : 'workflowInfo',
	store : Ext.StoreMgr.get('zqorder'),
	cls : 'box-dataGrid',
	viewConfig : {
		templates : {
			cell : new Ext.Template(
					'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id}   x-selectable {css}" style="{style}"   tabIndex="0" {cellAttr}>',
					'<div class="x-grid3-cell-inner x-grid3-col-{id}"  {attr}>{value}</div>',
					'</td>')
		}
	},
	constructor : function(config){
		config = config || {};
//		this.dlg = new IsmpHB.ecrmorderworkflow.WorkflowTreeDlg({});
//		this.productdlg = new IsmpHB.ecrmorderworkflow.productItemDlg({});
		this.pagingbar = new Ext.PagingToolbar( {
			pageSize : 20,
			store : this.getStore(),
			displayInfo : true,
			displayMsg : '当前第{0}项到第{1}项，共{2}项',
			emptyMsg : "没有查询到任何结果！"
		});
		config.bbar = this.pagingbar;
		this.sm = new Ext.grid.CheckboxSelectionModel({
					singleSelect : true,
					renderer : this.cmRenderer.createDelegate(this),
					checkOnly : true
				});
		this.cm = new Ext.grid.ColumnModel([{
				header : 'CRM工单号',
				align : 'left',
				menuDisabled : true,
				dataIndex : 'crm_order_id',
				width : 200
			}, {
				header : 'CRM串',
				align : 'left',
				menuDisabled : true,
				hidden : true,
				dataIndex : 'crm_sourceString',
				width : 200
			}, {
				header : '业务类型',
				align : 'center',
				menuDisabled : true,
				dataIndex : 'serviceType',
				renderer : IsmpHB.renderer.ECRM_SERVICE_TYPE,
				width : 80
			}, {
				xtype : 'actioncolumn',
				header : '详情',
				align : 'center',
				width : 50,							
				items : [{
							icon : 'images/btn_search.png',
							tooltip : '详情',
							handler : this.showDetails.createDelegate(this)
						}]
			}, {
				header : '服务编号',
				align : 'left',
				menuDisabled : true,
				dataIndex : 'service_number',
				width : 200
			}, {
				header : '状态',
				align : 'center',
				menuDisabled : true,
				dataIndex : 'status',
				renderer : IsmpHB.renderer.ECRM_ORDER_STATUS,
				width : 100
			}/*, {
				xtype : 'actioncolumn',
				header : '流程图',
				align : 'center',
				width : 50,
				items : [{
					icon : 'images/dept.png',
					tooltip : '查看流程图',
					handler : this.showWorkFlow.createDelegate(this)
				}]
			}*/, {
				header : '产品接入号',
				align : 'center',
				menuDisabled : true,
				dataIndex : 'productAccessNumber',
				width : 120
			}, {
				header : '产品编号',
				align : 'center',
				menuDisabled : true,
				dataIndex : 'productId',
				width : 70
			}, {
				header : '产品名称',
				align : 'center',
				menuDisabled : true,
				dataIndex : 'productName',
				width : 120
			},{
	            header : '工单渠道',
	            align : 'center',
	            menuDisabled : true,
	            dataIndex : 'source',
	            renderer : IsmpHB.renderer.ECRM_ORDER_SOURCE_RENDERER,
	            width : 70
	      }, {
				header : '所属地市',
				align : 'center',
				menuDisabled : true,
				dataIndex : 'areaCode',
				renderer : IsmpHB.renderer.CITYCOBO,
				width : 70
			}, {
				header : '创建日期',
				align : 'center',
				menuDisabled : true,
				dataIndex : 'createTime',
				width : 100
			}, {
				header : '更新日期',
				align : 'center',
				menuDisabled : true,
				dataIndex : 'updateTime',
				width : 100
			}, {
				header : '处理结果',
				align : 'left',
				menuDisabled : true,
				dataIndex : 'returnCRM',
				width : 200
			}, {
	            header : '处理结果原串',
	            align : 'left',
	            menuDisabled : true,
	            hidden:true,
	            dataIndex : 'returnCRMString',
	            width : 200
	       }, {
				header : '回单反馈',
				align : 'left',
				menuDisabled : true,
				dataIndex : 'returnFromCRM',
				width : 200
			},{
				header : '客户ID',
				align : 'left',
				menuDisabled : true,
				dataIndex : 'custId',
				width : 80
		}]);
		IsmpHB.ecrmInfo.WorkFlowInfoPanel.superclass.constructor.apply(this,arguments);
	},
	cmRenderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
		
		if ('3' == record.data.status) {
			return '<img src="images/not-allowed.png" qtip="该工单异常，不能再操作" class="oper_not_allowed"/>';
		}else {
			return '<div class="x-grid3-row-checker"></div>';
		}
	},
	showWorkFlow : function(grid, rowIndex, colIndex) {
		var r = this.getStore().getAt(rowIndex);
		if (null != r) {
			this.dlg = new IsmpHB.ecrmorderworkflow.WorkflowTreeDlg({});
			this.dlg.setOrderId(r.data.id);
			this.dlg.show();
		}
	},
	showDetails : function(grid, rowIndex, colIndex) {
		var r = this.getStore().getAt(rowIndex);
		var arrayObj = new Array();
		arrayObj.push(r.data.crm_sourceString);
		arrayObj.push(r.data.status);
		arrayObj.push(r.data.createTime);
		arrayObj.push(r.data.returnCRM);
		arrayObj.push(r.data.crmReturnString);
		if (null != r) {
			this.infoDetailsdlg = new IsmpHB.ecrmorderworkflow.infoDetailsDlg({
						"orderId" : r.data.id
					});
//			this.infoDetailsdlg.workFlowPanel.hide();
			this.infoDetailsdlg.showInfo(arrayObj, r.data.id);
//			Ext.getCmp('mytab').remove(Ext.getCmp('mytab').getActiveTab());
			this.infoDetailsdlg.show();
		}
	},
	search : function(value){
		this.getStore().baseParams = {
			method : 'search',
			productId : null,
			service_type : null,
			status : null,
			create_time : null,
			update_time : null,
			prodAccessNum : value,
			crmOrderId : null,
			serviceNum : null,
			areaCode : null,
			returnCRM : null,
			source : null,
			custId : null,
			custName : null
		};
		this.getStore().load({
					params : {
						timestamp : new Date().valueOf(),
						start : 0,
						limit : this.pagingbar.pageSize
					},
					callback : function(r, o, s) {
						if (this.store.getTotalCount() > 0) {
							/*if (this.returnCRMType.getValue() == 1) {
								this.store.filterBy(function(record, id) {
											if (record.get('returnCRM') != "未收到处理") {
												return true;
											}
										});
							} else if (this.returnCRMType.getValue() == 2) {
								this.store.filterBy(function(record, id) {
											if (record.get('returnCRM') == "未收到处理") {
												return true;
											}
										});
							} else {*/
								this.store.clearFilter('returnCRM', true);
								return true;
							//}
						}
					},
					scope : this
				});
	}
});

/**
 * 订购信息
 */
IsmpHB.ecrmInfo.OrderInfoPanel = Ext.extend(Ext.grid.GridPanel, {
	title : '订购信息',
	id : 'orderInfo',
	autoScroll : true,
	store : Ext.StoreMgr.get('ecrm_order_user'),
	cls : 'box-dataGrid',
	constructor : function(config){
		config = config || {};
		config.bbar = config.bbar || [];
		this.productdlg = new IsmpHB.ecrmOrderUser.productItemDlg( {});
		this.pagingbar = new Ext.PagingToolbar( {
			pageSize : 20,
			store : this.getStore(),
			displayInfo : true,
			displayMsg : '当前第{0}项到第{1}项，共{2}项',
			emptyMsg : "没有查询到任何结果！"
		});
		config.bbar.push(this.pagingbar);
		this.sm = new Ext.grid.CheckboxSelectionModel( {
			singleSelect : true,
			renderer : this.cmRenderer.createDelegate(this),
			checkOnly : true
		});
		this.cm = new Ext.grid.ColumnModel( [ /*this.sm, */{
			header : '操作',
			align : 'center',
			menuDisabled : true,
			width : 40,
			xtype : 'actioncolumn',
			items : [{
				getClass: function(v, meta, record) {
					var str='禁止操作';
					var cls = 'notAllowed oper_not_allowed';
					if ('900' == record.data.prodId || '901'==record.data.prodId) {
						if('B0A'==record.data.state){
							cls= 'remove';
							str = '退订';
						}else{
							cls = 'notAllowed oper_not_allowed';
						}
					} else {
						cls = 'notAllowed oper_not_allowed';
					}
					this.items[0].tooltip=str;
					return cls;
				},
				handler: function(grid, rowIndex, colIndex) {
					 var rec = grid.store.getAt(rowIndex);
					 if (('900' == rec.data.prodId || '901'==rec.data.prodId)
					 		&&'B0A'==rec.data.state){
					 	grid.cancelOrder(rec); 
					 	
					 }
				}
			}]
		},{
			header : '地市',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'cityId',
			renderer : IsmpHB.renderer.ECRMPRODUCTCITYCOBO,
			width : 70
		}, {
			header : '产品类型',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'prodType',
			width : 230,
			renderer : IsmpHB.renderer.ECRMINFO_PRODTYPE
		}, {
			header : '服务编码',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'servNbr',
			width : 160
		}, {
			header : '产品接入号',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'accNbr',
			width : 150
		},{
			xtype : 'actioncolumn',
			header : '详情',
			align : 'center',
			width : 50,
			items : [{
				icon : 'images/btn_search.png',
				tooltip : '详情',
				handler : this.showDetails.createDelegate(this)
			}]
		}, {
			header : '开通时间',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'beginDate',
			width : 100
		}, {
			header : '失效时间',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'befBmDate',
			width : 100
		}, {
			header : '服务状态',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'state',
			renderer : IsmpHB.renderer.ECRMORDERUSERSTATE,
			width : 100
		}, {
			header : '创建时间',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'createDate',
			width : 100
		}, {
			header : '更新时间',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'updateDate',
			width : 100
		},{
			header : '客户ID',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'custId',
			width : 100
		}, {
			header : '付费号码',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'payAcc',
			width : 100
		},{
			header : '关联产品接入号',
			align : 'center',
			menuDisabled : true,
			dataIndex : 'relaAccNbr',
			width : 120
		}, {
			header : '服务Id',
			align : 'left',
			menuDisabled : true,
			hidden : true,
			dataIndex : 'prodId',
			width : 200
		} ]);
		IsmpHB.ecrmInfo.OrderInfoPanel.superclass.constructor.apply(this,arguments);
	},
	cmRenderer : function(value, cellmeta, record, rowIndex,columnIndex, store) {
		if ('900' == record.data.prodId || '901'==record.data.prodId) {
			if('B0A'==record.data.state){
				return '<div class="x-grid3-row-checker"></div>';
			}else{
				return '<img src="images/not-allowed.png" qtip="订购关系已拆除！" class="oper_not_allowed"/>';
			}
		} else {
			return '<img src="images/not-allowed.png" qtip="该产品不在此处退订！" class="oper_not_allowed"/>';
		}
	},	
	cancelOrder : function(rs){
		Ext.MessageBox.confirm("系统提示", "您确定要退订该产品吗？", function(but) {
			if('yes'==but){
				var value = rs.data.accNbr;
				var req ={
					url : IsmpHB.req.ECRM_ORDER_MGR,
					params : {
						busiNum : rs.data.accNbr,
						cityNode : rs.data.cityId,
						productType : rs.data.prodId,
						serverNum : rs.data.servNbr,
						method : 'delete'
					},
					scope : this,
					callback : function(o) {
						Ext.Msg.show({
								title : '操作提示',
								msg : o.message,
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.INFO
							});
							Ext.getCmp('orderInfo').search(value);
							Ext.getCmp('workflowInfo').search();
					}		
				}
				IsmpHB.Ajax.send(req);
			}
		});
		
	},
	showDetails : function(grid, rowIndex, colIndex) {
		var r = this.getStore().getAt(rowIndex);
		var arrayObj = new Array();
		arrayObj.push(r.data.cityId);
		arrayObj.push(r.data.servNbr);
		arrayObj.push(r.data.accNbr);
		arrayObj.push(r.data.payAcc);
		arrayObj.push(r.data.state);
		arrayObj.push(r.data.prodType);
		arrayObj.push(r.data.prodId);
		this.productdlg.showProduct(arrayObj);
		this.productdlg.show();
	},
	search : function(value){
		this.getStore().baseParams = {
			method : 'search',
			cityId : null,
			servNbr : null,
			accNbr : value,
			state : null,
			prodType : null,
			createTime : null,
			updateTime : null,
			isvpn    : null,
			custId   : null,
			custName  : null
		};
		this.getStore().load( {
			params : {
				timestamp : new Date().valueOf(),
				start : 0,
				limit : this.pagingbar.pageSize
			},
			callback : function(r, o, s) {
			},
			scope : this
		});
		this.getStore().sort('state','ASC');
	}
});

IsmpHB.ecrmInfo.OrderForm = Ext.extend(Ext.form.FormPanel, {
	labelWidth : 100,
	labelAlign : 'right',
	border : false,
	autoScroll : true,
	bodyStyle : 'padding:5px 10px 5px 10px;',
	layout : 'form',
	
	busiNumField : new Ext.form.TextField( {
		fieldLabel : '业务号码',
		name : 'busiNum',
		validator : IsmpHB.customFunctions.validateBankTrim,
		invalidText : '不能全为空格',
		disabled : false,
		width : 200
	}),
	cityCodeField : new Ext.form.ComboBox({
		fieldLabel : '地    市',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : false,
		displayField : 'name',
		valueField : 'areaCode',
		listWidth : 200,
		width : 200,
		store : IsmpHB.store.CITY_GUANGDONG,
		value : '020'
	}),
	
	prodTypeField : new Ext.form.ComboBox({
		fieldLabel : '产    品',
		editable : false,
		mode : 'local',
		triggerAction : 'all',
		allowBlank : false,
		displayField : 'name',
		valueField : 'code',
		listWidth : 300,
		width : 200,
		store : IsmpHB.store.ECRM_PRODUCT,
		value : 'MZYYS001',
		listeners : {
			'select' : function(combo,record,index){
				Ext.getCmp('proCode').setValue(record.get('code'));
				Ext.getCmp('proType').setValue(record.get('value'));
				Ext.getCmp('orderUnit').setValue(record.get('term'));
				if(record.get('term')==0){
					Ext.getDom("labelUnit").innerHTML='月';
				}else{
					Ext.getDom("labelUnit").innerHTML='年';
				}
			}
		}
	}),
	
	termField : new Ext.form.NumberField ( {
		fieldLabel : '订购周期',
		name : 'orderTerm',
		validator : IsmpHB.customFunctions.validateBankTrim,
		invalidText : '不能全为空格',
		disabled : false,
		width : 200,
		listeners: {
			render: function(obj) {
			   var font=document.createElement("font");
				font.setAttribute("color","red");
				font.setAttribute("id","labelUnit");
				var redStar=document.createTextNode("月");
				font.appendChild(redStar);   
				obj.el.dom.parentNode.appendChild(font);
	     	}
	     }
	}),
	
	startTimeField : new Ext.form.DateField({
//		id : 'endField_f',
		fieldLabel : '开始时间',
		editable : false,
		format : 'Y-m-d H:i:s',
		width : 200,
		allowBlank : true
	}),
	endTimeField : new Ext.form.DateField({
//		id : 'endField_f',
		fieldLabel : '结束时间',
		editable : false,
		format : 'Y-m-d H:i:s',
		width : 200,
		allowBlank : true
	}),
	proCodeField : new Ext.form.Hidden({
		id : 'proCode',
		name : 'proCode',
		value : 'MZYYS001'
	}),
	proTypeField : new Ext.form.Hidden({
		id : 'proType',
		name : 'proType',
		value : '900'
	}),
	orderUnitField : new Ext.form.Hidden({
		id : 'orderUnit',
		name : 'orderUnit',
		value : '0'
	}),
	commitBtn : new Ext.Button({
		text : '提交',
		iconCls : 'btn-commit'
	}),
	
	cancelBtn : new Ext.Button({
		text : '取消',
		minWidth : 70
	}),
	
	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		config.buttons = this.buttons ||[];
		
		config.items.push(this.busiNumField);
		config.items.push(this.cityCodeField);
		config.items.push(this.prodTypeField);
		config.items.push(this.termField);
		config.buttons.push(this.commitBtn);
		config.buttons.push(this.cancelBtn);
		IsmpHB.ecrmInfo.OrderForm.superclass.constructor.apply(this,arguments);
		
		this.cancelBtn.on('click', function() {
			this.ownerCt.hide();
		}, this);
		
		this.commitBtn.on('click',function(){
			this.toAdd();
		},this);
	},
	resetForm : function(){
		this.busiNumField.reset();
		this.cityCodeField.reset();
		this.proCodeField.setValue('MZYYS001');
		this.proTypeField.setValue('900');
		this.prodTypeField.reset();
		this.termField.reset();
		this.orderUnitField.reset();
		Ext.getDom("labelUnit").innerHTML='月';
	},
	toAdd : function(){
		var req ={
			url : IsmpHB.req.ECRM_ORDER_MGR,
			params : {
				busiNum : this.busiNumField.getValue(),
				cityNode : this.cityCodeField.getValue(),
				productCode : this.proCodeField.getValue(),
				productType : this.proTypeField.getValue(),
				term : this.termField.getValue()||1,
				unit : this.orderUnitField.getValue()||0
			},
			scope : this,
			callback : function(o) {
				var value = this.busiNumField.getValue();
				this.resetForm();
				Ext.Msg.show({
						title : '操作提示',
						msg : o.message,
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.INFO
					});
					this.ownerCt.hide();
					Ext.getCmp('orderInfo').search(value);
					Ext.getCmp('workflowInfo').search(value);
//					Ext.StoreMgr.get('ecrm_order_user').reload();
//					Ext.StoreMgr.get('zqorder').reload();
			}		
		}
		IsmpHB.Ajax.send(req);
	}
});

/**
 * 政企产品新增订购
 */
IsmpHB.ecrmInfo.OrderWin = Ext.extend(Ext.Window,{
	title : '政企产品订购',
	layout : 'fit',
	modal : true,
	width : 500,
	height : 310,
	constrainHeader : true,
	closeAction : 'hide',
	addForm : null,
	constructor : function(config) {
		config = config || {};
		config.items = config.items || [];
		this.addForm = new IsmpHB.ecrmInfo.OrderForm({});
		config.items.push(this.addForm);
		IsmpHB.ecrmInfo.OrderWin.superclass.constructor.apply(this,arguments);
	}
});