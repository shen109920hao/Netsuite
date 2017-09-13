 //160926   yaffil.wu@tctchina.com.cn

function  email_em_sendEmail(type,form)
{
    try
     {
               if(type=='view')
		{
                 form.addButton('em_jack_sendEmail','Send Emali',"CS_jack_em_SendEmali();");
    	         form.setScript('customscriptcs_em_sendEmail');
                  } 
     } 
    catch(e)
    {
		nlapiLogExecution('debug','email_em_send','exception='+e);
    }

}