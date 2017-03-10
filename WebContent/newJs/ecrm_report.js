// zengjw 2012-07-23 单用户查询订购信息与工单查询
// 命名空间
Ext.namespace('IsmpHB', 'IsmpHB.ecrmReport');
// 主界面（中）
IsmpHB.ecrmReport.DataPanel = Ext.extend(Ext.Panel, {
	title : '运营分析报表',
	autoScroll : true,
	layout : "fit",
	cls : 'box-dataGrid',
	formBox : null,
	monthField : new Ext.form.DateField({
				format : 'Y-m',
				allowBlank : true,
				emptyText : '统计月份',
				msgTarget : 'side',
				width : 200
			}),

	searchBtn : new Ext.Button({
				text : '查询',
				cls : 'btn-search btn-common'
			}),
	resetInfoArea : new Ext.Button({
				text : '清除',
				cls : 'btn-common'
			}),

	constructor : function(config) {
		config = config || {};
		config.tbar = config.tbar || [];
		config.tbar.push('统计月份: ');
		config.tbar.push(this.monthField);
		var a = IsmpHB.common.getPermission('4-5');
		if (IsmpHB.common.isHasPermission(a, 1))
			config.tbar.push(this.searchBtn);
		config.tbar.push(this.resetInfoArea);
		
		config.items = config.items || [];
		this.formBox = new Ext.Panel({
					waitMsgTarget : true,
					layout : 'border',
					items : [
					       
					         new Ext.Panel({// border布局								
								layout : 'border',
								region : 'west',
								width : 600,
								items : [  new IsmpHB.ecrmReport.ProductPanel({
					        	 	region : 'center'					        	 	
						         })]
							}), new IsmpHB.ecrmReport.OrderPanel({// 工单信息框
								region : 'center'
			
							})]
				});
		config.items.push(this.formBox);

		IsmpHB.ecrmReport.DataPanel.superclass.constructor.apply(this,
				arguments);

		this.monthField.on('specialkey', function(field, e) {
					if (e.getKey() == e.ENTER) {
						this.searchBtn.fireEvent('click');
					}
				}, this);
		this.searchBtn.on('click', function() {
					this.searchItems();
				}, this);
		this.resetInfoArea.on('click', function() {
					this.resetFormBox();
				}, this);
	
	},
	// 搜索方法
	searchItems : function() {		
		if (this.monthField.getValue().length < 1) {
			Ext.Msg.alert('提示', '请输入要统计的月份');
			return;
		}
		
		// 清楚原先的数据
		Ext.StoreMgr.get('ecrm_report_proptype').removeAll();
		Ext.StoreMgr.get('ecrm_report_city').removeAll();
		// 查询订购信息
		Ext.StoreMgr.get('ecrm_report_proptype').baseParams = {			
			monthDate :this.monthField.getValue()		
		};
		Ext.StoreMgr.get('ecrm_report_city').baseParams = {			
			monthDate :this.monthField.getValue()		
		};
		Ext.StoreMgr.get('ecrm_report_proptype').load({
					params : {},
					callback : function(a, b, c) {
						// 订购关系的刷新按钮
						//ProductPagingbar.setVisible(true);
					},
					scope : this
				});
		Ext.StoreMgr.get('ecrm_report_city').load({
			params : {},
			callback : function(a, b, c) {
				// 订购关系的刷新按钮
				//ProductPagingbar.setVisible(true);
			},
			scope : this
		});
	},
	
	// 清空按钮事件
	resetFormBox : function() {
		this.monthField.reset();	
		Ext.StoreMgr.get('ecrm_report_proptype').removeAll();
		Ext.StoreMgr.get('ecrm_report_city').removeAll();
		
	}
	
});

// 工单信息框（右）
IsmpHB.ecrmReport.OrderPanel = Ext.extend(Ext.grid.GridPanel, {
			title : '业务维度统计',
			autoScroll : true,
			store : Ext.StoreMgr.get('ecrm_report_proptype'),
			constructor : function(config) {
				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 20,
							store : this.getStore(),
							displayInfo : true,
							displayMsg : '当前第{0}项到第{1}项，共{2}项',
							emptyMsg : "没有查询到任何结果！"
						});
				config = config || {};

				config.bbar = this.pagingbar;
				this.pagingbar.setVisible(false);
				OrderPagingbar = this.pagingbar;
				this.cm = new Ext.grid.ColumnModel([{
							header : '业务类型',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'serviceType',							
							width : 120
						}, {
							header : '月存量订购关系数量',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'amount',						
							width : 140
						}]);
				IsmpHB.ecrmReport.OrderPanel.superclass.constructor.apply(
						this, arguments);

			}
		});

// 订购信息框（左下）
IsmpHB.ecrmReport.ProductPanel = Ext.extend(Ext.grid.GridPanel, {			
			title : "地市维度统计",
			autoScroll : true,
			store : Ext.StoreMgr.get('ecrm_report_city'),
			constructor : function(config) {

				this.pagingbar = new Ext.PagingToolbar({
							pageSize : 20,
							store : this.getStore(),
							displayInfo : true,
							displayMsg : '当前第{0}项到第{1}项，共{2}项',
							emptyMsg : "没有查询到任何结果！"
						});
				config = config || {};
				config.bbar = this.pagingbar;
				this.pagingbar.setVisible(false);
				ProductPagingbar = this.pagingbar;
				this.cm = new Ext.grid.ColumnModel([{
							header : '地市',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'cityName',
							width : 80
						}, {
							header : '月份新增数',
							align : 'left',
							menuDisabled : true,
							dataIndex : 'monthAdd',
							width : 120
						}, {
							header : '月份拆机数',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'monthDel',
							width : 120
						}, {
							header : '月份存量订购关系数',
							align : 'center',
							menuDisabled : true,
							dataIndex : 'amount',
							width :140
						}]);
				IsmpHB.ecrmReport.ProductPanel.superclass.constructor.apply(
						this, arguments);
			}
		});

