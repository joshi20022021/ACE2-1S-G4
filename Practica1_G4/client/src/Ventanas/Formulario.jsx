import '../App.css';

const styles = {
  title: {
    fontSize: "50px",
    fontWeight: "bold",
    marginBottom: "50px",
    color: "#fff",
    textShadow: "2px 2px 5px rgba(255, 255, 255, 0.95)",
    textAlign: "center",
  },
  form: {
    width: "90%",
    maxWidth: "1200px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    position: "relative", 
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "15px",
    color: "#fff",
    fontSize: "18px",
    display: "flex",
    fontWeight: "500",
  },
  input: {
    width: "65%",
    marginBottom: "15px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    backgroundColor: 'rgba(5, 5, 5, 0.94)',
    color: 'rgba(255, 255, 255, 0.94)',
  },
  textarea: {
    width: "90%",
    marginBottom: "25px",
    padding: "15px",
    fontSize: "16px",
    borderRadius: "15px",
    border: "1px solid #ddd",
    backgroundColor: 'rgba(5, 5, 5, 0.94)',
    color: 'rgba(255, 255, 255, 0.94)',
    height: "60px",
  },
  select: {
    width: "74%",
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    backgroundColor: 'rgba(5, 5, 5, 0.94)',
    color: 'rgba(255, 255, 255, 0.94)',
  },
  buttonContainer: {
    position: "absolute",
    top: "60px", 
    left: "1110px", 
  },
  button: {
    padding: "15px 30px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    borderRadius: "50px",
    backgroundColor: "#482828",
    color: "#fff",
    transition: "all 0.3s ease",
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
  },
  checkbox: {
    width: "150%",
    marginBottom: "15px",
    display: "flex",
    color: "#fff",
    fontSize: "16px",
  },
};

const Formulario = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <h2 style={styles.title}>F O R M U L A R I O </h2>

      <div style={{ ...styles.buttonContainer, top: "60px" }}> {}
        <button type="submit" style={styles.button}>
          Confirmar Diagnostico
        </button>
      </div>

      <form style={styles.form}>
        {}
        <div style={{ gridColumn: "1 / 2" }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombres</label>
            <input type="text" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Diagnostico Principal</label>
            <input type="text" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Edad</label>
            <input type="number" min="0" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Expediente Médico</label>
            <input type="text" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fecha de Ingreso</label>
            <input type="date" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Sexo</label>
            <select required style={styles.select}>
              <option value="">Seleccione...</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tipo de Sangre</label>
            <select required style={styles.select}>
              <option value="">Seleccione...</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        {}
        <div style={{ gridColumn: "2 / 3" }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Síntomas Reportados</label>
            <textarea required style={styles.textarea}></textarea>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Antecedentes Médicos</label>
            <textarea required style={styles.textarea}></textarea>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Plan de tratamiento inicial</label>
            <textarea required style={styles.textarea}></textarea>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Alergias</label>
            <textarea required style={styles.textarea}></textarea>
          </div>
        </div>

        {}
        <div style={{ gridColumn: "3 / 4" }}>
          <div style={styles.checkboxGroup}>
            <label style={styles.label}>Condiciones Preexistentes</label>
            <div style={styles.checkbox}>
              <input type="checkbox" id="diabetes" />
              <label htmlFor="diabetes" style={{ marginLeft: "10px" }}>Diabetes</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="hipertension" />
              <label htmlFor="hipertension" style={{ marginLeft: "10px" }}>Hipertensión</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="asma" />
              <label htmlFor="asma" style={{ marginLeft: "10px" }}>Asma</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="hipotiroidismo" />
              <label htmlFor="hipotiroidismo" style={{ marginLeft: "10px" }}>Hipotiroidismo</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="hipertiroidismo" />
              <label htmlFor="hipertiroidismo" style={{ marginLeft: "10px" }}>Hipertiroidismo</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="cardiovascular" />
              <label htmlFor="cardiovascular" style={{ marginLeft: "10px" }}>Enfermedad Cardiovascular</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="insuficiencia_renal" />
              <label htmlFor="insuficiencia_renal" style={{ marginLeft: "10px" }}>Insuficiencia Renal</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="epilepsia" />
              <label htmlFor="epilepsia" style={{ marginLeft: "10px" }}>Epilepsia</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="artritis" />
              <label htmlFor="artritis" style={{ marginLeft: "10px" }}>Artritis</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="epoc" />
              <label htmlFor="epoc" style={{ marginLeft: "10px" }}>Enfermedad Pulmonar Obstructiva Crónica</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="autoimmune" />
              <label htmlFor="autoimmune" style={{ marginLeft: "10px" }}>Enfermedades Autoinmunes</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="obesidad" />
              <label htmlFor="obesidad" style={{ marginLeft: "10px" }}>Obesidad</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="acv" />
              <label htmlFor="acv" style={{ marginLeft: "10px" }}>Accidente Cerebrovascular</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="trastornos_psiquiatricos" />
              <label htmlFor="trastornos_psiquiatricos" style={{ marginLeft: "10px" }}>Trastornos Psiquiátricos (Depresión, Ansiedad)</label>
            </div>
            <div style={styles.checkbox}>
              <input type="checkbox" id="trastornos_digestivos" />
              <label htmlFor="trastornos_digestivos" style={{ marginLeft: "10px" }}>Trastornos Digestivos (Gastritis, Ulceras)</label>
            </div>
            
          </div>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
