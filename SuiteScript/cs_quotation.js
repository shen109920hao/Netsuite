/*
 * 可部署到销售订单、估价单、贷向通知单上当选择行客户后带出此客户的身上的部门和地点值，填充到字段部门和地点中；
 * 
 * */

function pageInit(type) {
    console.log(type);
 // alert('5'+type);
    var entity = nlapiGetFieldValue('entity');

  //nlapiGetFieldValue('entity')
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
}
Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

/*
 * 可部署到销售订单、估价单、贷向通知单上将部门和地点字段值，填充到明细行中部门和地点字段中；
 * 
 * */
function fieldChanged(type, name, linenum) {
 //alert("fieldChanged");
    console.log(arguments);
    //alert('5');
    //if (name == 'entity') {
    //    var location = nlapiLookupField('customer', nlapiGetFieldValue('entity'), 'custentity_default_fulfillment_location');
    //    if (location) {
    //        nlapiSetFieldValue('location', location);
    //    }
    //}

   if (type == 'item' && name == 'item') {
      

        var location = nlapiGetFieldValue('location');
        if (location) {
            nlapiSetCurrentLineItemValue('item', 'location', location, true, true);
        }
    } else if (name == 'startdate') {

        var startdate = nlapiGetFieldValue('startdate');
        if (startdate) {
            startdate = nlapiStringToDate(startdate);
            var enddate = startdate.addDays(5);
            nlapiSetFieldValue('enddate', nlapiDateToString(enddate));
            nlapiDisableField('enddate', true);
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
