//add a button for form 

function copy_record(type,form) {
	
	if(type=='view'){
		try{
			//这里custpage_copyrecord命名规则custpage_'+显示名'
			form.addButton('custpage_copyrecord','copy record','cs_copyrecord_so();');
			form.setScript('customscriptcs_copyrecord_so');
			
			
		}catch(e){
			nlapiLogExecution('debug','copy_record','exception='+e);
		}
		
	
	}
		
}
