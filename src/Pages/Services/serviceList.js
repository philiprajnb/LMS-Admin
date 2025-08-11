import axios from "axios";
import config from "../../config";

const headers = {
  headers: {
    authorization: localStorage.getItem("token"),
  },
};
async function createLeads(props) {
  const uploaded = await axios.post(
    `${config.baseUrl}/leads`,
    props,
    headers
  );
 

  return uploaded.data;
}

async function distributeLeads(props) {
  const distribute = await axios.post(
    `${config.baseUrl}/stateData/distribute`,
    props,
    headers
  );
  return distribute;
}

async function getTotalLeads() {
  const leads = await axios.get(`${config.baseUrl}/stateData`, headers);
  return leads.data;
}


async function getClassifiedLeads() {
  const leads = await axios.get(
    `${config.baseUrl}/reports/leadsClassification`,
    headers
  );
  const dataObj = {};

  leads.data.forEach((e) => {
    if (e.potential === "Hot") {
      dataObj.hotLeads = e.total;
    }

    if (e.potential === "Warm") {
      dataObj.warmLeads = e.total;
    }

    if (e.potential === "Cold") {
      dataObj.coldLeads = e.total;
    }
  });
  return dataObj;
}

async function getKeyConversionMetrics() {
  const response = await axios.get(
    `${config.baseUrl}/reports/keyConversionMetrics`,
    headers
  );

  return response.data;
}

async function getByRegionLeads() {
  const leads = await axios.get(
    `${config.baseUrl}/reports/leadsByRegion`,
    headers
  );
  const dataObj = {};

  leads.data.forEach((e) => {
    if (e.potential === "Hot") {
      dataObj.hotLeads = e.total;
    }

    if (e.potential === "Warm") {
      dataObj.warmLeads = e.total;
    }

    if (e.potential === "Cold") {
      dataObj.coldLeads = e.total;
    }
  });
  return dataObj;
}

async function getNewLeads() {
  const newLeads = await axios.get(`${config.baseUrl}/stateData`, headers);
  let [hotCount, warmCount, coldCount] = [0, 0, 0];
  const dataObj = {};
  const tableArr = [];

  newLeads.data.forEach((e) => {
    if (e.processData["WF Status"] === 1 || e.processData["WF Status"] === 11) {
      tableArr.push(e);
      dataObj.totalLeads = tableArr.length;
      dataObj.leads = tableArr;
      if (e.processData.Potential === "Hot") {
        hotCount++;
        dataObj.hotLeads = hotCount !== 0 ? hotCount : 0;
      }

      if (e.processData.Potential === "Warm") {
        warmCount++;
        dataObj.warmLeads = warmCount !== 0 ? warmCount : 0;
      }

      if (e.processData.Potential === "Cold") {
        coldCount++;
        dataObj.coldLeads = coldCount !== 0 ? coldCount : 0;
      }
    }
  });
  return dataObj;
}

async function getDistributedLeads() {
  const leads = await axios.get(`${config.baseUrl}/stateData`, headers);
  let [hotCount, warmCount, coldCount] = [0, 0, 0];
  const dataObj = {};
  const tableArr = [];
  leads.data.forEach((e) => {
    if (e.processData["WF Status"] === 2) {
      tableArr.push(e);
      dataObj.totalLeads = tableArr.length;
      dataObj.leads = tableArr;
      if (e.processData.Potential === "Hot") {
        hotCount++;
        dataObj.hotLeads = hotCount !== 0 ? hotCount : 0;
      }

      if (e.processData.Potential === "Warm") {
        warmCount++;
        dataObj.warmLeads = warmCount !== 0 ? warmCount : 0;
      }

      if (e.processData.Potential === "Cold") {
        coldCount++;
        dataObj.coldLeads = coldCount !== 0 ? coldCount : 0;
      }
    }
  });

  return dataObj;
}

