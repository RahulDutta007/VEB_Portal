const mailSubject = "User Profile has been created";

const mailBody = (first_name, last_name, groupLogo, registrationImage) => {

	//let groupLogo = "https://member.enrollment.nexcaliber.com/assets/img/email_logo.png";
	//let registrationImage = "https://member.enrollment.nexcaliber.com/assets/img/email/reg_snapshot.png";

	let html = `<!DOCTYPE html><html> <head> <meta charset="UTF-8"/> <title>Welcome</title> </head> <body> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" > <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width" initial-scale="1.0" user-scalable="yes"/> <meta name="format-detection" content="telephone=no"/> <meta name="format-detection" content="date=no"/> <meta name="format-detection" content="address=no"/> <meta name="format-detection" content="email=no"/> <meta name="robots" content="noindex,nofollow"/> <title>Welcome</title> <link href="https://fonts.googleapis.com/css?family=PT+Sans&subset=latin,latin-ext" rel="stylesheet" type="text/css"/> <link href="https://fonts.googleapis.com/css?family=Open+Sans&subset=latin,latin-ext" rel="stylesheet" type="text/css"/> <style type="text/css"> .ReadMsgBody{width: 100%;}.ExternalClass{width: 100%;}.ExternalClass *{line-height: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font{line-height: 100%;}body{margin: 0; padding: 0;}body, table, td, p, a, li{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table td{border-collapse: collapse;}table{border-spacing: 0; border-collapse: collapse;}p, a, li, td, blockquote{mso-line-height-rule: exactly;}p, a, li, td, body, table, blockquote{-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}img, a img{border: 0; outline: none; text-decoration: none;}img{-ms-interpolation-mode: bicubic;}a[href^="tel"], a[href^="sms"]{color: inherit; cursor: default; text-decoration: none;}a[x-apple-data-detectors]{color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important;}.mlEmailContainer{max-width: 640px !important;}@media only screen and (min-width: 768px){.mlEmailContainer{width: 640px !important;}}.bbi-header{font-size: 2rem;}/* @media (max-width: 640px){}*/ @media only screen and (max-width: 640px){.bbi-header{font-size: 1.5rem;}.mlTemplateContainer{padding: 10px 10px 0 10px;}.mlContentTable{width: 100% !important; min-width: 200px !important;}/* -- */ .mlContentBlock{float: none !important; width: 100% !important;}/* -- */ .mlContentOuter{padding-bottom: 0px !important; padding-left: 25px !important; padding-right: 25px !important; padding-top: 25px !important;}/* -- */ .mlBottomContentOuter{padding-bottom: 25px !important;}.mlLeftRightContentOuter{padding-left: 5px !important; padding-right: 5px !important;}.mlContentContainerOuter{padding-left: 0px !important; padding-right: 0px !important;}/* -- */ .mlContentContainer{padding-left: 25px !important; padding-right: 25px !important;}/* -- */ .mlContentButton a, .mlContentButton span{width: auto !important;}/* -- */ .mlContentImage img, .mlContentRSS img{height: auto !important; width: 100% !important;}.mlContentImage{height: 100% !important; width: auto !important;}.mlContentLogo img{height: auto !important; max-width: 158px !important; width: 100% !important;}/* -- */ .mlContentContainer h1{font-size: 24px !important; line-height: 125% !important; margin-bottom: 0px !important;}/* -- */ .mlContentContainer h2{font-size: 18px !important; line-height: 125% !important; margin-bottom: 0px !important;}/* -- */ .mlContentContainer h3{font-size: 16px !important; line-height: 125% !important; margin-bottom: 0px !important;}/* -- */ .mlContentContainer p, .mlContentContainer .mlContentRSS{font-size: 16px !important; line-height: 125% !important;}/* -- */ .mobileHide{display: none !important;}/* -- */ .alignCenter{height: auto !important; text-align: center !important;}/* -- */ .marginBottom{margin-bottom: 25px !important;}/* -- */ .mlContentHeight{height: auto !important;}.mlContentGap{height: 25px !important;}.mlDisplayInline{display: inline-block !important; float: none !important;}body{margin: 0px !important; padding: 0px !important;}body, table, td, p, a, li, blockquote{-webkit-text-size-adjust: none !important;}}</style> </head> <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" dir="ltr" style=" padding: 0; margin: 0; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; background: #f9f9f9; " bgcolor="#f9f9f9" > <div id="fb-root" style="display: none;"></div> <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f9f9f9" style=" border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " > <tr> <td class="mlTemplateContainer" align="center"> <table align="center" border="0" class="mlEmailContainer" cellpadding="0" cellspacing="0" width="100%" style=" border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " > <tr> <td align="center"> <table width="640" class="mobileHide" align="center" cellspacing="0" cellpadding="0" border="0" style="width: 640px;" > <tr> <td align="left" class="preheader-text" width="420" style=" padding: 15px 0px; font-family: Arial; font-size: 11px; line-height: 17px; color: #95a5a6; " ></td><td width="20"></td></tr></table> <span class="mobileHide" style=" white-space: nowrap; font: 15px courier; line-height: 0; " >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span > <table align="center" width="640" class="mlContentTable" cellpadding="0" cellspacing="0" border="0" style=" min-width: 640px; width: 640px; " > <tr> <td class="mlContentTable"> <table width="640" class="mlContentTable" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF" align="center" style="width: 640px;" > <tr> <td align="center" class="mlContentOuter alignCenter mlContentLogo mlBottomContentOuter" style=" padding: 50px 50px 40px 50px; background: #ffffff; " > <img border="0" src=${groupLogo} alt="Welcome email logo" class="mlContentImage" style=" min-width: 80%; height: 80px; display: block;margin:0 auto; "/></td></tr></table> </td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" id="ml-block-32194097" > <tr> <td> <table width="640" class="mlContentTable" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0" align="center" style=" background: #ffffff; width: 640px; " > <tr> <td align="center" class="mlContentContainer mlContentImage mlContentHeight" style="" >  </td></tr></table> </td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" > <tr> <td class="mlContentTable" height="15" style=" min-width: 640px; width: 640px; " width="640" ></td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" id="ml-block-32193835" > <tr> <td> <table width="640" class="mlContentTable" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0" align="center" style=" background: #ffffff; width: 640px; " > <tr> <td align="left" class="mlContentContainer" style=" padding: 15px 50px 0px 50px; font-family: 'Open Sans', Sans-Serif; font-size: 16px; color: #000000; line-height: 27px; " > <p style=" margin: 0px 0px 10px 0px; padding-top: 1rem; " > Hello ${first_name} ${last_name}, <br> We are glad to inform you that your account has been configured. Please go and register yourself. </p></td></tr></table> </td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" id="ml-block-32193859" > <tr> <td> <table width="640" class="mlContentTable" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0" align="center" style=" background: #ffffff; width: 640px; " > <tr> <td style=" padding: 15px 0px 0px 0px; " > <table width="100%" cellspacing="0" cellpadding="0" border="0" style=" border-top: 2px solid #eaedf1; " > <tr> <td width="100%" height="15px" ></td></tr></table> </td></tr></table> </td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" > <tr> <td class="mlContentTable" height="30" style=" min-width: 640px; width: 640px; " width="640" ></td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" id="ml-block-32193841" > <tr> <td> <table width="640" class="mlContentTable" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0" align="center" style=" background: #ffffff; width: 640px; " > <tr> <td align="left" class="mlContentContainer" style=" padding: 5px 50px 5px 50px; " > <h1 style=" margin: 0px; font-family: 'Open Sans', Sans-Serif; font-weight: bold; font-size: 26px; text-decoration: none; line-height: 36px; color: #000000; " > What's next? </h1> </td></tr></table> </td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" id="ml-block-32193843" > <tr> <td> <table width="640" class="mlContentTable" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0" align="center" style=" background: #ffffff; width: 640px; " > <tr> <td align="left" class="mlContentContainer" style=" padding: 15px 50px 5px 50px; font-family: 'Open Sans', Sans-Serif; font-size: 16px; color: #000000; line-height: 27px; " > <p style=" margin: 0px 0px 10px 0px; " > <a href="https://member.enrollment.nexcaliber.com/register.html" target="_blank" style=" color: #27ae60; text-decoration: underline; " >Click here</a > to create your new credentials to access your account data and view and activate all your eligible benefits. </p><p style=" margin: 0px 0px 10px 0px; " > Or go through our FAQ <a href="" target="_blank" style=" color: #27ae60; text-decoration: underline; " ></a> section where we walk you through the registration process step by step. </p><p style=" margin: 0px 0px 10px 0px; " > Below is a snapshot of the page for your convenience. </p></td></tr></table> </td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" id="ml-block-32413421" > <tr> <td> <table width="640" class="mlContentTable" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0" align="center" style=" background: #ffffff; width: 640px; " > <tr> <td align="center" class="mlContentContainer mlContentImage mlContentHeight" style=" padding: 15px 50px 15px 50px; " > <img border="0" src=${registrationImage} width="540" height="300" alt="Registration Page Snapshot" class="mlContentImage" style=" display: block; "/> </td></tr></table> </td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" > <tr> <td class="mlContentTable" height="30" style=" min-width: 640px; width: 640px; " width="640" ></td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" id="ml-block-32280747" > <tr> <td> <table width="640" class="mlContentTable" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0" align="center" style=" background: #ffffff; width: 640px; " > <tr> <td style=" padding: 15px 0px 0px 0px; " > <table width="100%" cellspacing="0" cellpadding="0" border="0" style=" border-top: 2px solid #eaedf1; " > <tr> <td width="100%" height="15px" ></td></tr></table> </td></tr></table> </td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" > <tr> <td class="mlContentTable" height="30" style=" min-width: 640px; width: 640px; " width="640" ></td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" id="ml-block-32280769" > <tr> <td> <table width="640" class="mlContentTable" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0" align="center" style=" background: #ffffff; width: 640px; " > <tr> <td align="left" class="mlContentContainer" style=" padding: 5px 50px 5px 50px; " > <h1 style=" margin: 0px; font-family: 'Open Sans', Sans-Serif; font-weight: bold; font-size: 26px; text-decoration: none; line-height: 36px; color: #000000; " > Have a question? </h1> </td></tr></table> </td></tr></table> <table align="center" border="0" bgcolor="#FFFFFF" class="mlContentTable" cellspacing="0" cellpadding="0" style=" background: #ffffff; min-width: 640px; width: 640px; " width="640" id="ml-block-32193849" > <tr> <td> <table width="640" class="mlContentTable" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0" align="center" style=" background: #ffffff; width: 640px; " > <tr> <td align="left" class="mlContentContainer" style=" padding: 15px 50px 5px 50px; font-family: 'Open Sans', Sans-Serif; font-size: 16px; color: #000000; line-height: 27px; " > <p style=" margin: 0px 0px 10px 0px; line-height: 27px; " > You can always contact our support team at 936-634-8155, ext 4676. We will be happy to help you! </p></td></tr></table> </td></tr></table> <table align="center" width="640" class="mlContentTable" cellpadding="0" cellspacing="0" border="0" style=" min-width: 640px; width: 640px; " > <tr> <td class="mlContentTable"> <table width="640" class="mlContentTable" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 640px;" > <tr> <td class="mlContentOuter mlBottomContentOuter" align="center" style=" padding: 25px 50px 30px 50px; font-family: Arial; font-size: 12px; color: #7f8c8d; " > <table width="100%" cellspacing="0" cellpadding="0" border="0" > <tr> <td style=" padding: 0px 0px 0px 0px; font-family: Arial; font-size: 12px; color: #7f8c8d; text-align: center; " > <p style=" margin: 0px 0px 5px 0px; padding: 0px; line-height: 150%; font-family: Arial; font-weight: bold; font-size: 14px; color: #7f8c8d; " > Nexcaliber </p><p style=" margin: 0px 0px 5px 0px; padding: 0px; line-height: 150%; " > 14800 Quorum Dr # 540, Dallas, TX 75254, United States </p><p style=" margin: 0px 0px 5px 0px; padding-top: 10px; line-height: 150%; font-family: Arial; font-weight: bold; /* font-size: 14px; */ color: #7f8c8d; " > &#169; Copyright Nexcaliber. All rights reserved. </p></td></tr><tr> <td width="100%" height="10" ></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body> </html> </body></html>`;
	
	return html;
};

module.exports = { mailSubject, mailBody };