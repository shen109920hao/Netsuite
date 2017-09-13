/**
 * Build an email form Suitelet with UI objects. The Suitelet sends out an email
 * from the current user to the recipient email address specified on the form.
 */
function simpleEmailForm(request, response)
{
   if ( request.getMethod() == 'GET' ) 
   {
        var form = nlapiCreateForm('jack Form');
        var subject = form.addField('subject','text', 'Subject');
        subject.setLayoutType('normal','startcol');
        subject.setMandatory( true );
        var recipient = form.addField('recipient','email', 'Recipient email');
        recipient.setMandatory( true );
        var message = form.addField('message','textarea', 'Message');
        message.setDisplaySize( 60, 10 );
        form.addSubmitButton('Send Email');
 
   response.writePage(form);
   }
   else
   {
            var currentuser = nlapiGetUser();
            var subject = request.getParameter('subject')
            var recipient = request.getParameter('recipient')
            var message = request.getParameter('message') 
        nlapiSendEmail(currentuser, recipient, subject, message); 
   }
} 