/* eslint-disable*/
'use strict'
const FACEBOOK = {
  logo: 'https://praticabr.zendesk.com/attachments/token/O0cQW7GV7miSzPw2YJRZ1ocW7/?name=facebook.jpeg',
  link: 'https://www.facebook.com/praticabr',
  alt: 'Facebook'
}
const INSTAGRAM = {
  logo: 'https://praticabr.zendesk.com/attachments/token/VaRgyNPNB8RdRfVaklLbumJMx/?name=instagram.jpeg',
  link: 'https://www.instagram.com/praticabr/',
  alt: 'Instagram'
}
const LINKEDIN = {
  logo: 'https://praticabr.zendesk.com/attachments/token/Rn5MldIlqfLlgEnuOZnW3pppx/?name=linkedin.jpeg',
  link: 'https://www.linkedin.com/company/praticabr/',
  alt: 'LinkedIn'
}
const YOUTUBE = {
  logo: 'https://praticabr.zendesk.com/attachments/token/t82e3wqiok5OI0Ak9kUYsm2fg/?name=youtube.jpeg',
  link: 'https://www.youtube.com/user/praticabr',
  alt: 'YouTube'
}
const BASE_TEXT = {
  headerLogo: 'https://www.praticabr.com/img/logo-pratica.png',
  company: 'Pratica Klimaquip Ind. e Com. S/A',
  address: 'Pouso Alegre, MG',
  emailProtected: 'ajuda@praticabr.com'
}

/**
 * @description Return all base e-mail body template.
 * @param additionalTemplate HTML Template selected to compose this HTML e-mail
 * @param mainTitle HTML e-mail title
 */
function get (additionalTemplate: string, mainTitle: string) {
  const header = getHeader()
  const body = createBody(additionalTemplate, mainTitle)
  const footer = getFooter()

  return header + body + footer
}

/**
 * @description Receive a main content in html to add on all entire e-mail HTML body.
 * @param mainContent HTML content from a specific template.
 */
