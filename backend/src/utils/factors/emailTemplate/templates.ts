/* eslint-disable */
'use strict'
import { translate } from '../../../language'
const baseTemplate = require('./baseTemplate')
const ADDEQUIP = { logo: 'https://praticasharedfiles.s3.sa-east-1.amazonaws.com/images/email_templates/add-equip.png', alt: 'adicionar equipamento' }

/**
 * @description Return all base HTML content for a recovery password.
 * @param {string} userName User name that will receive this message
 * @param {string} url_access Url access to recovery password getAccountActivationTemplate
 */
export function getAccountActivationTemplate(name: string, email: string, id: number, code: string, lang: string) {
  const contentHtml =
    `<div>${translate('create_user.title', lang)}, ${name},<div><div>&nbsp;</div>` +
    `<div>${translate('create_user.content1', lang)}</div><div>&nbsp;</div>` +
    '<div><span style=\'background-color: transparent;\'>' +
    `<strong><a target='_blank' style='color: #004992; text-decoration: none;' href="http://18.231.116.149:80/activate?email=${email}&code=${code}&id=${id}">${translate('create_user.link', lang)}</a></strong></span>${translate('create_user.content2', lang)}<div>&nbsp;</div></div>` +
    `<div>${translate('create_user.content5', lang)}</div><div>&nbsp;</div>` +
    `<div>&nbsp;</div><div>&nbsp;</div><div>${translate('create_user.content3', lang)}</div>` +
    `<div>${translate('create_user.content4', lang)}</div></div></div>`

  return baseTemplate.get(contentHtml, translate('create_user.subject', lang))
}

/**
 * @description Return all base HTML content for an account activation.
 * @param {string} userName User name that will receive this message
 * @param {string} url_access Url access to recovery password
 */
export function getRecoverPasswordTemplate(name: string, email: string, id: number, code: string, lang: string) {
  const contentHtml =
    `<div>${translate('reset_user.title', lang)}, ${name},<div><div>&nbsp;</div>` +
    `<div>${translate('reset_user.content1', lang)}</div><div>&nbsp;</div>` +
    `<div>${translate('reset_user.content5', lang)}<strong><a target='_blank' style='color: #3c4858; text-decoration: none;' href="http://18.231.116.149:80/resetPassword?email=${email}&code=${code}&id=${id}">${translate('reset_user.link', lang)}</a></strong></span></div><div>&nbsp;</div>` +
    `<div>${translate('reset_user.content2', lang)}</div><div>&nbsp;</div>` +
    `<div>${translate('create_user.content5', lang)}</div><div>&nbsp;</div>` +
    `<div>&nbsp;</div><div>&nbsp;</div><div>${translate('create_user.content3', lang)}</div>` +
    `<div>${translate('create_user.content4', lang)}</div></div></div>`

  return baseTemplate.get(contentHtml, translate('reset_user.subject', lang))
}

/**
 * @description Return all base HTML content for an user convite.
 * @param {string} userName User name that will receive this message
 * @param {string} url_access Url access to user convite
 */
export function getUserConviteTemplate(name: string, email: string, id: number, code: string, lang: string) {
  const contentHtml =
    `<div>${translate('create_user.title', lang)}, ${name},<div><div>&nbsp;</div>` +
    `<div>${translate('create_user.content1', lang)}</div><div>&nbsp;</div>` +
    '<div><span style=\'background-color: transparent;\'>' +
    `<strong><a target='_blank' style='color: #004992; text-decoration: none;' href="http://localhost:3000/resetPassword?email=${email}&code=${code}&id=${id}">${translate('create_user.link', lang)}</a></strong></span>${translate('create_user.content2', lang)}<div>&nbsp;</div></div>` +
    `<div>${translate('create_user.content5', lang)}</div><div>&nbsp;</div>` +
    `<div>&nbsp;</div><div>&nbsp;</div><div>${translate('create_user.content3', lang)}</div>` +
    `<div>${translate('create_user.content4', lang)}</div></div></div>`

  return baseTemplate.get(contentHtml, translate('create_user.subject2', lang))
}

/**
 * @description Return all base HTML content for an user convite.
 * @param {string} admName Adm name that will receive this message
 * @param {string} userName User requesting access
 * @param {string} userEmail User email that will be accepted or declined
 * @param {number} userId User id
 * @param {string} lang Admin language
 */
export function getAdmAcceptanceTemplate(admName: string, userName: string, userEmail: string, userId: number, code: string, lang: string) {
  const contentHtml =
    `<div>${translate('create_user.title', lang)}, ${admName}!<div><div>&nbsp;</div>` +
    `<div>${translate('create_user.content7', lang)} ${userName}, ${userEmail}, ${translate('create_user.content8', lang)} ${userName} ${translate('create_user.content9', lang)}</div><div>&nbsp;</div>` +
    `<strong><a target='_blank' style='color: #3c4858; text-decoration: none;' href="http://localhost:3000/activate?email=${userEmail}&code=${code}&id=${userId}">${translate('create_user.link1', lang)}</a></strong>` + 
    `<div>${translate('create_user.content10', lang)}</div><div>&nbsp;</div>` +
    `<strong><a target='_blank' style='color: #3c4858; text-decoration: none;'>${translate('create_user.link2', lang)}</a></strong>` + 
    `<div>${translate('create_user.content5', lang)}</div><div>&nbsp;</div>` +
    `<div>&nbsp;</div><div>&nbsp;</div><div>${translate('create_user.content3', lang)}</div>` +
    `<div>${translate('create_user.content4', lang)}</div></div></div>`

  return baseTemplate.get(contentHtml, translate('create_user.subject3', lang))
}

/**
 * @description Return all base HTML content for an user convite.
 * @param {string} companyName Company name 
 * @param {string} userName User requesting access
 * @param {string} userEmail User email that will be accepted or declined
 * @param {number} userId User id
 * @param {string} lang User language
 */
export function getUserAcceptanceTemplate(companyName: string, userName: string, userEmail: string, userId: number, code: string, lang: string) {
  const contentHtml =
    `<div>${translate('create_user.title', lang)}, ${userName}!<div><div>&nbsp;</div>` +
    `<div>${translate('create_user.content11', lang)} ${companyName} ${translate('create_user.content12', lang)}</div><div>&nbsp;</div>` +     
    `<div>${translate('create_user.content5', lang)}</div><div>&nbsp;</div>` +
    `<div>&nbsp;</div><div>&nbsp;</div><div>${translate('create_user.content3', lang)}</div>` +
    `<div>${translate('create_user.content4', lang)}</div></div></div>`

  return baseTemplate.get(contentHtml, translate('create_user.subject3', lang))
}