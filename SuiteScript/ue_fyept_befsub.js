function myBeforeSubmit(type){
	
	var appl=nlapiGetFieldValue('approvalstatus');
	if(appl==2){
		nlapiSetFieldValue('account','296');
		var count = appl=nlapiGetFieldValue('account');
		//nlapiLogExecution('DEBUG','type:'+type+,'count:'+count);
	}
	
}



