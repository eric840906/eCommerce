export const debounce = (fn: () => void, timer: number) => {
  let timerID: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000) // 事先定義一個timerID變數
  return () => {
    if (timerID) { clearTimeout(timerID) }
    timerID = setTimeout(() => {
      fn()
    }, timer)
  }
}