function createBody (mainContent: string, mainTitle: string) {
  return (
    '<body style=\'font-family: \'Roboto\', sans-serif;\'><table border=\'0\' align=\'center\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' class=\'main-template\' bgcolor=\'#f9fafc\' style=\'background-color: rgb(249, 250, 252);\'><tbody><tr><td align=\'center\' valign=\'top\'><table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'590\' class=\'templateContainer\' style=\'max-width:590px!important; width: 590px;\'><tbody><tr><td align=\'center\' valign=\'top\'><div style=\'background-color: rgb(25, 72, 131); border-radius: 0px;\'>' +
		'<table class=\'rnb-del-min-width\' width=\'100%\' cellpadding=\'0\' border=\'0\' cellspacing=\'0\' style=\'min-width:590px;\' name=\'Layout_1\' id=\'Layout_1\'><tbody><tr><td class=\'rnb-del-min-width\' align=\'center\' valign=\'top\' style=\'min-width:590px;\'> <a href=\'#\' name=\'Layout_1\'></a><table width=\'100%\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\' class=\'rnb-container\' bgcolor=\'#194883\' style=\'background-color: rgb(25, 72, 131); border-radius: 0px; padding-left: 20px; padding-right: 20px; border-collapse: separate;\'><tbody><tr>' +
		'<td height=\'20\' style=\'font-size:1px; line-height:0px; mso-hide: all;\'> &nbsp;</td></tr><tr><td valign=\'top\' class=\'rnb-container-padding\' align=\'left\'><table width=\'100%\' cellpadding=\'0\' border=\'0\' align=\'center\' cellspacing=\'0\'><tbody><tr><td valign=\'top\' align=\'center\'><table cellpadding=\'0\' border=\'0\' align=\'center\' cellspacing=\'0\' class=\'logo-img-center\'><tbody><tr><td valign=\'middle\' align=\'center\' style=\'line-height: 1px;\'><div style=\'border-top:0px None #000;border-right:0px None #000;border-bottom:0px None #000;' +
		`border-left:0px None #000;display:inline-block; ' cellspacing='0' cellpadding='0' border='0'><div><img width='221' vspace='0' hspace='0' border='0' alt='Prática' style='float: left;max-width:221px;display:block;' class='rnb-logo-img' src='${BASE_TEXT.headerLogo}'></div></div></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td height='20' style='font-size:1px; line-height:0px; mso-hide: all;'> &nbsp;</td></tr></tbody></table></td></tr></tbody></table></div></td></tr>` +
		'<tr><td align=\'center\' valign=\'top\'><div style=\'background-color: rgb(255, 255, 255); border-radius: 0px;\'><table width=\'100%\' cellpadding=\'0\' border=\'0\' cellspacing=\'0\' name=\'Layout_\' id=\'Layout_\'><tbody><tr><td align=\'center\' valign=\'top\'><a href=\'#\' name=\'Layout_\'></a><table border=\'0\' width=\'100%\' cellpadding=\'0\' cellspacing=\'0\' class=\'rnb-container\' bgcolor=\'#ffffff\' style=\'height: 0px; background-color: rgb(255, 255, 255); border-radius: 0px; border-collapse: separate; padding-left: 20px; padding-right: 20px;\'>' +
		'<tbody><tr><td class=\'rnb-container-padding\' style=\'font-size: 18px;font-family: \'Roboto\', sans-serif; color: #000;\'><table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' class=\'rnb-columns-container\' align=\'center\' style=\'margin:auto;\'><tbody><tr><th class=\'rnb-force-col\' align=\'center\' style=\'text-align: center; font-weight: normal\'><table border=\'0\' cellspacing=\'0\' cellpadding=\'0\' align=\'center\' class=\'rnb-col-1\'><tbody><tr><td height=\'10\'></td></tr>' +
		`<tr><td class='content-spacing' style='font-family: 'Roboto', sans-serif; color:#3c4858; text-align:center;'> <span style='color:#3c4858;'><strong><span style='font-size:24px;'>${mainTitle}</span></strong></span></td></tr><tr><td height='10'></td></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></td></tr>` +
		'<tr><td align=\'center\' valign=\'top\'><div style=\'background-color: rgb(255, 255, 255); border-radius: 0px;\'>' +
		'<table class=\'rnb-del-min-width\' width=\'100%\' cellpadding=\'0\' border=\'0\' cellspacing=\'0\'style=\'min-width:100%;\' name=\'Layout_5\'>' +
		'<tbody><tr><td class=\'rnb-del-min-width\' align=\'center\' valign=\'top\'>' +
		'<table width=\'100%\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\' class=\'rnb-container\' bgcolor=\'#ffffff\' ' +
		'style=\'background-color: rgb(255, 255, 255); padding-left: 20px; padding-right: 20px; border-collapse: separate; border-radius: 0px; border-bottom: 0px none rgb(200, 200, 200);\'>' +
		'<tbody><tr><td height=\'20\' style=\'font-size:1px; line-height:0px; mso-hide: all;\'>&nbsp;</td></tr>' +
		'<tr><td valign=\'top\' class=\'rnb-container-padding\' align=\'left\'><table width=\'100%\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\' class=\'rnb-columns-container\'>' +
		'<tbody><tr><th class=\'rnb-force-col\' style=\'text-align: left; font-weight: normal; padding-right: 0px;\' valign=\'top\'>' +
		'<table border=\'0\' valign=\'top\' cellspacing=\'0\'cellpadding=\'0\' width=\'100%\' align=\'left\'class=\'rnb-col-1\'>' +
		'<tbody><tr><td class=\'content-spacing\' style=\'font-size: 14px;; font-family: \'Roboto\', sans-serif; color:#3c4858; line-height: 21px;\'>' +
		`${mainContent}` +
		'</td></tr></tbody></table></th></tr></tbody></table></td></tr>' +
		'<tr><td height=\'20\' style=\'font-size:1px; line-height:0px; mso-hide: all;\'>&nbsp;</td></tr>' +
		'</tbody></table></td></tr></tbody></table></div></td></tr>'
  )
}

/**
 * @description Returns all HTML header text, Head, Styles, Metadata and first part from e-mail table body.
 */
