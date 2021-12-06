
let a = ''
let b = ''
let sign = ''
let finish = false

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const action = ['-', '+', 'x', '/']

const out = document.querySelector('.calc-screen p')
let calculation = document.querySelector('.calc-screen span')

function clearAll() {
  a = ''
  b = ''
  sign = ''
  finish = false
  out.textContent = 0
  calculation.textContent = ''
}
const ac = document.querySelector('.ac')
ac.addEventListener('click', () => {
  clearAll()
})

const btn = document.querySelector('.buttons')

btn.addEventListener('click', (event) => {
  if (!event.target.classList.contains('btn')) return
  if (event.target.classList.contains('ac')) return
  if (event.target.classList.contains('dot') && a.indexOf('.') > -1 && b === '') return
  if (event.target.classList.contains('dot') && b.indexOf('.') > -1 && a !== '') return

  out.textContent = ''
  const key = event.target.textContent

  if (a === '.' || b === '.') {
    a = ''
    b = ''
    sign = ''
    calculation.textContent = ''
    out.textContent = 'Ошибка'
  }

  if (digit.includes(key)) {
    if (b === '' && sign === '') {
      a += key

      if (a.length > 9) {
        out.classList.add('big-number')
        calculation.classList.add('big-number')
        return alert('Калькулятор может работать с числами не больше 999 999 999')
      }
      out.textContent = `= ${a}`
    } else if (a !== '' && b !== '' && finish) {
      b = key
      finish = false
      out.textContent = b
    } else {
      b += key
      if (b.length > 10) {
        out.classList.add('big-number')
        calculation.classList.add('big-number')
        return alert('Калькулятор может работать с числами не больше 999 999 999')
      }
      out.textContent = b
    }
    calculation.textContent = `${a} ${sign} ${b}`
    return
  }

  if (action.includes(key)) {
    sign = key
    out.textContent = `= ${a}`
    calculation.textContent = `${a} ${sign}`
  }
  if (key === '+-') {
    a = -a
    out.textContent = a
  }
  if (key === '%') {
    if (a !== '' && sign === '-' || sign === '+') {
      calculation.textContent = `${a} ${sign} ${b}%`
      b = (a / 100) * b
      return
    } else if (b !== '' && sign === 'x' || sign === '/') {
      calculation.textContent = `${a} ${sign} ${b}%`
      b = b / 100
      return
    } else {
      a = a / 100
      out.textContent = a
    }
  }

  if (key === '=') {
    if (b === '') b = a
    switch (sign) {
      case "+":
        a = (+a) + (+b)
        break
      case "-":
        a = a - b
        break
      case "x":
        a = a * b
        a = (+a).toFixed(1)
        break
      case "/":
        if (b === '0') {
          a = ''
          b = ''
          sign = ''
          calculation.textContent = ''
          out.textContent = 'Ошибка'
          return
        } else if (a === '') {
          out.textContent = `= 0`
          a = ''
          b = ''
          sign = ''
          return
        }

        a = a / b
        if (a.toString().length > 7) {
          a = (+a).toFixed(2)
        }
        break
    }
    finish = true

    if (a.toString().length > 9) {
      a = (+a).toExponential(2)
    }
    out.textContent = `= ${a}`
  }
})
