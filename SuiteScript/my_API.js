/**
 * 可部署到销售订单、估价单、贷向通知单上当选择行客户后带出此客户的身上的部门和地点值，填充到字段部门和地点中；
 * 
 * */
function pageInit(type) {
    console.log(type);
    var entity = nlapiGetFieldValue('entity');
    if (entity) {
        var ent = nlapiLookupField('customer',entity, [
            'custentity_default_fulfillment_location',
            'custentity_sales_district'
        ]);
        if (ent.custentity_default_fulfillment_location) {
            nlapiSetFieldValue('location', ent.custentity_default_fulfillment_location);
        }
        if (ent.custentity_sales_district) {
            nlapiSetFieldValue('department', ent.custentity_sales_district);
        }
    }

    if (type == 'create') {
        nlapiSetFieldValue('startdate', nlapiDateToString(new Date()));
    }
    
    
    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };

}



/**
 * 可部署到销售订单、估价单、贷向通知单上将部门和地点字段值，填充到明细行中部门和地点字段中；
 * 
 * */
function fieldChanged(type, name, linenum) {
    console.log(arguments);
    
    var entity = nlapiGetFieldValue('entity');
    if (entity) {
        var ent = nlapiLookupField('customer',entity, [
            'custentity_default_fulfillment_location',
            'custentity_sales_district'
        ]);
        if (ent.custentity_default_fulfillment_location) {
            nlapiSetFieldValue('location', ent.custentity_default_fulfillment_location);
        }
        if (ent.custentity_sales_district) {
            nlapiSetFieldValue('department', ent.custentity_sales_district);
        }
    }
    
    if (type == 'item' && name == 'item') {
        var location = nlapiGetFieldValue('location');
        if (location) {
            nlapiSetCurrentLineItemValue('item', 'location', location, true, true);
        }
        
        var department = nlapiGetFieldValue('department');
        if (location) {
            nlapiSetCurrentLineItemValue('item', 'department', department, true, true);
        }
    } 
}

/**
 * 
 * 为明细行设置默认值
 * 
 * 
 * */
function postSourcing(type, name)
{
 // Execute this code when all the fields from item are sourced on the sales order.
 
  if(type === 'item' && name === 'item')
  {
    // After all the fields from item are sourced
    var plid = nlapiGetCurrentLineItemValue('item', 'price');
    var line = nlapiGetCurrentLineItemIndex(type);
 
    if(plid != "-1")
    {
    	nlapiSetCurrentLineItemValue(type,'price','-1');
    }
  }
}



/*--------------------------------------------------------------------------------------------*/

/**
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



/*------------------------------------------------------------------------------------------*/

/**
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



/*-------------------------------------------------------------------------------------------*/

/**
 * 取得单子上的关联订单的信息，并对其进行相应处理 
 */
function beforeLoad(type, form, request) {
    try {
        var id = nlapiGetRecordId(), recType = nlapiGetRecordType();
        nlapiLogExecution("debug", "beforeLoad____________ id: " + id, "recType: " + recType + " type: " + type);

        nlapiLogExecution("debug", "beforeLoad____________end");
    } catch (e) {
        processException(e);
    }
}


function beforeSubmit(type) {
    var id = nlapiGetRecordId(), recType = nlapiGetRecordType();
    nlapiLogExecution("debug", "beforeSubmit id: " + id, "recType: " + recType + " type: " + type);

    // Subsidiary
    // CN: 4,
    // HK: 2,
    // UK: 3
    try {
        if (type == 'create' || type == 'edit') {

            var createdfrom = nlapiGetFieldValue('createdfrom');
            var soRec = nlapiLoadRecord('salesorder', createdfrom);

            var linecount = soRec.getLineItemCount('item');
            var line = 1;
            
            
            
            //创建一个数组对象
            var iteminfo = [];   
            for (; line <= linecount; line++) {
            	//用push()方法来动态的改变数组的长度。并向其中添加数据
                iteminfo.push({
                    item: soRec.getLineItemValue('item', 'item', line),
                    rate: soRec.getLineItemValue('item', 'rate', line),
                    amount: soRec.getLineItemValue('item', 'amount', line),
                    taxrate1: soRec.getLineItemValue('item', 'taxrate1', line),
                    grossamt: soRec.getLineItemValue('item', 'grossamt', line),
                    tax1amt: soRec.getLineItemValue('item', 'tax1amt', line)
                });
            }

            _log('iteminfo', iteminfo);
            var count = nlapiGetLineItemCount('item');
            for(var ln = 1; ln <= count; ln++){
                var ffitem = nlapiGetLineItemValue('item', 'item', ln);
                _log('ffitem', ffitem);
                var zhao = iteminfo.find(function(item){
                    return item.item == ffitem;
                });
                _log('zhao', zhao);
                if(zhao){
                    nlapiSetLineItemValue('item', 'custcol_rate', ln, zhao.rate);
                    nlapiSetLineItemValue('item', 'custcol_amount', ln, zhao.amount);
                    nlapiSetLineItemValue('item', 'custcol_taxrate', ln, zhao.taxrate1);
                    nlapiSetLineItemValue('item', 'custcol_taxamount', ln, zhao.grossamt);
                    nlapiSetLineItemValue('item', 'custcol_tax', ln, zhao.tax1amt);
                }
            }

        }


    } catch (e) {
        processException(e)
    }
}



//-------------------------------------------------------------------------------
/**
 * 
 * 获得销售订单上的关联单子上的相应信息，在提交此单子时将信息一块随着单子保存进去
 * 
 * 
 */

function beforeLoad(type, form, request) {
    try {
        var id = nlapiGetRecordId(), recType = nlapiGetRecordType();
        nlapiLogExecution("debug", "beforeLoad____________ id: " + id, "recType: " + recType + " type: " + type);

        nlapiLogExecution("debug", "beforeLoad____________end");
    } catch (e) {
        processException(e);
    }
}


 

 function afterSubmit(type) {

    var id = nlapiGetRecordId(), recType = nlapiGetRecordType();
    nlapiLogExecution("debug", "afterSubmit id: " + id, "recType: " + recType + " type: " + type);

    // Subsidiary
    // CN: 4,
    // HK: 2,
    // UK: 3
    try {

        if (type == 'create' || type == 'edit') {
            var subs = nlapiGetFieldValue('subsidiary');
            _log('subs', subs);
            if (subs == 2 || subs == 3) {
                //  var intercotransaction = nlapiGetFieldValue('intercotransaction');
                var intercotransaction = nlapiLookupField('salesorder', id, 'intercotransaction');
                _log('intercotransaction', intercotransaction);
                if (intercotransaction) {
                    var info = nlapiLookupField('purchaseorder', intercotransaction, [
                        'custbody_magentoordno',
                        'custbody_number',
                        'custbody_customeremail',
                        'custbody_customerphonenumber',
                        'custbody_deliveryaddress',
                        'custbody_customer'
                    ]);

                    var soRec = nlapiLoadRecord('salesorder', nlapiGetRecordId());
                    for (var name in info) {
                        soRec.setFieldValue(name, info[name]);
                    }
                    nlapiSubmitRecord(soRec, true);
                }
            }
        }
    } catch (e) {
        processException(e)
    }

}
