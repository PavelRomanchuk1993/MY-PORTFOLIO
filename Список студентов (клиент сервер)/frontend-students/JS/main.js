const SERVER_URL = 'http://localhost:3000'
//База данных
async function getStudents() {
  let respons = await fetch (SERVER_URL + '/api/students')
  let data = await respons.json()
  return data;
}

async function serverDeleteStudent(id) {
  let response = await fetch(SERVER_URL + '/api/students/' + id, {
   method: "DELETE",
  })

  let data = await response.json()

  return data
 }
let students = await getStudents();

let sortColumnFlag = 'fio',
sortDirFlag = true

//СОЗДАНИЕ ЭЛЕМЕНТОВ
//Элементы фильтрации
const $filterForm = document.getElementById('filter-form'),
$fioFilterInp =  document.getElementById('filter-form__fio-inp'),
$faculteFilterInp =  document.getElementById('filter-form__faculte-inp'),
$startFilterInp =  document.getElementById('filter-form__start-inp'),
$finishFilterInp =  document.getElementById('filter-form__finish-inp')

//Создание таблицы
const $list = document.getElementById('list'),
$table = document.createElement('table'),
$tableHead = document.createElement('thead'),
$tableBody = document.createElement('tbody'),
//Получение формы для добавления новых студентов
$addStudent = document.getElementById('add-student'),
//Создание столбцов таблицы head
$tableHeadTr = document.createElement('tr'),
$tableHeadThFIO = document.createElement('th'),
$tableHeadThBirthDate = document.createElement('th'),
$tableHeadThStart = document.createElement('th'),
$tableHeadThFacult = document.createElement('th'),
$tableHeadThDelBtn = document.createElement('th');
//Добавление классов для таблицы
$table.classList.add('table', 'table-dark')
$tableBody.classList.add('table-body')
$tableHeadThFIO.classList.add('fio')
$tableHeadThBirthDate.classList.add('birth')
$tableHeadThStart.classList.add('start')
$tableHeadThFacult.classList.add('faculty')

//Добавление контента в столбцах head таблицы
$tableHeadThFIO.textContent = 'ФИО'
$tableHeadThBirthDate.textContent = 'Дата рождения'
$tableHeadThStart.textContent = 'Год обучения'
$tableHeadThFacult.textContent = 'Факультет'
//Добавление столбцов в стоку head
$tableHeadTr.append($tableHeadThFIO, $tableHeadThBirthDate, $tableHeadThStart, $tableHeadThFacult)
//Добавление тела и головы в саму таблицу
$tableHead.append($tableHeadTr)
$table.append($tableHead, $tableBody)
$list.append($table)

//Приведение даты рождения к нормальному виду
function formatDate(date) {
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  let yy = date.getFullYear();
  if (yy < 10) yy = '0' + yy;
  return yy + '.' + mm + '.' + dd;
}

const today = new Date();
//Функция расчета возраста
function age(ageStud) {
    let age = today.getFullYear() - new Date(ageStud).getFullYear();
    let m = today.getMonth() - new Date(ageStud).getMonth();
    if (m < 0 || (m === 0 && today.getDate() < new Date(ageStud).getDate())) {
        age--;
    }
    return age;
    }

//Создание одного студента
function createStudentTr(oneStudent) {
//Создаем TR студента
const $studentTr = document.createElement('tr'),
$studentThFIO = document.createElement('th'),
$studentThBirthDate = document.createElement('th'),
$studentThStart = document.createElement('th'),
$studentThFacult = document.createElement('th'),
$studentThDelit = document.createElement('th'),
$BTN = document.createElement('button');
//Добавление контента в строке со студентом
$studentThFIO.textContent = oneStudent.fio
$studentThBirthDate.textContent = oneStudent.birthday
$studentThStart.textContent = oneStudent.course
$studentThFacult.textContent = oneStudent.faculty
$BTN.textContent = 'Удалить'
//Добавление класса для кнопки удаления
$BTN.classList.add('btn', 'btn-primary')
//Удаление студента
$BTN.addEventListener('click', async function() {
  await serverDeleteStudent(oneStudent.id)
    $studentTr.remove()
})
//Добавление столбцов в стоку со студентом
$studentTr.append($studentThFIO, $studentThBirthDate, $studentThStart, $studentThFacult, $studentThDelit)
$studentThDelit.append($BTN)
//Добавление TR студента в тело таблицы
$tableBody.append($studentTr)
return $studentTr
}

