function beforeLoad(type, form, request) {
    try {
        var id = nlapiGetRecordId(), recType = nlapiGetRecordType();
        nlapiLogExecution("debug", "beforeLoad____________ id: " + id, "recType: " + recType + " type: " + type);
        _init(type);
        nlapiLogExecution("debug", "beforeLoad____________end");
    } catch (e) {
        processException(e);
    }
}

function beforeSubmit(type) {
    _log('type', type);
}

function _init(type) {
    if (type == 'create' || type == 'edit') {
        var createdfrom = nlapiGetFieldText('createdfrom');
		 //var createdfrom = nlapiGetFieldValue('createdfrom')
        _log('createdfrom', createdfrom);
		
		var start = createdfrom.indexOf('SO-');
        if (start != -1) { // salesorder
			var memo = nlapiLookupField('salesorder', nlapiGetFieldValue('createdfrom'), 'memo');
            _log('memo', memo);
			var sono = createdfrom.slice(start);
			_log('sono', sono);
			nlapiSetFieldValue('memo', memo + ' # ' + sono);   
		}
    }
}