var students_data = [];

const ID_FULL_NAME = "full_name_input";
const ID_MATH = "math_mark_input";
const ID_PHYS = "physical_mark_input";
const ID_TABLE = "data_table";
const ID_CHEM = "chem_mark_input";
const NAME_ELEMENT = document.getElementById(ID_FULL_NAME);
const MATH_ELEMENT = document.getElementById(ID_MATH);
const PHYS_ELEMENT = document.getElementById(ID_PHYS);
const CHEM_ELEMENT = document.getElementById(ID_CHEM);
const TABLE_ELEMENT = document.getElementById(ID_TABLE);
const STUDENT_TYPE = {GOOD: "Học Sinh Giỏi", ELSE: ""}
const TABLE_COLUMN = ["STT", "Họ Và Tên", "Toán", "Lý", "Hóa", "Trung Bình"]

function getFormData() {
    let student = {num: 0, name: "", math: 0, phys: 0, chem: 0, avr: "Chưa Cập Nhật", is_good_student: "Chưa Cập Nhật"};
    student.name = NAME_ELEMENT.value
    student.math = parseFloat(MATH_ELEMENT.value)
    student.phys = parseFloat(PHYS_ELEMENT.value)
    student.chem = parseFloat(CHEM_ELEMENT.value)

    // Validate

    // Calculate avr
    // student.avr = calculateAvr(student)

    // Envalue student
    // student.is_good_student = envalueStudent(student)

    // Save data
    saveData(student)
    render_table()
    console.log(student)
    clear_input()
}

function clear_input(){
    NAME_ELEMENT.value = ""
    MATH_ELEMENT.value = ""
    PHYS_ELEMENT.value = ""
    CHEM_ELEMENT.value = ""
}

function calculateAvr(student) {
    return (student.math + student.phys + student.chem) / 3
}

function envalueStudent(student) {
    return (student.avr >= 8) ? STUDENT_TYPE.GOOD : STUDENT_TYPE.ELSE
}

function saveData(student) {
    student.num = students_data.length + 1
    students_data.push(student)
}

function render_table() {
    let table = TABLE_ELEMENT;
    // clean old data
    table.innerHTML = ""

    // generate header
    generate_table_header();

    // load data
    for (let i = 0; i <= students_data.length; i++) {
        let row = table.insertRow(i + 1);
        fill_row_student(row, students_data[i])
    }
}

function generate_table_header() {
    let table = TABLE_ELEMENT;
    let row = table.insertRow(0);

    for (let i = 0; i < TABLE_COLUMN.length; i++) {
        let th = document.createElement('th');
        th.innerHTML = TABLE_COLUMN[i]
        row.appendChild(th)
    }
}

function fill_row_student(row, student) {
    Object.keys(student).forEach((key, index) => {
        if (key !== "is_good_student") {
            let cell = row.insertCell(index)
            cell.innerHTML = student[key]
        }
    })
}

function cal_avr_table() {
    students_data.forEach((student, index) => {
        student.avr = calculateAvr(student)
    })
    render_table();
}