//ФУНКЦИЯ ФИЛЬТРАЦИИ
function filter(students, prop, value) {
    let result = [],
    studCopy = [...students]
    for (const item of studCopy) {
        if (String(item[prop]).includes(value) == true) result.push(item)
    }
    return result
}

//РЕНДЕР (ОТРИСОВКА) - при фильтрации
function renderFilt() {
    const list = document.querySelector('.table-body')
    list.innerHTML = ''

    const fioVal = document.getElementById('filter-form__fio-inp').value,
     facultiVal = document.getElementById('filter-form__faculte-inp').value,
     startVal = document.getElementById('filter-form__start-inp').value,
     finishVal = document.getElementById('filter-form__finish-inp').value

    let newArr = [...students]
    if(fioVal !== '') newArr = filter(newArr, 'fio', fioVal)
    if(facultiVal !== '') newArr = filter(newArr, 'faculty', facultiVal)
    if(startVal !== '') newArr = filter(newArr, 'start', startVal)
    if(finishVal !== '') newArr = filter(newArr, 'finish', finishVal)

    for (const student of newArr) {
        const naw = today.getFullYear() - student.studyStart

        const $trTabl = document.createElement('tr'),
              $tdFIO = document.createElement('td'),
              $tdBirth = document.createElement('td'),
              $tdStart = document.createElement('td'),
              $tdFac = document.createElement('td'),
              $thDelit = document.createElement('th'),
              $BTN = document.createElement('button');

              $tdFIO.textContent = student.surname + ' ' + student.name + ' ' + student.lastname;
              $tdBirth.textContent = formatDate(new Date(student.birthday)) + ' (' + age(new Date(student.birthday)) + ' лет)';
              student.finish = Number(student.studyStart) + 4;
              $tdFac.textContent = student.faculty;
              $tdStart.textContent = (naw <= 4 ) ? student.studyStart + ' - ' + student.finish + ' (' + naw + ' курс)' : student.studyStart + ' - ' + student.finish + ' (' + 'Закончил)';
              $BTN.textContent = 'Удалить';
              $BTN.classList.add('btn', 'btn-primary')
              //удаление студента при фильтрации
             $BTN.addEventListener('click', async function() {
              await serverDeleteStudent(student.id)
                  $trTabl.remove();
              })

        list.append($trTabl)
          $trTabl.append($tdFIO, $tdBirth, $tdStart, $tdFac, $thDelit)
          $thDelit.append($BTN)
    }
  }

  document.getElementById('filter-form').addEventListener('submit', function(event){
    event.preventDefault()
    renderFilt(students)
  })
  renderFilt(students)

//РЕНДЕР (ОТРИСОВКА) - ПЕРЕНОС СПИСКА МАССИВА В ТЕЛО ТАБЛИЦЫ
function render(arrData) {
    $tableBody.innerHTML = '';
    let copyStudents = [...arrData]
//Подготовка
const today = new Date();
for (const oneStudent of copyStudents) {
const naw = today.getFullYear() - oneStudent.studyStart

//Добавление новых свойств студентов
  oneStudent.fio = oneStudent.surname + ' ' + oneStudent.name + ' ' + oneStudent.lastname;
  oneStudent.finish = Number(oneStudent.studyStart) + 4;
  oneStudent.birthday = formatDate(new Date(oneStudent.birthday)) + ' (' + age(new Date(oneStudent.birthday))  + ' лет)';
  oneStudent.course = (naw <= 4 ) ? oneStudent.studyStart + ' - ' + oneStudent.finish + ' (' + naw + ' курс)' : oneStudent.studyStart + ' - ' + oneStudent.finish + ' (' + 'Закончил)';
}

//СОРТИРОВКА МАССИВА
copyStudents = copyStudents.sort(function(a, b) {
let sort = a[sortColumnFlag] < b[sortColumnFlag]
if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
if(sort) return -1
})

//Отрисовка
//Цикл для отрисовки студентов
for (const oneStudent of copyStudents) {
    const $newTR = createStudentTr(oneStudent)
//Добавление TR студента в тело таблицы
$tableBody.append($newTR)
}
}
render(students)

