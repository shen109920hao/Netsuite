function beforeLoad(type, form, request) {
    try {
        var id = nlapiGetRecordId(), recType = nlapiGetRecordType();
        nlapiLogExecution("debug", "beforeLoad____________ id: " + id, "recType: " + recType + " type: " + type);
        if (type == "view") {

            //if (recType == "invoice") {
            //    form.addButton("custpage_invoice_print", "Print", "window.open(" + "'/app/site/hosting/scriptlet.nl?script=179&deploy=1&" + serializeURL({
            //        recType: recType,
            //        id: id
            //    }) + "'" + ",'_blank'),window.focus()");
            //}
            //else

            if (recType == "transferorder") {
                form.addButton("custpage_transferorder_print", "Print", "window.open(" + "'/app/site/hosting/scriptlet.nl?script=202&deploy=1&" + serializeURL({
                    recType: recType,
                    id: id
                }) + "'" + ",'_blank'),window.focus()");
            }
        }
        nlapiLogExecution("debug", "beforeLoad____________end");
    } catch (e) {
        processException(e);
    }
}

function beforeSubmit(type) {

}

function afterSubmit(type) {

}