export const Helper = {
  specialization: `${process.env.REACT_APP_ORIGIN}api/v1/specializations`,
};

export const Doctor = {
  registerDoctor: `${process.env.REACT_APP_ORIGIN}api/v1/doctors`,
  getInfo: `${process.env.REACT_APP_ORIGIN}api/v1/doctors/fetch-profile`,
  updateInfo: `${process.env.REACT_APP_ORIGIN}api/v1/doctors/update-profile`,
  activateCertificate: (id) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/doctors/certificate/${id}/activate`,
  getUrl: (name, type) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/files/sign-url?filename=${name}&filetype=${type}`,
  updateProfilePic: `${process.env.REACT_APP_ORIGIN}api/v1/doctors/update-picture`,
  getBankDetails: `${process.env.REACT_APP_ORIGIN}api/v1/doctors/get-beneficiary`,
  removeBankDetails: `${process.env.REACT_APP_ORIGIN}api/v1/doctors/remove-beneficiary`,
  addBankDetails: `${process.env.REACT_APP_ORIGIN}api/v1/doctors/add-beneficiary`,
};
//&or[number][regex]=${data}&or[gender][regex]=${data}
export const Patients = {
  add: `${process.env.REACT_APP_ORIGIN}api/v1/patients`,
  getData: `${process.env.REACT_APP_ORIGIN}api/v1/patients`,
  search: (data) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/patients?or[name][regex]=${data}&or[name][options]=i`,
  details: (id) => `${process.env.REACT_APP_ORIGIN}api/v1/patients/${id}`,
  deleteP: (id) => `${process.env.REACT_APP_ORIGIN}api/v1/patients/${id}`,
  updatePatient: (id) => `${process.env.REACT_APP_ORIGIN}api/v1/patients/${id}`,
  createRecord: (id) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/patients/${id}/records`,
  activateRecord: (id, recordId) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/patients/${id}/records/${recordId}/activate`,
  fetchRecords: (id) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/patients/${id}/records`,
};

export const Staff = {
  registerStaff: `${process.env.REACT_APP_ORIGIN}api/v1/staffs`,
  getStaff: `${process.env.REACT_APP_ORIGIN}api/v1/staffs`,
  removeStaff: (id) => `${process.env.REACT_APP_ORIGIN}api/v1/staffs/${id}`,
};

export const Clinics = {
  getdata: `${process.env.REACT_APP_ORIGIN}api/v1/clinics`,
  addClinic: `${process.env.REACT_APP_ORIGIN}api/v1/clinics`,
  editClinic: (id) => `${process.env.REACT_APP_ORIGIN}api/v1/clinics/${id}`,
};

export const Appointments = {
  add: `${process.env.REACT_APP_ORIGIN}api/v1/appointments`,
  sendLink: `${process.env.REACT_APP_ORIGIN}api/v1/messages/send-link`,
  get: (dt) => `${process.env.REACT_APP_ORIGIN}api/v1/appointments${dt}`,
  previousAppointments: `${process.env.REACT_APP_ORIGIN}api/v1/appointments`,
  getDetails: (id) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/appointments/${id}`,
  updateDetails: (id) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/appointments/${id}`,
  start: (id) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/appointments/${id}/start`,
  addFile: (id) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/appointments/${id}/records`,
  activateFile: (id, fileId) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/appointments/${id}/records/${fileId}/activate`,
};

export const WhatsApp = {
  getUsers: `${process.env.REACT_APP_ORIGIN}api/v1/messages/inbox`,
  getChats: (id) =>
    `${process.env.REACT_APP_ORIGIN}api/v1/messages/inbox/${id}`,
  sendMssg: `${process.env.REACT_APP_ORIGIN}api/v1/messages`,
  sendMediaMssg: `${process.env.REACT_APP_ORIGIN}api/v1/messages/media`,
};

export const WalletAPI = {
  fetchBalance: `${process.env.REACT_APP_ORIGIN}api/v1/transactions/totalrevenue`,
  withdrawHistory: `${process.env.REACT_APP_ORIGIN}api/v1/withdraw`,
  totalWithdrawal: `${process.env.REACT_APP_ORIGIN}api/v1/withdraw/total-withdraw`,
  latestWithdrawal: `${process.env.REACT_APP_ORIGIN}api/v1/withdraw/latest-withdraw`,
  settlePayment: `${process.env.REACT_APP_ORIGIN}api/v1/withdraw/settle-amount`,
};
