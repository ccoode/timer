import Timer from '../Timer'

jest.useFakeTimers()

let timer = null
let callback = null

beforeEach(() => {
  timer = new Timer({ timeout: 2220 })
  callback = jest.fn()
  timer.watch(callback)
  expect(callback).not.toBeCalled()
  timer.start()
  expect(callback).toBeCalled()
})

describe('timer tick regularly', () => {
  test('timer tick', () => {
    jest.runTimersToTime(3000)
    expect(callback.mock.calls).toEqual([
      [{ timeout: 2220, running: true, onStart: true }],
      [{ timeout: 2000, running: true, onStart: false }],
      [{ timeout: 1000, running: true, onStart: false }],
      [{ timeout: 0, running: false, onStart: false }],
    ])
    expect(setTimeout.mock.calls.length).toBe(3)
    expect(setTimeout.mock.calls[0][1]).toBe(220)
    expect(setTimeout.mock.calls[1][1]).toBe(1000)
    expect(setTimeout.mock.calls[2][1]).toBe(1000)
  })
})

describe('timer method', () => {
  afterEach(() => {
    expect(callback.mock.calls[0][0]).toEqual({
      timeout: 2220,
      running: true,
      onStart: true,
    })
    expect(clearTimeout).toBeCalled()
    expect(callback.mock.calls[1][0].running).toBeFalsy()
    expect(callback.mock.calls[1][0].onStart).toBeFalsy()
  })

  test('timer pause', () => {
    timer.pause()
    expect(callback.mock.calls[1][0].timeout).toBeLessThan(2220)
  })

  test('timer reset', () => {
    timer.stop()
    expect(callback.mock.calls[1][0].timeout).toBe(0)
  })

  test('timer reset', () => {
    timer.reset()
    expect(callback.mock.calls[1][0].timeout).toBe(2220)
  })
})
