import pt from './pt.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import ru from './ru.json'
import pl from './pl.json'
import de from './de.json'
import zh from './zh.json'
import el from './el.json'

export const translate = (key: string, lang: string): string => {
  let langData: {[key: string]: string} = {}
  switch (lang) {
    case 'PT':
      langData = pt
      break
    case 'EN':
      langData = en
      break
    case 'ES':
      langData = es
      break
    case 'FR':
      langData = fr
      break
    case 'RU':
      langData = ru
      break
    case 'PL':
      langData = pl
      break
    case 'DE':
      langData = de
      break
    case 'ZH':
      langData = zh
      break
    case 'EL':
      langData = el
      break
    default:
      langData = en
      break
  }
  return langData[key]
}
