function run(request, response) {
    if (request.getMethod() == "GET") {
        var recType = request.getParameter('recType');
        var id = request.getParameter('id');

        var obj = nlapiLoadRecord(recType, id);
        
        //获取公司的配置信息
        var companyInfo = nlapiLoadConfiguration('companyinformation');
        nlapiLogExecution("debug", 'hello---------',companyInfo);
        //获取公司配置上的logo信息
        var companyNM = companyInfo.getFieldValue('companyname');
        
        //将logo信息填充到obj对象中        
        //obj.companyLogoUrl = companyLogo;
        var comLogo = companyInfo.getFieldValue('pagelogo');
        
        obj.setFieldValue('companyLogo',comLogo);
        obj.setFieldValue('companyname',companyNM);
        var comLogoText = companyInfo.getFieldText('pagelogo');
        obj.setFieldValue('companyLogoText',comLogoText);
        
        var renderer = nlapiCreateTemplateRenderer();

        if (recType == 'transferorder') {
            //var customerId = obj.getFieldValue('entity');
            //renderer.addRecord('customer', nlapiLoadRecord('customer', customerId));
        }

        var file = nlapiLoadFile('SuiteScripts/print_' + recType + '.html');
        var html = file.getValue();

        renderer.addRecord('record', obj);
        renderer.setTemplate(html);

        var xml = renderer.renderToString();
        var pdfFile = nlapiXMLToPDF(xml);
        response.setContentType('PDF', obj.getRecordType().toUpperCase() + obj.getFieldValue('tranid') + '.pdf', 'inline');
        response.write(pdfFile.getValue());

    }
}