//ВАЛИДАЦИЯ
function validation(form) {
    function removeError(input) {
        const parent = input.parentNode;

        if(parent.classList.contains('error')){
            parent.querySelector('.error-lable').remove()
            parent.classList.remove('error')
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const errorLable = document.createElement('label')
        errorLable.classList.add('error-lable')
        errorLable.textContent = text

        parent.classList.add('error')

        parent.append(errorLable)
      }
      let result = true;
      const allInputs = form.querySelectorAll('input');
      for (const input of allInputs) {

        removeError(input)

  if (input.type === "number") {
    removeError(input)
    if (Number(input.value) < 2000) {
    removeError(input)
    createError(input, "Введите дату начиная с 2000 года")
    result = false
    } else if (Number(input.value) > new Date().getFullYear()) {
    removeError(input)
    createError(input, "Введите корректную дату")
    result = false
    }
  }

  if (input.type === "date") {
    removeError(input)
    const date = input.value.split('-');
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const fullDate = new Date(date[0], date[1]-1, date[2]);
    const year = date[0];

    if (year < 1900) {
      removeError(input)
      createError(input, "Выберете дату начиная с 01.01.1900 года")
      result = false
    } else if ((fullDate > today) || isNaN(fullDate))	 {
      removeError(input)
      createError(input, "Введите корректную дату")
      result = false
    }
  }

  if (input.dataset.minLength) {

    if (input.value.length < input.dataset.minLength) {
      removeError(input)
      createError(input, `Минимальное количество символов: ${input.dataset.minLength}`)
      result = false
    }
  }

  if(input.value.trim() =="") {
    removeError(input)
    createError(input, 'Поле не заполнено!')
    result = false
  }
}
return result
}

//ДОБАВЛЕНИЕ СТУЕНТОВ
$addStudent.addEventListener('submit', async function(event) {

//Получение элементов из формы с добавлением студентов
    const $surnameInp = document.getElementById('input-surname'),
    $nameInp = document.getElementById('input-name'),
    $lastnameInp = document.getElementById('input-lastname'),
    $trainingStartInp = document.getElementById('input-trainingStart'),
    $birthDateInp = document.getElementById('input-birthDate'),
    $facultyInp = document.getElementById('input-faculty')

    event.preventDefault();
    if(validation(this) == true) {
    alert('Форма проверена успешно!')

let respons = await fetch(SERVER_URL + '/api/students', {
  method: 'POST',
  body: JSON.stringify({
    name: $nameInp.value.trim(),
    surname: $surnameInp.value.trim(),
    lastname: $lastnameInp.value.trim(),
    birthday: $birthDateInp.valueAsDate,
    studyStart: parseInt ($trainingStartInp.value.trim()),
    faculty: $facultyInp.value.trim()
  }),
  headers: {
    'Content-Type': 'application/json',
  }
});
let studentsEl = await respons.json();
}
  render(students)
})

// Клики сортировки
$tableHeadThFIO.addEventListener('click', function() {
    sortColumnFlag = 'fio'
    sortDirFlag = !sortDirFlag
    render(students)
})
$tableHeadThBirthDate.addEventListener('click', function() {
    sortColumnFlag = 'birthday'
    sortDirFlag = !sortDirFlag
    render(students)
})
$tableHeadThStart.addEventListener('click', function() {
    sortColumnFlag = 'course'
    sortDirFlag = !sortDirFlag
    render(students)
})
$tableHeadThFacult.addEventListener('click', function() {
    sortColumnFlag = 'faculty'
    sortDirFlag = !sortDirFlag
    render(students)
})








