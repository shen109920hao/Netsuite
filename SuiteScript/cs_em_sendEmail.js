function CS_jack_em_SendEmali(){
	
 var PrintQCURL = nlapiResolveURL('SUITELET','customscriptsuitelet_emploe_sendEmail','customdeploysuitelet_emploe_sendEmail',false);
	
	PrintQCURL +='&custscript_em_recid='+nlapiGetRecordId()+'&custscript_em_rectype=' + nlapiGetRecordType();

	newWindow = window.open(PrintQCURL, "_blank");
}