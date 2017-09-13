/**
 * Client Event Function
 * @appliedtorecord employee
 * @paramet {String}
 * 			type :access mode£ºcreate¡¢edit¡¢copy
 * @return void
 * 
 */
function pageInit(type) {
	/*
	 * Mode 01 -crete a clint-side script
	 * */
	alert('Hello Jack£¡');
	
	
	/*
	 * Mode 01 - scripting Entity Filed 
	 * 
	 * */
	nlapiSetFieldValue('custentity_employee_score', 'A');
	
	var text=nlapiGetFieldText('subsidiary');
	var value=nlapiGetFieldValue('subsidiary');
	
	alert("supervisor-text:"+text+"===supervisor-value:"+value);
	
	nlapiDisableField('fax',true);
	
}
/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum){
	
 
}
/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord employee
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord(){
	nlap
    return true;
}
