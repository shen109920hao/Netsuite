/**
 * Created by corcloud on 2017/4/7.
 */
function demoSimpleForm(request, response)
{
    if ( request.getMethod() == 'GET' )
    {
        var form = nlapiCreateForm('Jack test Form');
        /*按钮*/
        var script = "alert('Hello World')";
        var script1 = "alert('功能待完善')";
        var script2 = "alert('功能待完善')";
        form.addButton('custombutton', '重置', script);
       	form.addButton('custombutton', '标记全部',script1);
        form.addButton('custombutton', '取消全部标记',script2);
        
        /*客户字段*/
        var selectCust = form.addField('selectfield1','select', 'CUSTOMER');
        //新建一个search查询出客户信息
        var col = new Array();
     //   col[0] = new nlobjSearchColumn('glommedname');
        col[1] = new nlobjSearchColumn('entityid');
        var results = nlapiSearchRecord('customer', null, null, col);
           for ( var i = 0; results != null && i < result.length; i++ )
           {
              var res = results[i];
   //           var listValue = (res.getValue('glommedname'));
              var listID = (res.getValue('entityid'));
              nlapiLogExecution('DEBUG', (listValue + ", " + listID));
              selectCust.addSelectOption(i,listID);
           } 
/* 
       var selectCust = form.addField('selectfield1','select', 'CUSTOMER');
       selectCust.addSelectOption('a','');
        selectCust.addSelectOption('b','jack');
        selectCust.addSelectOption('c','vivi');
        selectCust.addSelectOption('d','Will');
        selectCust.addSelectOption('e','rub');
        selectCust.addSelectOption('f','vk');
*/

       var selectmon= form.addField('selectfield2','select', 'POSTING PEROD1');
        selectmon.addSelectOption('1','FED 2014');
        selectmon.addSelectOption('2','FED 2018');
        selectmon.addSelectOption('1','FED 2064');

  
        
        form.addField('datefield1','date', 'Date');
        var date=new Date();
        
        form.addField('datefield2','date', 'NEXT BILL ON OR BEFORE1');

        var selectpri= form.addField('selectfield3','select', 'TO BE PRINTED');
        selectpri.addSelectOption('1','yes');
        selectpri.addSelectOption('1','no');

        var selectema=form.addField('selectfield4','select', 'TO BE EMAILED1');
        selectema.addSelectOption('1','yes');
        selectema.addSelectOption('1','no');

/*
          var group = form.addFieldGroup( 'myfieldgroup', 'My Field Group');
          form.addField('companyname', 'text', 'Company Name', null,'myfieldgroup');
          form.addField('legalname', 'text', 'Legal Name', null, 'myfieldgroup');
          form.addField('datefield','date', 'Date', null,'myfieldgroup' );
          form.addField('currencyfield','currency', 'Currency', null,'myfieldgroup');
          form.addField('textareafield','textarea', 'Textarea', null,'myfieldgroup');
     	  group.setShowBorder(true);
*/

        // Define search filters
        var filters = new Array();
        filters[0] = new nlobjSearchFilter( 'trandate', null, 'onOrAfter', 'daysAgo90' );
        // filters[1] = new nlobjSearchFilter( 'projectedamount', null, 'between', 1000, 100000 );
        // filters[2] = new nlobjSearchFilter( 'salesrep', 'customer', 'anyOf', \-5, null );
        // Define search columns
        var columns = new Array();
        columns[0] = new nlobjSearchColumn( 'entity' );
        //columns[0] = new nlobjSearchColumn( 'salesrep' );
        //columns[1] = new nlobjSearchColumn( 'expectedclosedate' );
        //  columns[2] = new nlobjSearchColumn( 'entity' );
        // columns[3] = new nlobjSearchColumn( 'projectedamount' );
        //  columns[4] = new nlobjSearchColumn( 'probability' );
        //columns[5] = new nlobjSearchColumn( 'email', 'customer' );
        //columns[6] = new nlobjSearchColumn( 'email', 'salesrep' );
        // Create the saved search
        var search = nlapiCreateSearch( 'salesorder', filters, columns );
        var searchId = search.saveSearch('My Opportunities in Last 90 Days', 'jacksearch');    
        
        
        
      var sublist = form.addSubList('sublist','inlineeditor', 'Inline Editor Sublist');
        sublist.addField('sublist1', 'checkbox', 'INVOICE');
        sublist.addField('sublist2', 'url', 'PROCESS');
        sublist.addField('sublist3', 'url', 'ORDER DATE');
        sublist.addField('sublist4', 'text', 'ORDER#');
        sublist.addField('sublist5', 'text', 'BILL DATE');
        sublist.addField('sublist6', 'text', 'CUSTOMER:PROJECTNAME');
        sublist.addField('sublist7', 'text', 'MOME');
        sublist.addField('sublist8', 'text', 'CURRENCY');
        sublist.addField('sublist9', 'text', 'ORDER　TYPE');

        //设置是否显示此子列表hidden不显示nomal（defoult）显示
        //sublist.setDisplayType('hidden');
        //设置是否显示显示一段（帮助）文本在子列表中
        //sublist.setHelpText('显示一段（帮助）文本在子列表中');
        //为此子列表设置一个标题
        //sublist.setLabl('item');
        
        
        form.addSubmitButton('Submit');
        response.writePage( form );
    }
    else
        dumpResponse(request,response);
}