async function getInProgressLeads() {
  const leads = await axios.get(`${config.baseUrl}/stateData`, headers);
  let [hotCount, warmCount, coldCount] = [0, 0, 0];
  const dataObj = {};
  const tableArr = [];

  leads.data.forEach((e) => {
    if (
      parseInt(e.processData["WF Status"], 10) === 3 ||
      parseInt(e.processData["WF Status"], 10) === 4 ||
      parseInt(e.processData["WF Status"], 10) === 5 ||
      parseInt(e.processData["WF Status"], 10) === 6 ||
      parseInt(e.processData["WF Status"], 10) === 7 ||
      parseInt(e.processData["WF Status"], 10) === 8
    ) {
      tableArr.push(e);
      dataObj.totalLeads = tableArr.length;
      dataObj.leads = tableArr;
      if (e.processData.Potential === "Hot") {
        hotCount++;
        dataObj.hotLeads = hotCount !== 0 ? hotCount : 0;
      }

      if (e.processData.Potential === "Warm") {
        warmCount++;
        dataObj.warmLeads = warmCount !== 0 ? warmCount : 0;
      }

      if (e.processData.Potential === "Cold") {
        coldCount++;
        dataObj.coldLeads = coldCount !== 0 ? coldCount : 0;
      }
    }
  });

  return dataObj;
}

async function getReAssignedLeads() {
  const leads = await axios.get(`${config.baseUrl}/stateData`, headers);
  let [hotCount, warmCount, coldCount] = [0, 0, 0];
  const dataObj = {};
  const tableArr = [];
  leads.data.forEach((e) => {
    if (e.processData["WF Status"] === 10) {
      tableArr.push(e);
      dataObj.totalLeads = tableArr.length;
      dataObj.leads = tableArr;
      if (e.processData.Potential === "Hot") {
        hotCount++;
        dataObj.hotLeads = hotCount !== 0 ? hotCount : 0;
      }

      if (e.processData.Potential === "Warm") {
        warmCount++;
        dataObj.warmLeads = warmCount !== 0 ? warmCount : 0;
      }

      if (e.processData.Potential === "Cold") {
        coldCount++;
        dataObj.coldLeads = coldCount !== 0 ? coldCount : 0;
      }
    }
  });

  return dataObj;
}

async function getRejectedLeads() {
  const leads = await axios.get(`${config.baseUrl}/stateData`, headers);
  let [hotCount, warmCount, coldCount] = [0, 0, 0];
  const dataObj = {};
  const tableArr = [];
  leads.data.forEach((e) => {
    if (e.processData["WF Status"] === 9) {
      tableArr.push(e);
      dataObj.totalLeads = tableArr.length;
      dataObj.leads = tableArr;
      if (e.processData.Potential === "Hot") {
        hotCount++;
        dataObj.hotLeads = hotCount !== 0 ? hotCount : 0;
      }

      if (e.processData.Potential === "Warm") {
        warmCount++;
        dataObj.warmLeads = warmCount !== 0 ? warmCount : 0;
      }

      if (e.processData.Potential === "Cold") {
        coldCount++;
        dataObj.coldLeads = coldCount !== 0 ? coldCount : 0;
      }
    }
  });

  return dataObj;
}

async function getAgentData() {
  const agents = await axios.get(`${config.baseUrl}/agentData`, headers);
  const dataObj = {};
  dataObj.totalAgents = agents.data.length;
  dataObj.agents = agents.data;
  return dataObj;
}

async function updateLead(data) {
  const lead = await axios.put(
    `${config.baseUrl}/stateData/${data._id}`,
    data,
    headers
  );
  return lead.data;
}

async function searchLeads(txt) {
  const leads = await axios.get(
    `${config.baseUrl}/stateData/search/${txt}`,
    headers
  );
  return leads.data;
}

async function searchAgents(data) {
  const agents = await axios.post(
    `${config.baseUrl}/agentData/searchAgents/`,
    data,
    headers
  );
  return agents.data;
}

async function updateAgent(data) {
  const agent = await axios.put(
    `${config.baseUrl}/agentData/${data._id}`,
    data,
    headers
  );
  return agent;
}

async function uploadAgent(data) {
  const uploaded = await axios.post(
    `${config.baseUrl}/agentData`,
    data,
    headers
  );
  return uploaded;
}

