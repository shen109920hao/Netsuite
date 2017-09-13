function run(request, response) {
    if (request.getMethod() == "GET") {
        var recType = request.getParameter('recType');
        var id = request.getParameter('id');

        var obj = nlapiLoadRecord(recType, id);
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


function toStdAmount(sAmount) {
    var sComma = /\/,/gi;
    var sResult = sAmount.replace(sComma, "");
    var iDotIndex = sResult.indexOf(".");
    var iLength = sResult.length;
    var toMatchNaNum = /\/D/;
    if (iDotIndex != -1 && iLength - iDotIndex > 3 || toMatchNaNum.test(sResult.slice(iDotIndex + 1, iLength))) return -1; else {
        if (iDotIndex == -1) sResult = sResult + ".00"; else if (iDotIndex == 0) {
            if (iLength - iDotIndex == 1) sResult = "0" + sResult + "00";
            if (iLength - iDotIndex == 2) sResult = "0" + sResult + "0";
            if (iLength - iDotIndex == 3) sResult = "0" + sResult;
        } else {
            if (iLength - iDotIndex == 2) sResult = sResult + "0";
            if (iLength - iDotIndex == 1) sResult = sResult + "00";
        }
        var sTemp = "";
        sTemp = sResult.slice(0, iDotIndex);
        var iTemp = new Number(sTemp);
        sTemp = iTemp.toString();
        if (sTemp.length > 16) return -2;
        iDotIndex = sResult.indexOf(".");
        sResult = sTemp + sResult.slice(iDotIndex);
        return sResult;
    }
}

function getChineseCurrencyString(sAmount) {
    var value = toStdAmount(sAmount);
    if (value < 0) return value;
    var sCN_Num = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
    var unit = new Array("元", "万", "亿", "万");
    var subunit = new Array("拾", "佰", "仟");
    var sCNzero = "零";
    var result = "";
    var iDotIndex = value.indexOf(".");
    var sBeforeDot = value.slice(0, iDotIndex);
    var sAfterDot = value.slice(iDotIndex);
    var len = 0;
    len = sBeforeDot.length;
    var i = 0, j = 0, k = 0;
    var oldC = "3";
    var cc = "0";
    result = unit[0] + result;
    var oldHasN = false;
    var hasN = false;
    var allZero = true;
    for (i = 0; i < len; i++) {
        if (j == 0 && i != 0) {
            if (!hasN) {
                if (k % 2 == 0) result = result.slice(1);
            } else {
                if (oldC == "0") result = sCNzero + result;
            }
            result = unit[k] + result;
            oldHasN = hasN;
            hasN = false;
        }
        cc = sBeforeDot.charAt(len - i - 1);
        if (oldC == "0" && cc != oldC) {
            if (hasN) result = sCNzero + result;
        }
        if (cc != "0") {
            if (j != 0) result = subunit[j - 1] + result;
            var dig = "0";
            dig = sCN_Num[cc];
            if (dig == "0") return false;
            hasN = true;
            allZero = false;
            result = dig + result;
        }
        oldC = cc;
        j++;
        if (j == 4) {
            k++;
            j = 0;
        }
    }
    if (allZero) {
        result = "零元";
    } else {
        var bb = 0;
        if (!hasN) {
            bb++;
            if (!oldHasN) {
                bb++;
            }
        }
        if (bb != 0) result = result.slice(bb);
        if (result.charAt(0) == "零") result = result.slice(1);
    }
    sAfterDot = sAfterDot.slice(1);
    len = sAfterDot.length;
    var corn = new Array("0", "0");
    var cornunit = new Array("角", "分");
    var n = 0;
    var dig = "0";
    corn[0] = sAfterDot.charAt(0);
    if (len > 1) corn[1] = sAfterDot.charAt(1); else corn[1] = "0";
    if (corn[0] == "0" && corn[1] == "0") return result += "整"; else if (allZero) result = "";
    for (i = 0; i < 2; i++) {
        var curchar = corn[i];
        dig = sCN_Num[curchar];
        if (i == 0) {
            if (result != "" || curchar != "0") result += dig;
            if (curchar != "0") {
                result += cornunit[0];
            }
        }
        if (i == 1 && curchar != "0") result = result + dig + cornunit[1];
    }
    return result;
}
