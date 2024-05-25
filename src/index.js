import pool from "../config/db.js";

const argumento = process.argv.slice(2);
const type = argumento[0];

const createStudent = async () => {
  try {
    const text =
      "INSERT INTO estudiantes(nombre, rut, curso, nivel) VALUES($1, $2, $3, $4) RETURNING *";
    const values = [argumento[1], argumento[2], argumento[3], argumento[4]];
    const res = await pool.query(text, values);
    console.log("Estudiante creado con éxito", res.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const getStudents = async () => {
  try {
    const text = "SELECT * FROM estudiantes";
    const res = await pool.query(text);
    console.log("Estudiantes:", res.rows);
  } catch (error) {
    console.log(error);
  }
};

const editStudent = async () => {
  try {
    const text =
      "UPDATE estudiantes SET nombre = $1, rut = $2, curso = $3, nivel = $4 WHERE rut = $2 RETURNING *";
    const values = [argumento[1], argumento[2], argumento[3], argumento[4]];
    const res = await pool.query(text, values);
    console.log("Estudiante editado con éxito", res.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const getRut = async () => {
  try {
    const text = "SELECT * FROM estudiantes WHERE rut = $1";
    const values = [argumento[1]];
    const res = await pool.query(text, values);
    console.log("Estudiante:", res.rows);
  } catch (error) {
    console.log(error);
  }
};

const deleteStudent = async () => {
  try {
    const text = "DELETE FROM estudiantes WHERE rut = $1 RETURNING *";
    const values = [argumento[1]];
    const res = await pool.query(text, values);
    console.log("Estudiante eliminado con éxito", res.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

switch (type) {
  case "nuevo":
    createStudent();
    break;
  case "consulta":
    getStudents();
    break;
  case "editar":
    editStudent();
    break;
  case "rut":
    getRut();
    break;
  case "eliminar":
    deleteStudent();
    break;
  default:
    console.log("Comando inválido");
    break;
}