async function getTotalAuditLeads() {
  const leads = await axios.get(`${config.baseUrl}/stateData`, headers);
  let [hotCount, warmCount, coldCount] = [0, 0, 0];
  const dataObj = {};
  const tableArr = [];

  leads.data.forEach((e) => {
    if (e.processData["WF Status"] !== 1) {
      tableArr.push(e);
      dataObj.totalLeads = tableArr.length;
      dataObj.leads = tableArr;
      if (e.processData.Potential === "Hot") {
        hotCount++;
        dataObj.hotLeads = hotCount !== 0 ? hotCount : 0;
      }

      if (e.processData.Potential === "Warm") {
        warmCount++;
        dataObj.warmLeads = warmCount !== 0 ? warmCount : 0;
      }

      if (e.processData.Potential === "Cold") {
        coldCount++;
        dataObj.coldLeads = coldCount !== 0 ? coldCount : 0;
      }
    }
  });
  return dataObj;
}

async function getInProgressAuditLeads() {
  const leads = await axios.get(`${config.baseUrl}/stateData`, headers);
  let [hotCount, warmCount, coldCount] = [0, 0, 0];
  const dataObj = {};
  const tableArr = [];

  leads.data.forEach((e) => {
    if (e.processData["WF Status"] !== 1 && e.processData["WF Status"] <= 7 ) {
      tableArr.push(e);
      dataObj.totalLeads = tableArr.length;
      dataObj.leads = tableArr;
      if (e.processData.Potential === "Hot") {
        hotCount++;
        dataObj.hotLeads = hotCount !== 0 ? hotCount : 0;
      }

      if (e.processData.Potential === "Warm") {
        warmCount++;
        dataObj.warmLeads = warmCount !== 0 ? warmCount : 0;
      }

      if (e.processData.Potential === "Cold") {
        coldCount++;
        dataObj.coldLeads = coldCount !== 0 ? coldCount : 0;
      }
    }
  });
  return dataObj;
}

async function getConvertedAuditLeads() {
  const leads = await axios.get(`${config.baseUrl}/stateData`, headers);
  let [hotCount, warmCount, coldCount] = [0, 0, 0];
  const dataObj = {};
  const tableArr = [];

  leads.data.forEach((e) => {
    if (e.processData["WF Status"] === 8) {
      tableArr.push(e);
      dataObj.totalLeads = tableArr.length;
      dataObj.leads = tableArr;
      if (e.processData.Potential === "Hot") {
        hotCount++;
        dataObj.hotLeads = hotCount !== 0 ? hotCount : 0;
      }

      if (e.processData.Potential === "Warm") {
        warmCount++;
        dataObj.warmLeads = warmCount !== 0 ? warmCount : 0;
      }

      if (e.processData.Potential === "Cold") {
        coldCount++;
        dataObj.coldLeads = coldCount !== 0 ? coldCount : 0;
      }
    }
  });
  return dataObj;
}

async function getRejectedAuditLeads() {
  const leads = await axios.get(`${config.baseUrl}/stateData`, headers);
  let [hotCount, warmCount, coldCount] = [0, 0, 0];
  const dataObj = {};
  const tableArr = [];

  leads.data.forEach((e) => {
    if (e.processData["WF Status"] === 9 ) {
      tableArr.push(e);
      dataObj.totalLeads = tableArr.length;
      dataObj.leads = tableArr;
      if (e.processData.Potential === "Hot") {
        hotCount++;
        dataObj.hotLeads = hotCount !== 0 ? hotCount : 0;
      }

      if (e.processData.Potential === "Warm") {
        warmCount++;
        dataObj.warmLeads = warmCount !== 0 ? warmCount : 0;
      }

      if (e.processData.Potential === "Cold") {
        coldCount++;
        dataObj.coldLeads = coldCount !== 0 ? coldCount : 0;
      }
    }
  });
  return dataObj;
}
export {
  createLeads,
  getTotalLeads,
  getNewLeads,
  getDistributedLeads,
  getInProgressLeads,
  getReAssignedLeads,
  getRejectedLeads,
  getAgentData,
  distributeLeads,
  updateLead,
  searchLeads,
  searchAgents,
  updateAgent,
  uploadAgent,
  getClassifiedLeads,
  getByRegionLeads,
  getKeyConversionMetrics,
  getTotalAuditLeads,
  getInProgressAuditLeads,
  getConvertedAuditLeads,
  getRejectedAuditLeads
};
