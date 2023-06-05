import { CreateCodeRandom } from '../../data/protocols/db/user/create-code-random-repository'

export class CodeRandom implements CreateCodeRandom {
  async codeRandom (): Promise<string> {
    const chars = '123456789ABCDEFGHJKMNPQRSTUVWXTZabcdefghkmnpqrstuvwxyz'
    const stringLength = 8 - 2
    let randomstring = ''
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      randomstring += chars.substring(rnum, rnum + 1)
    }
    return randomstring
  }
}
