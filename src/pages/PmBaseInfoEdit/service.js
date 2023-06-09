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

const {PROJECT_PATH, SERVER_PATH, LOCAL_PATH} = constants;
const contextBaseInfoPath = '/pmBaseinfo';
const contextPath = '/pmBaseInfoEdit';
const contextToDoPath = '/todoList';
const ProjPlanPath = '/projectPlan';
const pmOrganizePath = '/pmOrganize';
const pmBaseinfoWeek = '/pmBaseinfoWeek';

/** 按id查找项目内容 */
export async function findBaseInfoById(data) {
  const url = `${PROJECT_PATH}${contextBaseInfoPath}/findByPage`;
  return request.post(url, data);
}

export async function getProOpt() {
  const url = `${SERVER_PATH}/dms/dataDict/getCanUseDataDictValues?dictCode=ProcedureOption`;
  return request({
    url,
    method: 'GET',
  });
}

export async function getNewProOpt(data) {
  const url = `${PROJECT_PATH}/pmProjectOption/findByPage`;
  return request({
    url,
    method: 'POST',
    data,
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
    //   'Authorization' : 'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiIyOGRhZjQ4OC0wYjIzLTQ3YjYtYjFhMC1lOWQyOWI4NWQ1YzEiLCJzdWIiOiLnlKjmiLfotKblj7ciLCJhdXRob3JpdHlQb2xpY3kiOiJOb3JtYWxVc2VyIiwidXNlck5hbWUiOiLlvKDmmZPmqaYiLCJleHAiOjE2NjYxMTAxMTEsInVzZXJJZCI6IkIwRkI0MzcwLTBCQkItMTFFRC1CRDQwLTAyNDJBQzE0MDAxMSIsImlhdCI6MTY2MzIzMDExMSwidGVuYW50IjoidGVzdCIsImFjY291bnQiOiIzNzY5NTEifQ.rxgc63JBRqroke1cUuDrpid2Fs0L2gA-HAxN-xkJY4rQhVhTbIYHXgS7OI7FqagIC0cTcmunUeu85WUUFIyTvg'
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
    //   'Authorization' : 'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiIzZTU0ZGVlZC04MjRhLTRjMmMtYWIxNS1lNjIwMmNkNTkzMzQiLCJzdWIiOiLnlKjmiLfotKblj7ciLCJhdXRob3JpdHlQb2xpY3kiOiJOb3JtYWxVc2VyIiwidXNlck5hbWUiOiLlvKDmmZPmqaYiLCJleHAiOjE2NjU5MjEyODMsInVzZXJJZCI6IkIwRkI0MzcwLTBCQkItMTFFRC1CRDQwLTAyNDJBQzE0MDAxMSIsImlhdCI6MTY2MzA0MTI4MywidGVuYW50IjoidGVzdCIsImFjY291bnQiOiIzNzY5NTEifQ.7RN0AL5fZVs-JvqoukeCfXURoeIWBiDJCp-QEbib09ASttq0xhdSsqpGzV_5_d4Ieem334Sv8W6heCnjSXWuQg'
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
/** 上传项目计划 */
export async function uploadMasterPlan(data) {
  const url =  `${PROJECT_PATH}${ProjPlanPath}/uploadMasterPlan`;
  return request.post(url, data);
}
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
 * 查询项目进度节点信息
 * @returns
 */
export async function findByIdForSchedule(data) {
  const url = `${PROJECT_PATH}${contextBaseInfoPath}/findByIdForSchedule?id=${data.id}`;
  return request({
    url,
    method: 'GET',
  });
}

/** 项目进度导入模板 */
export async function downLoadTemplate(data) {
  const url = `${LOCAL_PATH}/templates/${data.type}模板.xlsx`;
  return request({
    url,
    method: 'GET',
    responseType: 'blob',
  });
}

/** 组织节点 */
export async function getChildrenNodes() {
  const url = `${PROJECT_PATH}${pmOrganizePath}/getChildrenNodesNotFrozen?nodeId=EC2FCEF7-A04F-11ED-A883-005056C00001&includeSelf=false`;
  return request({
    url,
    method: 'GET',
  });
}

/** 新双周计划：根据id查询 */
export async function findWeekPlanById() {
  const url = `${PROJECT_PATH}${pmBaseinfoWeek}/findByPage`;
  return request({
    url,
    method: 'GET',
  });
}

/** 新双周计划：保存 */
export async function saveWeekPlan(data) {
  const url = `${PROJECT_PATH}${pmBaseinfoWeek}/save`;
  return request({
    url,
    method: 'POST',
    data
  });
  // return request.post(url,data);
}

/** 新双周计划：删除 */
export async function delWeekPlan(params) {
  const url = `${PROJECT_PATH}${pmBaseinfoWeek}/delete/${params.id}`;
  return request.delete(url);
}

/** 新双周计划：保存附件列表 */
export async function saveWeekPlanAttachList(data) {
  const url = `${PROJECT_PATH}${pmBaseinfoWeek}/saveAttachList`;
  return request({
    url,
    method: 'POST',
    data
  });
}