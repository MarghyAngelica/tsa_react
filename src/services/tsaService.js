import axios from 'axios';

const API_URL = 'http://127.0.0.1:3001/';

/*
********************************
*      Gestion de cuentas      *
********************************
*/

const createAccount = async (dataAccount) => {
  try {
    const response = await axios.post(API_URL + 'logic/crearCuenta', dataAccount, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Respuestaaaa crear account:::', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const updateAccount = async (dataAccount) => {
  try {
    const response = await axios.post(API_URL + 'logic/updateCuentas', dataAccount, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const changeStatusAccount = async (data_status) => {
  try {
    const response = await axios.post(API_URL + 'logic/updateCuentasStatus', data_status, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const getAccounts = async () => {
  try {
    const response = await axios.post(API_URL + 'logic/listarCuentas', {}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

/*
********************************
*      Gestion de planes       *
********************************
*/

const createPlan = async (dataPlan) => {
  try {
    const response = await axios.post(API_URL + 'logic/crearPlan', dataPlan, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Respuestaaaa crear account:::', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const getPlans = async () => {
  try {
    const response = await axios.post(API_URL + 'logic/listarPlan', {}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const changeStatusPlan = async (data_plan) => {
  try {
    const response = await axios.post(API_URL + 'logic/updatePlan', data_plan, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default {
  createAccount,
  updateAccount,
  changeStatusAccount,
  getAccounts,

  /* Planes*/
  createPlan,
  getPlans,
  changeStatusPlan
};