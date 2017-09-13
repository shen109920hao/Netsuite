 //160926   yaffil.wu@tctchina.com.cn

function  PRINT_SO_SHIPPED(type,form)
{
    try
     {
               if(type=='view')
		{
                 form.addButton('custpage_Addprint','Print SO',"CS_PRINT_SO_SHIPPED();");
    	         form.setScript('customscriptcs_so_shipped');
 
			 
                  } 

     } 
    catch(e)
    {
		nlapiLogExecution('debug','Print_SO_SHIPPED','exception='+e);
    }

}