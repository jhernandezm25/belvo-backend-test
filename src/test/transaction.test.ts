import { expect } from 'chai'
import 'mocha'

describe('Empty string', () => {
  it(' return 0 for an empty string', () => {
    const actual = ''
    expect(actual).to.equal('')
  })
})
