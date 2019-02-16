import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

let items = {}

const storageMock = {
  set: (key, item) => {
    items[key] = item
  },
  get: (key) => items[key],
  clear: items = {}
}

window.localStorage = storageMock