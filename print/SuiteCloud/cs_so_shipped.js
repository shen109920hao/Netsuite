 //160926   yaffil.wu@tctchina.com.cn
 
function CS_PRINT_SO_SHIPPED()
{
	var PrintQCURL = nlapiResolveURL('SUITELET','customscriptsuitelet_so_shipped','customdeploysuitelet_so_shipped',false);
	
    PrintQCURL +='&custscript_recid='+ nlapiGetRecordId() +'&custscript_rectype=' + nlapiGetRecordType();

	newWindow = window.open(PrintQCURL, "_blank");
}

//   nlapiGetRecordId()