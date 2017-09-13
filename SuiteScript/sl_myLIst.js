function demoList(request, response)

{




     var list = nlapiCreateList('Simple List');
 
     // You can set the style of the list to grid, report, plain, or normal, or you can get the
    // default list style that users currently have specified in their accounts.
     list.setStyle(request.getParameter('style'));
     
     //增加一个column并为其设置此column是一个连接，并各这个连接传递两个参数
     var column = list.addColumn('number', 'text', 'Number', 'left');
     column.setURL(nlapiResolveURL('RECORD','salesorder'));
     column.addParamToURL('id','id', true);
     
     //增加column 
     list.addColumn('trandate', 'date', 'Date', 'left');
     list.addColumn('name_display', 'text', 'Customer', 'left');
     list.addColumn('salesrep_display', 'text', 'Sales Rep', 'left');
     list.addColumn('amount', 'currency', 'Amount', 'right');
 
     var returncols = new Array();
     returncols[0] = new nlobjSearchColumn('trandate');
     returncols[1] = new nlobjSearchColumn('number');
     returncols[2] = new nlobjSearchColumn('name');
     returncols[3] = new nlobjSearchColumn('salesrep');
     returncols[4] = new nlobjSearchColumn('amount');
 
     var results = nlapiSearchRecord('estimate', null, new nlobjSearchFilter('mainline',null,'is','T'), returncols);
     list.addRows( results );
     
     
     
 
     list.addPageLink('crosslink', 'Create Phone Call', nlapiResolveURL('TASKLINK','EDIT_CALL'));
     list.addPageLink('crosslink', 'Create Sales Order',
     nlapiResolveURL('TASKLINK','EDIT_TRAN_SALESORD'));
     
     var al ="alert('Hello World')";
     list.addButton('custombutton', 'submit', al);
     
     response.writePage( list );
}