function getHeader () {
  return (
    '<!DOCTYPE html PUBLIC \'-//W3C//DTD XHTML 1.0 Transitional//EN\' \'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\'><html xmlns=\'http://www.w3.org/1999/xhtml\' xmlns:v=\'urn:schemas-microsoft-com:vml\' xmlns:o=\'urn:schemas-microsoft-com:office:office\'><head><meta http-equiv=\'X-UA-Compatible\' content=\'IE=edge\' /><meta name=\'viewport\' content=\'width=device-width, initial-scale=1\' /><meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\' /><meta name=\'x-apple-disable-message-reformatting\' />' +
		'<meta name=\'apple-mobile-web-app-capable\' content=\'yes\' /><meta name=\'apple-mobile-web-app-status-bar-style\' content=\'black\' /><meta name=\'format-detection\' content=\'telephone=no\' /><title></title>' +
		'<style>@import url(\'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap\');</style>' +
		'<style type=\'text/css\'>.ReadMsgBody{width:100%;background-color:#ebebeb}.ExternalClass{width:100%;background-color:#ebebeb}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%}a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family: \'Roboto\', sans-serif !important;font-weight:inherit !important;line-height:inherit !important}' +
		'body{-webkit-text-size-adjust:none;-ms-text-size-adjust:none}body{margin:0;padding:0}.yshortcuts a{border-bottom:none !important}.rnb-del-min-width{min-width:0 !important}.templateContainer{max-width:590px !important;width:auto !important}img[class=\'rnb-col-3-img\']{max-width:170px}img[class=\'rnb-col-2-img\']{max-width:264px}img[class=\'rnb-col-2-img-side-xs\']{max-width:180px}img[class=\'rnb-col-2-img-side-xl\']{max-width:350px}img[class=\'rnb-col-1-img\']{max-width:550px}img[class=\'rnb-header-img\']{max-width:590px}' +
		'.rnb-force-col p,ul,ol{margin:0px !important}.rnb-del-min-width p,ul,ol{margin:0px !important}.rnb-tmpl-width{width:100% !important}.rnb-social-width{padding-right:15px !important}.rnb-social-align{float:right !important}li{mso-margin-top-alt:0;mso-margin-bottom-alt:0}table{mso-table-lspace:0pt;mso-table-rspace:0pt}table,tr,td{border-collapse:collapse}p,a,li,blockquote{mso-line-height-rule:exactly}.msib-right-img{mso-padding-alt:0 !important}.content-spacing div{display:list-item;list-style-type:none}' +
		'@media only screen and (min-width:590px){.templateContainer{width:590px !important}}@media screen and (max-width: 360px){.rnb-yahoo-width{width:360px !important}}@media screen and (max-width: 380px){.element-img-text{font-size:24px !important}.element-img-text2{width:230px !important}.content-img-text-tmpl-6{font-size:24px !important}.content-img-text2-tmpl-6{width:220px !important}}@media screen and (max-width: 480px){td[class=\'rnb-container-padding\']{padding-left:10px !important;padding-right:10px !important}' +
		'td.rnb-force-nav{display:inherit}.rnb-social-text-left{width:100%;text-align:center;margin-bottom:15px}.rnb-social-text-right{width:100%;text-align:center}}@media only screen and (max-width: 600px){.rnb-text-center{text-align:center !important}td.rnb-force-col{display:block;padding-right:0 !important;padding-left:0 !important;width:100%}table.rnb-container{width:100% !important}table.rnb-btn-col-content{width:100% !important}table.rnb-col-3{float:none !important;width:100% !important;margin-bottom:10px;padding-bottom:10px}' +
		'table.rnb-last-col-3{float:none !important;width:100% !important}table.rnb-col-2{float:none !important;width:100% !important;margin-bottom:10px;padding-bottom:10px}table.rnb-col-2-noborder-onright{float:none !important;width:100% !important;margin-bottom:10px;padding-bottom:10px}table.rnb-col-2-noborder-onleft{float:none !important;width:100% !important;margin-top:10px;padding-top:10px}table.rnb-last-col-2{float:none !important;width:100% !important}table.rnb-col-1{float:none !important;width:100% !important}img.rnb-col-3-img{width:100% !important}' +
		'img.rnb-col-2-img{width:100% !important}img.rnb-col-2-img-side-xs{width:100% !important}img.rnb-col-2-img-side-xl{width:100% !important}img.rnb-col-1-img{width:100% !important}img.rnb-header-img{width:100% !important;margin:0 auto}img.rnb-logo-img{width:100% !important}td.rnb-mbl-float-none{float:inherit !important}.img-block-center{text-align:center !important}.logo-img-center{float:inherit !important}.rnb-social-align{margin:0 auto !important;float:inherit !important}.rnb-social-center{display:inline-block}' +
		'.social-text-spacing{margin-bottom:0px !important;padding-bottom:0px !important}.social-text-spacing2{padding-top:15px !important}}</style><style type=\'text/css\'>table{border-spacing:0}table td{border-collapse:collapse}</style></head>'
  )
}

