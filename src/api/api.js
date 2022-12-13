import axios from "axios";

const ipExterna = "52.116.193.109";
const ipInterna = "10.240.64.8";
const localhost = "localhost"


//Obtiene las tareas de un grupo
export async function getTasksGroup() {
  try {
    const response = await axios.get(
      `http://${localhost}:8080/engine-rest/task?candidateGroup=analista`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Trae las variables de una tarea
export async function getVariablesTask(taskId) {
  try {
    const response = await axios.get(
      `http://${localhost}:8080/engine-rest/task/${taskId}/variables?deserializeValues=true`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

//verifica si un usuario existe en camunda y devuelve sus datos
export const verificarUser = async (user, pass) => {
  try {
    const response = await axios.post(
      `http://${localhost}:8080/engine-rest/identity/verify`,
      {
        username: user,
        password: pass,
      }
    );
    return response.data.authenticated;
  } catch (error) {
    console.error(error);
  }
};

//Obtiene los grupos de un usuario
export const getGroupsByUser = async (user) => {
  try {
    const response = await axios.get(
      `http://${localhost}:8080/engine-rest/identity/groups?userId=${user}`
    );
    return response.data.groups;
  } catch (error) {
    console.error(error);
  }
};

//Inicia el Proceso y devuelve el id
export const startProcess = async (datos) => {
  try {
    const response = await axios.post(
      `http://${localhost}:8080/engine-rest/process-definition/key/analisis/start`,

      datos
    );
    return response.data.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//busca una tarea por el id del proceso, y devuelve el id de la tarea
export const getTaskByIdProcessInstance = async (isProcessInstance) => {
  try {
    const response = await axios.get(
      `http://${localhost}:8080/engine-rest/task?processInstanceId=${isProcessInstance}`
    );
    return response.data[0].id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Completar la tarea por id de la misma
export const completeTaskById = async (idTask, data = {}) => {
  try {
    const response = await axios.post(
      `http://${localhost}:8080/engine-rest/task/${idTask}/complete`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Traer analisis por fecha
export const getProccessByDates = async (fechaInicio, fechaFin) => {
  try {
    const response = await axios.post(
      `http://${localhost}:8080/engine-rest/history/process-instance`,
      {
        finishedAfter: fechaInicio,
        finishedBefore: fechaFin,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Traer variables
export async function getHistoryVarableInstance(proccessId) {
  try {
    const response = await axios.get(
      `http://${localhost}:8080/engine-rest/history/variable-instance?processInstanceId=${proccessId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

////////////////////////////  API NODE  //////////////////////////////

export const getClientes = async () => {
  try {
    const { data } = await axios.get(`http://${localhost}:4000/clientes`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addClient = async (data = {}) => {
  try {
    const response = await axios.post(`http://${localhost}:4000/addCliente`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const editClient = async (data = {}) => {
  try {
    const response = await axios.post(
      `http://${localhost}:4000/editCliente`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.post(`http://${localhost}:4000/deleteCliente`, {
      id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
