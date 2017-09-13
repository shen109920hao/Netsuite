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
}

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};



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
