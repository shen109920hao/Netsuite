function cs_copyrecord_so() {
	var recordid = nlapiGetRecordId();
	var copyRecord = nlapiCopyRecord('salesorder', recordid);
	var submitCopyRecord = nlapiSubmitRecord(copyRecord);
	
	var id=copyRecord.getId();
	//从定向到复制后的record
	nlapiSetRedirectURL('RECORD', identifier, id, editmode, parameters)
	return submitCopyRecord;
}