/**
 * @description Return all HTML text with all footer data, social links, address and the final tags from HTML.
 */
function getFooter () {
  const copyright = `© ${new Date(Date.now()).getFullYear()} Prática`
  return (
    '<tr><td valign=\'top\' align=\'center\'><div style=\'background-color: rgb(249, 250, 252); color: #888888;\'><table class=\'rnb-del-min-width rnb-tmpl-width\' style=\'min-width:590px;\' name=\'Layout_\' id=\'Layout_\' width=\'100%\' cellspacing=\'0\' cellpadding=\'0\' border=\'0\'><tbody><tr><td class=\'rnb-del-min-width\' style=\'min-width: 590px; background-color: rgb(249, 250, 252);\' valign=\'top\' bgcolor=\'#f9fafc\' align=\'center\'><table class=\'rnb-container\' width=\'590\' cellspacing=\'0\' cellpadding=\'0\' border=\'0\' align=\'center\'>' +
		'<tbody><tr><td style=\'font-size:1px; line-height:0px; mso-hide: all;\' height=\'20\'>&nbsp;</td></tr><tr><td class=\'rnb-container-padding\' style=\'font-size: 14px;; font-family: \'Roboto\', sans-serif; color: #888888;\' valign=\'top\' align=\'left\'><table class=\'rnb-columns-container\' width=\'100%\' cellspacing=\'0\' cellpadding=\'0\' border=\'0\'><tbody><tr><td class=\'rnb-force-col\' style=\'padding-right:20px; padding-left:20px; mso-padding-alt: 0 0 0 20px;\' valign=\'top\'>' +
		`<table valign='top' class='rnb-col-2 rnb-social-text-left' style='border-bottom:0;' width='264' cellspacing='0' cellpadding='0' border='0' align='left'><tbody><tr><td valign='top'><table class='rnb-btn-col-content' cellspacing='0' cellpadding='0' border='0' align='left'><tbody><tr><td style='font-size: 14px;; font-family: 'Roboto', sans-serif; color:#888888; line-height: 16px' class='rnb-text-center' valign='middle' align='left'><div><div> ${BASE_TEXT.company}<br> ${BASE_TEXT.address}<br>` +
		`<a href='#' style='text-decoration: underline; color: rgb(102, 102, 102);'><span class='__cf_email__'>${BASE_TEXT.emailProtected}</span></a></div></div></td></tr></tbody></table></td></tr></tbody></table></td><td ng-if='item.text.align=='left'' class='rnb-force-col rnb-social-width' style='mso-padding-alt: 0 20px 0 0; padding-right: 15px;' valign='top'><table valign='top' class='rnb-last-col-2' width='246' cellspacing='0' cellpadding='0' border='0' align='right'><tbody><tr><td valign='top'><table class='rnb-social-align' style='float: right;' cellspacing='0' cellpadding='0' border='0' align='right'>` +
		`<tbody><tr><td class='rnb-text-center' ng-init='width=setSocialIconsBlockWidth(item)' width='165' valign='middle' align='right'><div class='rnb-social-center'><table style='float:left; display: inline-block' cellspacing='0' cellpadding='0' border='0' align='left'><tbody><tr><td style='padding:0px 5px 5px 0px; mso-padding-alt: 0px 2px 5px 0px;' align='left'> <span style='color:#ffffff; font-weight:normal;'> <a target='_blank' href='${FACEBOOK.link}'>` +
		`<img alt='${FACEBOOK.alt}' style='vertical-align:top;' target='_blank' src='${FACEBOOK.logo}' vspace='0' hspace='0' border='0'></a></span></td></tr></tbody></table></div><div class='rnb-social-center'><table style='float:left; display: inline-block' cellspacing='0' cellpadding='0' border='0' align='left'><tbody><tr><td style='padding:0px 5px 5px 0px; mso-padding-alt: 0px 2px 5px 0px;' align='left'> <span style='color:#ffffff; font-weight:normal;'> <a target='_blank' href='${LINKEDIN.link}'>` +
		`<img alt='${LINKEDIN.alt}' style='vertical-align:top;' target='_blank' src='${LINKEDIN.logo}' vspace='0' hspace='0' border='0'></a></span></td></tr></tbody></table></div><div class='rnb-social-center'><table style='float:left; display: inline-block' cellspacing='0' cellpadding='0' border='0' align='left'><tbody><tr><td style='padding:0px 5px 5px 0px; mso-padding-alt: 0px 2px 5px 0px;' align='left'> <span style='color:#ffffff; font-weight:normal;'> <a target='_blank' href='${INSTAGRAM.link}'>` +
		`<img alt='${INSTAGRAM.alt}' style='vertical-align:top;' target='_blank' src='${INSTAGRAM.logo}' vspace='0' hspace='0' border='0'></a></span></td></tr></tbody></table></div><div class='rnb-social-center'><table style='float:left; display: inline-block' cellspacing='0' cellpadding='0' border='0' align='left'><tbody><tr><td style='padding:0px 5px 5px 0px; mso-padding-alt: 0px 2px 5px 0px;' align='left'> <span style='color:#ffffff; font-weight:normal;'> <a target='_blank' href='${YOUTUBE.link}'>` +
		`<img alt='${YOUTUBE.alt}' style='vertical-align:top;' target='_blank' src='${YOUTUBE.logo}' vspace='0' hspace='0' border='0'></a></span></td></tr></tbody></table></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style='font-size:1px; line-height:0px; mso-hide: all;' height='20'>&nbsp;</td></tr></tbody></table></td></tr></tbody></table></div></td></tr><tr><td valign='top' align='center'><div style='background-color: rgb(249, 250, 252);'>` +
		'<table class=\'rnb-del-min-width rnb-tmpl-width\' style=\'min-width:590px;\' name=\'Layout_3\' id=\'Layout_3\' width=\'100%\' cellspacing=\'0\' cellpadding=\'0\' border=\'0\'><tbody><tr><td class=\'rnb-del-min-width\' style=\'min-width:590px; background-color: #f9fafc; text-align: center;\' valign=\'top\' bgcolor=\'#f9fafc\' align=\'center\'><table class=\'rnb-container\' style=\'padding-right: 20px; padding-left: 20px; background-color: rgb(249, 250, 252);\' width=\'590\' cellspacing=\'0\' cellpadding=\'0\' border=\'0\' bgcolor=\'#f9fafc\' align=\'center\'>' +
		'<tbody><tr><td style=\'font-size:1px; line-height:0px; mso-hide: all;\' height=\'10\'>&nbsp;</td></tr><tr><td valign=\'top\' align=\'center\'><div style=\'background-color: rgb(249, 250, 252);\'><table class=\'rnb-del-min-width rnb-tmpl-width\' style=\'min-width:590px;\' name=\'Layout_4\' id=\'Layout_4\' width=\'100%\' cellspacing=\'0\' cellpadding=\'0\' border=\'0\'>' +
		'<tbody><tr><td class=\'rnb-del-min-width\' style=\'min-width:590px;\' valign=\'top\' align=\'center\'><table style=\'padding-right: 20px; padding-left: 20px; background-color: rgb(249, 250, 252);\' width=\'100%\' cellspacing=\'0\' cellpadding=\'0\' border=\'0\' bgcolor=\'#f9fafc\' align=\'center\'>' +
		`<tbody><tr><td style='font-size:1px; line-height:0px; mso-hide: all;' height='20'>&nbsp;</td></tr><tr><td style='font-size: 14px;; color:#888888; font-weight:normal; text-align:center; font-family: 'Roboto', sans-serif;'><div>${copyright}</div></td></tr><tr><td style='font-size:1px; line-height:0px; mso-hide: all;' height='20'>&nbsp;</td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></td></tr></tbody></table></body></html></tbody></table></td></tr></tbody></table></body></html>`
  )
}

module.exports.get = get
