/*
 *报价单金额、税额、毛额不允许客户修改，不允许修改价格水平，可选择税类代码。支持按照子公司、角色进行锁死。 
 * 
 * */
function pageinit(type) {
	if(type=='create'|| type=='edit'){
		nlapiDisableLineItemField('item','amount',true);
		nlapiDisableLineItemField('item','tax1amt',true);
		nlapiDisableLineItemField('item','grossamt',true);
		nlapiDisableLineItemField('item','price',true);
	}
}

//可以不要用此事件
function  validateline(type){
	if(type=='item'){
		nlapiDisableLineItemField('item','amount',true);
		nlapiDisableLineItemField('item','tax1amt',true);
		nlapiDisableLineItemField('item','grossamt',true);
	}
	return true;
}


/*-------------------------------------------------------------------------*/



/*
 * 销售订单需要锁死汇率。
系统汇率弹窗，即使客户点【确定】按钮，系统不更改系统汇率。
 * 
 * 
 * */
function pageInit(type){
	
	if(type=='create'||type=='edit'){
		 nlapiDisableField('exchangerate', true);
	}
}



