function myBeforeLoad(type,form){
	//try{
	var udepartment = nlapiGetDepartment();
	var ulocation =	nlapiGetLocation();
	  //nlapiLogExecution("debug", "udepartment: " + udepartment, "ulocation: " + ulocation);
	 _log('createdfrom', createdfrom);
	 _log('ulocation', ulocation);
	 
	nlapiSetFieldValue('location',ulocation,false,true);
	nlapiSetFieldValue('department',udepartment,false,true);	
	
}
