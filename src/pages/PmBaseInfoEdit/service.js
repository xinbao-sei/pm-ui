/*
 * @Author: zp
 * @Date:   2020-02-02 11:57:24
 * @Last Modified by: zp
 * @Last Modified time: 2020-04-23 09:48:33
 */
import { utils } from 'suid';
import {constants} from "@/utils";
const { request } = utils;

// const MockServerPath =
//   '/mock/5e02d29836608e42d52b1d81/template-service';

const {PROJECT_PATH} = constants;
const { SERVER_PATH } = constants;
const contextBaseInfoPath = '/pmBaseinfo';
const contextPath = '/pmBaseInfoEdit';
const contextToDoPath = '/todoList';
const ProjPlanPath = '/projectPlan';

export async function getProOpt() {
  const url = `${SERVER_PATH}/dms/dataDict/getCanUseDataDictValues?dictCode=ProcedureOption`;
  return request({
    url,
    method: 'GET',
  });
}

export async function findEmp(data) {
  const url = `${PROJECT_PATH}/pmEmployee/findEmp`;
  return request({
    url,
    method: 'POST',
    data,
  });
}

/** 保存节点附件 */
export async function saveUpload(data) {
  const url = `${PROJECT_PATH}${contextBaseInfoPath}/save`;
  // return request.post(url, data);
  return request({
    url,
    method: 'POST',
    // headers:{
    //   'Authorization' : 'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJlYzY3YTY4Yy1jMmIwLTQzMTMtYmFjNC1kOGRkY2M4N2IzZjQiLCJzdWIiOiLnlKjmiLfotKblj7ciLCJhdXRob3JpdHlQb2xpY3kiOiJOb3JtYWxVc2VyIiwidXNlck5hbWUiOiLlvKDmmZPmqaYiLCJleHAiOjE2NjU0OTk2MDksInVzZXJJZCI6IkIwRkI0MzcwLTBCQkItMTFFRC1CRDQwLTAyNDJBQzE0MDAxMSIsImlhdCI6MTY2MjYxOTYwOSwidGVuYW50IjoidGVzdCIsImFjY291bnQiOiIzNzY5NTEifQ.hTU_oDa0XGbQVaFhSmJB1J8X3_hYhdCJgJ_5FqYwxlCH7d4y2bRbLMnjFG7F2Ao6HZqkQnODSXuaN2qLtH7kdg'
    // },
    data
  });
}

/** 保存附件列表 */
export async function saveUploadList(data) {
  const url = `${PROJECT_PATH}${contextBaseInfoPath}/saveAttachList`;
  return request({
    url,
    method: 'POST',
    // headers:{
    //   'Authorization' : 'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJlYzY3YTY4Yy1jMmIwLTQzMTMtYmFjNC1kOGRkY2M4N2IzZjQiLCJzdWIiOiLnlKjmiLfotKblj7ciLCJhdXRob3JpdHlQb2xpY3kiOiJOb3JtYWxVc2VyIiwidXNlck5hbWUiOiLlvKDmmZPmqaYiLCJleHAiOjE2NjU0OTk2MDksInVzZXJJZCI6IkIwRkI0MzcwLTBCQkItMTFFRC1CRDQwLTAyNDJBQzE0MDAxMSIsImlhdCI6MTY2MjYxOTYwOSwidGVuYW50IjoidGVzdCIsImFjY291bnQiOiIzNzY5NTEifQ.hTU_oDa0XGbQVaFhSmJB1J8X3_hYhdCJgJ_5FqYwxlCH7d4y2bRbLMnjFG7F2Ao6HZqkQnODSXuaN2qLtH7kdg'
    // },
    data
  });
}

/** 保存 */
export async function save(data) {
  const url = `${PROJECT_PATH}${contextBaseInfoPath}/saveBaseInfo`;
  return request.post(url, data);
}

/** 删除 */
export async function del(params) {
  const url = `${PROJECT_PATH}${contextPath}/delete/${params.id}`;
  return request.delete(url);
}

/** ToDoList保存 */
export async function saveToDo(data) {
  const url = `${PROJECT_PATH}${contextToDoPath}/save`;
  return request.post(url, data);
}

/** ToDoList更新 */
export async function updateStateToDo(data) {
  const url = `${PROJECT_PATH}${contextToDoPath}/save`;
  console.log(data)
  return request.post(url, data);
}

/** ToDoList删除 */
export async function delToDo(params) {
  const url = `${PROJECT_PATH}${contextToDoPath}/delete/${params.id}`;
  return request.delete(url);
}

/** 根据编码查找项目 */
export async function syncProjectInfo(params) {
  const url = `${PROJECT_PATH}${contextBaseInfoPath}/syncProjectInfo?code=${params.code}`;
  return request.post(url);
}

/** projectPlan */
/** 保存 */
export async function projPlanSave(data) {
  const url =  `${PROJECT_PATH}${ProjPlanPath}/save`;
  return request.post(url, data);
}

/** 批量保存 */
export async function projPlanSaveBatch(data) {
  const url =  `${PROJECT_PATH}${ProjPlanPath}/saveBatch`;
  return request.post(url, data);
}

/** 删除 */
export async function projPlanDel(params) {
  const url = `${PROJECT_PATH}${ProjPlanPath}/delete/${params.id}`;
  return request.delete(url);
}

/** 查询 */
export async function projPlanFindByPage(data) {
  const url = `${PROJECT_PATH}${ProjPlanPath}/findByPage`;
  return request.post(url,data);
}

/**
 *
 * @returns
 */
export async function findByIdForSchedule(data) {
  const url = `${PROJECT_PATH}${contextBaseInfoPath}/findByIdForSchedule?id=${data.id}`;
  return request({
    url,
    method: 'GET',
  });
}
