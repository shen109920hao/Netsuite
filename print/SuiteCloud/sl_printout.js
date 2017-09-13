//160926   yaffil.wu@tctchina.com.cn
 
function PrintSUT(request, response)
{
	try
	{            var recid = request.getParameter('custscript_recid'),
	                 rectype = request.getParameter('custscript_rectype');
	           var ctx = nlapiGetContext(); 

 	  var loadSearchfy = nlapiLoadSearch('estimate','customsearchestimate_for_print_s');
      var searchfy = nlapiCreateSearch(loadSearchfy.getSearchType(), loadSearchfy.getFilters(),loadSearchfy.getColumns());
 
      searchfy.addFilter(new nlobjSearchFilter('internalid',  null, 'is',   recid ));   
  
       var searchfyResults = searchfy.runSearch();  

	 var resultIndex = 0; 
	var resultStep = 1000; 
	var resultfySet;
     var  strName  = '<table   class="table">' ;
   var subtotalsum=subdiscount=0;
 
        resultfySet  = searchfyResults.getResults(0,100);		
 
 
		if(resultfySet != null && resultfySet.length > 0)	
  	   {	for(var f = 0; f < resultfySet.length; f++)
	    {   
	           var resultsfy = resultfySet[f];
	       var columnsfy = resultsfy.getAllColumns();

	    var  strexchange=resultsfy.getValue(columnsfy[9]);
		var  stritemtype=resultsfy.getValue(columnsfy[10]);
 		nlapiLogExecution('debug','In func PrintSUT',stritemtype);
		if ((stritemtype != 'TaxItem') && (stritemtype != 'Discount'))
		{strName  += '<tr> <td width="38mm"  align="left">'+ resultsfy.getText(columnsfy[0])   +'</td> ';
	   strName  += '  <td   width="60mm"  align="left">'+ convert(resultsfy.getValue(columnsfy[1]))   +'</td>  ';	 
	   strName  += '   <td  width="33mm"  align="left"> '+ resultsfy.getValue(columnsfy[2])   +'</td>  ';	
	   strName  += ' <td width="27mm"  align="center">'+ resultsfy.getValue(columnsfy[3])   +'</td>  ';		   
	   strName  += ' <td width="25mm"  align="center">'+ resultsfy.getValue(columnsfy[4])   +'</td>  ';		   
	   strName  += ' <td width="33mm"  align="right">'+ commaTwoDecimal(resultsfy.getValue(columnsfy[5])/strexchange)   +'</td>  ';		
	   strName  += '  <td width="27mm"  align="right">'+ resultsfy.getValue(columnsfy[6])   +'</td>  ';		
	   strName  += '  <td width="30mm"  align="right">'+ commaTwoDecimal(resultsfy.getValue(columnsfy[7])/strexchange)   +'</td>  ';		
	   strName  += '  <td width="32mm"  align="right">'+ commaTwoDecimal(resultsfy.getValue(columnsfy[8])/strexchange +resultsfy.getValue(columnsfy[7])/strexchange )  +'</td> </tr> ';
       	subtotalsum+=   resultsfy.getValue(columnsfy[8])/strexchange;
        }
       if  (stritemtype == 'Discount') 		
	   subdiscount=   resultsfy.getValue(columnsfy[8])/strexchange;
        }    
	    }	
	 
	 
 
	           var    fields1 = [    'taxtotal',  'total',  'location', 'tranid',  'trandate','custbody_estimate_terms','discountamount','duedate','salesrep','currency'],
		   fields2 = [  'entity',   'currency',  'salesrep' ],
            columns1 = nlapiLookupField('estimate', recid, fields1),
	      columns2 = nlapiLookupField('estimate', recid, fields2,true);


     strName  += '</table>';
       var strsymbol='';
       var load_rec = nlapiLoadRecord('currency',columns1.currency),
		strsymbol=load_rec.getFieldValue('displaysymbol') ;
 /*      strName  += '<table width="99%" >';
	   strName  += ' <tr> <td  width="78%"  > </td>  <td  width="11%"   align="right"> Subtotal </td>  ';	 
 	   strName  += '  <td  width="11%"   align="right">'+ strsymbol +' '+commaTwoDecimal(subtotalsum)+'</td> </tr> ';		
	   strName  += ' <tr> <td     > </td>  <td      align="right"> Discount </td>  ';	 
 	   strName  += '  <td     align="right">'+ strsymbol+' '+	commaTwoDecimal(subdiscount)  +'</td> </tr> ';			   
	   strName  += ' <tr> <td    > </td>  <td    align="right"> Tax Total </td>  ';	 
 	   strName  += '  <td     align="right">'+ strsymbol+ ' '+commaTwoDecimal(parseFloat(columns1.taxtotal)/strexchange)  +'</td> </tr> ';		
	   strName  += ' <tr> <td     > </td>  <td   align="right"> Total </td>  ';	 
 	   strName  += '  <td    align="right">'+  strsymbol+' '+commaTwoDecimal(parseFloat(columns1.total)/strexchange)  +'</td> </tr> ';		
	   strName  += '</table >';
*/
	    strName  += '<table width="99%" >';
	   strName  += ' <tr> <td  width="78%"  > </td>  <td  width="22%"   > ';
	   strName  += '<table width="100%"  > <tr> <td  width="50%"    align="right"> Subtotal </td>  ';	 
 	   strName  += '  <td  width="50%"   align="right">'+ strsymbol +' '+ commaTwoDecimal(subtotalsum) +'</td> </tr> ';		
     if 	   (subdiscount!=0)
	   strName  += ' <tr>    <td      align="right"> Discount  '+  Math.round((0-subdiscount)*100/subtotalsum) +'%</td>  ';	
     else 
        strName  += ' <tr>    <td      align="right"> Discount 0%</td>  ';	

 	   strName  += '  <td     align="right">'+ strsymbol +' '+ 	commaTwoDecimal(subdiscount)  +'</td> </tr> ';			   
	   strName  += ' <tr>   <td    align="right"> Tax Total </td>  ';	 
 	   strName  += '  <td     align="right">'+ strsymbol +' '+  commaTwoDecimal(parseFloat(columns1.taxtotal)/strexchange)  +'</td> </tr> ';		
	   strName  += ' <tr>   <td   align="right"> Total </td>  ';	 
 	   strName  += '  <td    align="right">'+ strsymbol +' '+  commaTwoDecimal(parseFloat(columns1.total)/strexchange)  +'</td> </tr> </table >';		
	   strName  += '</td> </tr>  </table >'; 


       //---------------------------------------------------------------------------------------------------------------------------------------------	
	
	xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
	xml += '<pdf>\n<head>\n <macrolist>';	
               xml += '<macro id="nlheader">';
                xml +='<table  ><tr>';
                xml +='<td  rowspan = "3"  width="25%">';
                xml +='<div style="margin-bottom: 20pt"><strong><img src="https://system.eu2.netsuite.com/core/media/media.nl?id=155&amp;c=4454730&amp;h=8d984e405be511024938" style="width: 100px; height: 22px;" /></strong></div>  </td>   ';
 
		xml +='<td  colspan = "2" align="left"><span style=\"font-size: 18pt\;\">  '+ nlapiLookupField(rectype, recid, 'subsidiary.legalname')+'  </span></td>';
		var strlocation=columns1.location ;
           if (strlocation=='')	
        xml +='</tr><tr>  <td width="40%"> </td><td   > <span style=\"font-size: 10pt\;\"> Add: </span></td>';		
	else     
		xml +='</tr><tr> <td  width="40%"  ></td><td   > <span style=\"font-size: 10pt\;\"> Add: '+  nlapiLookupField('location',strlocation,'address1')  +' </span></td>';		
        xml +='</tr><tr><td   align="right"></td>';
           if (strlocation=='')	
        xml +='<td   align="left"> <span style=\"font-size: 10pt\;\">   Tel:    </span> <br/></td></tr>';
           else   
	xml +='<td  > <span style=\"font-size: 10pt\;\">  Tel:  '+ nlapiLookupField('location',strlocation,'phone')+' </span> <br/></td></tr></table  >';
			  xml +='<table  ><tr><td  align="center"> <span style=\"font-size: 18pt\;\">  QUOTATION   </span>  </td></tr> ';
              xml +='<tr> <td  align="right"> <span style=\"font-size: 10pt\;\"> NO: '+ columns1.tranid +'</span></td> </tr></table>';
     xml +='<table  ><tr><td width="60%" > <span style=\"font-size: 10pt\;\"> CUSTOMER: ' + convert(columns2.entity)+'</span> </td> ';
     xml +='<td  align="left" width="20%">  <span style=\"font-size: 10pt\;\"> DATE: '+ columns1.trandate+'</span> </td> ';
     xml +=' <td align="left" width="20%"> <span style=\"font-size: 10pt\;\"> CURRENCY: ' + columns2.currency+'</span> </td> </tr>';
     xml +='<tr><td  > <span style=\"font-size: 10pt\;\"> SALES REP: ' + columns2.salesrep+' </span> </td> ';
			  xml +='<td  align="left"> <span style=\"font-size: 10pt\;\">EXPIRES:  ' + columns1.duedate+' </span></td> ';
              xml +=' <td align="left"><span style=\"font-size: 10pt\;\">TEL:  ' + nlapiLookupField('employee',columns1.salesrep,'mobilephone')+'</span></td> </tr></table>';		
  		      xml += '<table  class="table" ><tr> <th width="38mm" align="center">CODE</th><th width="60mm" align="center">DESCRIPTION	</th>    <th width="33mm" align="center">MODEL	</th>       <th width="27mm" align="center">QTY	</th><th width="25mm" align="center">UOM	</th> <th width="33mm" align="center">UNIT PRICE	</th> <th width="27mm"  align="center">	RATE</th> <th width="30mm" align="center">TAX AMT	</th> <th width="32mm" align="center">	GROSS AMT</th>  </tr></table></macro>';  
              xml += '<macro id="nlfooter">';
              xml +="<table><tr>";
			  xml +=' <td > <span style=\"font-size: 11pt\;\">TERMS AND CONDITIONS:</span></td> </tr>';

			  xml +=' <tr><td > <span style=\"font-size: 10pt\;\">'+columns1.custbody_estimate_terms+ '</span> </td> </tr></table>';
              xml +="<table><tr><td ></td>  </tr><tr><td ></td>  </tr><tr>";
        	  xml +=' <td >SALES REP SIGNATURE:</td>  </tr>'; 					
			  xml +=' <tr><td >SALES MANAGER REMARKS AND SIGNATURE: </td>  </tr>'; 					
  		      xml +="</table></macro></macrolist>" ;
	         xml +='<style type="text/css">    body {font-family: sans-serif, stsong; font-style: normal;font-size: 8pt; font-weight: normal;  }table {  font-family: sans-serif, stsong; border-spacing: 0;    border-collapse: collapse;   width: 100%; max-width: 100%;  }    table tr {  display: table-row;       }    table th  {  background-color: #dedede;     white-space: nowrap;       text-transform: uppercase;       font-weight: bold;     padding: 3px;       border: 1px solid #404040;   } table td {   white-space: nowrap;    vertical-align: top; border-collapse: collapse;      }      table.table {  border: 1px solid #404040;     margin-top: 20pt;   table-layout:fixed;   }      table.table th {  background-color: #dedede;     white-space: nowrap;       text-transform: uppercase;       font-weight: bold;            padding: 3px;       border: 1px solid #404040; border-bottom: none;  }     table.table td {      padding: 6px;          border: 1px solid #404040;    border-bottom: none; word-wrap:break-word;  white-space: normal; padding-left:1px; text-indent:-1px }   table.tab td {     padding: 0px; font-family: sans-serif, stsong;      font-style: normal;    font-size: 8pt;      font-weight: normal;  }    table.header td {           line-height: 18px;        }    </style></head>';
          xml += '<body  header="nlheader" footer="nlfooter" header-height="166pt"  footer-height="150pt"   size="A4" >';
	 xml += strName;
	 xml += "</body>\n</pdf>";
	
	
	  var file = nlapiXMLToPDF(xml);
	  response.setContentType('PDF','estimate.pdf','inline');
	  response.write(file.getValue());
       }
 
       catch(e)
	{
		nlapiLogExecution('debug','In func PrintSUT','exception='+e);
	}

}
   